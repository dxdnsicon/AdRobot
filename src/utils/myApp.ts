import { checkHasInstall, launchApp, passAndroidPermission, awaitActivity, tapBtn, getClientSize, inputText, checkActivity, setWmSize } from "./adb";
import { execCmd, formateTime, sleep } from "./index";
import { ActivitysMap, MAIN_BTN_POSITION, getRealPositionSize, baseSize } from '../config/task-config';
import { DeviceInfo } from '../typings/global'

class MyAppBridge {
  apk = '';
  apkName = '';
  devices: DeviceInfo[] = [];
  Activitys: string[] = [];
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
    let devices: DeviceInfo[] = [];
    if (list.length > 1) {
      // 表示有设备信息
      devices = list.map((x) => {
        if (x.indexOf('\t') > -1) {
          const item = x.split('\t');
          return {
            name: item[0],
            status: item[1],
            size: null
          }
        }
      })?.filter(x => !!x && x.status === 'device')
    }
    
    for (let i in devices) {
      const item = devices[i];
      await setWmSize(item.name)
      const size = await getClientSize(item.name);
      devices[i].size = baseSize;
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
      await passAndroidPermission(item);
      if (await checkActivity(ActivitysMap.INDEX, item.name)) {
        await tapBtn(MAIN_BTN_POSITION.INDEX_OK, item);
      }
    }
    return null;
  };
  // 登录
  public async loginApp() {
    try {
      console.log('check login...')
      for (let i in this.devices) {
        const item = this.devices[i];
        if (await checkActivity([ActivitysMap.LOGIN_FLASH, ActivitysMap.WELCOME], item.name)) {
          // 如果是登录界面需要触发登录
          console.log('need login...')
          await awaitActivity(ActivitysMap.WELCOME, item.name)
          await tapBtn(MAIN_BTN_POSITION.MORE_LOGIN_BTN, item);
          await tapBtn(MAIN_BTN_POSITION.IPHEON_LOGIN_BTN, item);
          await tapBtn(MAIN_BTN_POSITION.PASS_LOGIN_BTN, item);
          await tapBtn(MAIN_BTN_POSITION.INPUT_ACCOUNT, item);
          await inputText('21321', item.name)
          await tapBtn(MAIN_BTN_POSITION.INPUT_PASSWORD, item);
          await inputText('123213', item.name)
          await tapBtn(MAIN_BTN_POSITION.LOGIN_PROTOCAL, item);
          await tapBtn(MAIN_BTN_POSITION.LOGIN_BTN, item);
        } else {
          console.log('not login page')
        }
      }
      return null;
    } catch (e) {
      console.log('main Task error:', e)
    }
  };

  // 执行主要任务Task
  public async mainTask() {
    try {
      console.log('run Task...')
      for (let i in this.devices) {
        const item = this.devices[i];
        if (await awaitActivity(ActivitysMap.HOME, item.name)) {
          // 如果是HOME洁面就开始主任务
          await tapBtn(MAIN_BTN_POSITION.HOME_ADD, item);
          await passAndroidPermission(item.name);
          await awaitActivity(ActivitysMap.CAPAENTRANCE, item.name)
          await tapBtn(MAIN_BTN_POSITION.PIC_1, item);
          await tapBtn(MAIN_BTN_POSITION.EDIT_PICCHOSE_NEXT, item);
          await sleep(2000);
          await tapBtn(MAIN_BTN_POSITION.EDIT_NEXT, item);
          await awaitActivity(ActivitysMap.INFOEDIT, item.name)
          await tapBtn(MAIN_BTN_POSITION.PUSH, item);
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