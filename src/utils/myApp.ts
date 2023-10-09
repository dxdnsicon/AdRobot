import { checkHasInstall, launchApp } from "./adb";
import { execCmd } from "./index";

class MyAppBridge {
  apk = '';
  apkName = '';
  devices = [];
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

      for( let i in this.devices) {
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
    for (let i in this.devices) {
      const item = this.devices[i];
      await launchApp(this.apkName, item.name)
    }
  }
}

export default MyAppBridge;