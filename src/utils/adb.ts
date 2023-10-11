import { execCmd, sleep } from "./index";
import { ActivitysMap, MAIN_BTN_POSITION } from '../config/task-config';

// 获取android打开App拉起指定页面的adb命令
export const getAndroidOpenUrl = (url: string): string => {
  const qqmusicParams = encodeURIComponent(`{"url":"${url}"}`);
  return `adb shell am start -W -a android.intent.action.VIEW -d "qqmusic://qq.com/ui/openUrl?p=${qqmusicParams}"`
}
// 获取打开链接的scheme协议
export const getSchemeOpenUrl = (url: string): string => {
  const qqmusicScheme = `qqmusic://qq.com/ui/openUrl?p=${encodeURIComponent(`{"url":"${url}"}`)}`
  return qqmusicScheme;
}

// 关闭webview
export const closeWebview = async (client: any) => {
  return await client.executeAsyncScript('Music.client.open("ui", "closeWebview")', [])
}

// 执行adb脚本命令
export const executeAdb = (adb: string) => {
  return `to do`
}

export const installApp = (path: string) => {
  executeAdb(`adb install ${path}`)
}
// 判断App是否已安装
export const checkHasInstall = async (apkName: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell pm -l | grep ${apkName}`);
  return !!excRsp;
}

// 查看当前在哪个activity
export const findActivitysNow = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell dumpsys window | grep mCurrentFocus`);
  console.log('Now Activitys:', excRsp)
  return excRsp;
}

export const launchApp = async (AppPath: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell am start ${AppPath}`);
  return !!excRsp;
}

// 模拟键盘输入
export const inputKeyDown = async (str: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input keyboard text "${str}"`)
  return excRsp;
}

// 按下HOME键
export const inputHome = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input keyevent 3`)
  return excRsp;
}

// 滑动
export const inputSwipe = async (start: [number, number], end: [number, number], deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input swipe ${start[0]} ${start[1]} ${end[0]} ${end[1]}`)
  return excRsp;
}

// 后退键盘
export const inputBack = async (deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} shell input keyevent 4`)
  return excRsp;
}

// 点击指定位置
export const inputTap = async (start: [number, number], deviceName: string) => {
  await sleep(1000);
  const excRsp = await execCmd(`adb -s ${deviceName} shell input tap ${start[0]} ${start[1]}`)
  return excRsp;
}

// 判断是否是授权，如果是就点击允许
export const passAndroidPermission = async (deviceName: string) => {
  await sleep(1000);
  const excRsp = await findActivitysNow(deviceName);
  if (excRsp.indexOf(ActivitysMap.PERMISSION) > -1) {
    await inputTap(MAIN_BTN_POSITION.PERMISSION_OK, deviceName);
  }
  return !!excRsp;
}

// 判断是否是某个activitys
export const checkActivity = async (activityName: string, deviceName: string) => {
  await sleep(1000);
  const excRsp = await findActivitysNow(deviceName);
  if (excRsp.indexOf(activityName) > -1) {
    return true;
  }
  return false;
}

// 等待某个activity出现
export const awaitActivity = (activityName: string, deviceName: string) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let timer = setInterval(async () => {
      count ++;
      const isActivity = await checkActivity(activityName, deviceName);
      if (isActivity) {
        resolve(true);
        clearInterval(timer);
        timer = null;
      } else if (count >= 30) {
        reject(`${activityName} await timeout！`);
      }
    }, 1000)
  })
}