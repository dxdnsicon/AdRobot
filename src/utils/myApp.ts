import { checkHasInstall, launchApp, passAndroidPermission, awaitActivity, inputTap } from "./adb";
import { execCmd, formateTime, sleep } from "./index";
import { ActivitysMap, MAIN_BTN_POSITION } from '../config/task-config';

class MyAppBridge {
  apk = '';
  apkName = '';
  devices = [];
  Activitys = [];
  constructor(props: {
    apk: string;
    apkName: string;
  }) {
    this.apk = props.apk;
    this.apkName = props.apkName;
  };
  public async initDevices() {
    const excRsp = await execCmd('adb devices');
    const list = excRsp.split('\n');
    let devices = [];
    if (list.length > 1) {
      // 表示有设备信息
      devices = list.map(x => {
        if (x.indexOf('\t') > -1) {
          const item = x.split('\t');
          return {
            name: item[0],
            status: item[1]
          }
        }
      })?.filter(x => !!x && x.status === 'device')
    }
    console.log('list', devices);
    this.devices = devices;
  };
  // 安装App
  public installApp() {
    return new Promise(async (resolve, reject) => {
      let successList = [];
      let timeoutFlag = true;

      let timer = setTimeout(() => {
        if (timeoutFlag) {
          console.log('App install timeout')
          reject('App install timeout')
        }
      }, 60000)

      const installCallback = (index) => {
        successList.push(index);
        if (index.length >= this.devices.length) {
          // 全部安装成功
          console.log('all installed')
          timeoutFlag = false;
          clearTimeout(timer);
          resolve(true);
        }
      }

      for (let i in this.devices) {
        const item = this.devices[i];
        const existRsp = await checkHasInstall(this.apkName, item.name);
        if (existRsp) {
          console.log(`${this.apkName} has Installed`)
          return resolve(true);
        }
        await execCmd(`adb -s ${item.name} install ${this.apk}`);
        let timer = setInterval(async () => {
          const excRsp = await checkHasInstall(this.apkName, item.name);
          if (excRsp) {
            // 安装成功
            console.log('install success')
            installCallback(i);
            clearInterval(timer);
            timer = null;
          }
        }, 1000)
      }
    })
  };

  public async startApp() {
    console.log('startApp...')
    for (let i in this.devices) {
      const item = this.devices[i];
      await launchApp(`${this.apkName}/${ActivitysMap.HOME}`, item.name);
      await passAndroidPermission(item.name);
    }
    return null;
  };

  // 执行主要任务Task
  public async mainTask() {
    try {
      console.log('run Task...')
      for (let i in this.devices) {
        const item = this.devices[i];
        if (await awaitActivity(ActivitysMap.HOME, item.name)) {
          // 如果是HOME洁面就开始主任务
          await inputTap(MAIN_BTN_POSITION.HOME_ADD, item.name);
          await passAndroidPermission(item.name);
          await awaitActivity(ActivitysMap.CAPAENTRANCE, item.name)
          await inputTap(MAIN_BTN_POSITION.PIC_1, item.name);
          await inputTap(MAIN_BTN_POSITION.EDIT_PICCHOSE_NEXT, item.name);
          await sleep(2000);
          await inputTap(MAIN_BTN_POSITION.EDIT_NEXT, item.name);
          await awaitActivity(ActivitysMap.INFOEDIT, item.name)
          await inputTap(MAIN_BTN_POSITION.PUSH, item.name);
        } else {
          console.log('not home page')
        }
      }
      return null;
    } catch (e) {
      console.log('main Task error:', e)
    }
  }
}

export default MyAppBridge;