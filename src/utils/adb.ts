import { execCmd } from "./index";

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
export const findActivitysNow = async () => {
  const excRsp = await execCmd(`adb shell dumpsys window | grep mCurrentFocus`)
  return excRsp;
}

export const launchApp = async (apkName: string, deviceName: string) => {
  const excRsp = await execCmd(`adb -s ${deviceName} am start ${apkName}`);
  return !!excRsp;
}