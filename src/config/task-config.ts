/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-04-20 11:34:33
 * @--------------------------------------------------:
 * @LastEditTime: 2023-10-09 19:38:28
 * @Modified By: shiningding <shiningding@tencent.com>
 * @---------------------------------------------------:
 * @Description:  一些配置项目
 */
import { resolve } from "path";
import fs from "fs";
import { platform } from 'os';

// ENV
export const CHROME_ENV = process.env.CHROME_ENV;
export const DISABLE_STATIC_SERVER = process.env.DISABLE_STATIC_SERVER
export const DISABLE_CRON_TASK = process.env.DISABLE_CRON_TASK
export const IS_MACOS = platform() === 'darwin';

export const AUTO_CLOSE_TIMESTAMPS = 60000;  // 自动关闭测试客户端时间

export const IMAGES_PATH = resolve(__dirname, '..', '..', 'dist');

export const MAIN_APK_NAME = 'com.xingin.xhs';

export const ANDROID_OS_PERMISSION = 'com.android.permissioncontroller';

export const APP_PATH = resolve(__dirname, '..', '..', 'public', 'main.apk');

// app的activitys
export const ActivitysMap = {
  'WELCOME': 'com.xingin.login.activity.WelcomeActivity', // 欢迎登录页面
  'LOGIN': 'com.xingin.login.activity.LoginActivity', // 登录页面
  "HOME": 'com.xingin.xhs.index.v2.IndexActivityV2', // HOME页面
  "PERMISSION": 'com.android.packageinstaller.permission.ui.GrantPermissionsActivity', // 授权页
  "CAPAENTRANCE": 'com.xingin.capa.lib.entrance.CapaEntranceActivity', // 选择内容页面
  "INFOEDIT": 'com.xingin.capa.v2.feature.post.lcb.activity.CapaLCBPostNoteActivity' // 内容编辑页面
}

export const MAIN_BTN_POSITION: Record<string, [number, number]> = {
  'PUSH': [590, 2220],
  'EDIT_NEXT': [920, 164],
  'HOME_ADD': [544, 2266],
  'PIC_1': [307,461],
  'EDIT_PICCHOSE_NEXT': [905,2266],
  'PERMISSION_OK': [768, 2192]
}

export const initPath = (path) => {
  fs.exists(path, async (exists) => {
    if (!exists) {
      fs.mkdirSync(path);
    }
  });
};

// 目录初始化，如果没有这些目录就先创建这些目录
initPath(IMAGES_PATH);