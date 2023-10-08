/*
 * @Author: shiningding <shiningding@tencent.com>
 * @Date: 2021-04-20 11:34:33
 * @--------------------------------------------------:
 * @LastEditTime: 2023-10-08 18:19:28
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

export const APP_PATH = resolve(__dirname, '..', '..', 'public', 'main.apk');

const DEFAULT_ANDROID_DEVICE_NAME = 'qqmusic';

const DEFAULT_ANDROID_PLATFORM_VERSION = '10';

export const androidCaps = {
  platformName: 'Android',
  automationName: 'appium',
  deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
  platformVersion:
    process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
  appPackage: MAIN_APK_NAME,
  appActivity: ".activity.AppStarterActivity",
  // appWaitActivity: ".activity.AppStarterActivity",
  // chromedriverExecutableDir: "/Users/shining/Documents/Dx/qqmusic/qmfe-h5-appium-launcher/chromedriver/",
  // chromedriverExecutable: '/Users/shining/Documents/Dx/qqmusic/qmfe-h5-appium-launcher/chromedriver/chromedriver83',
  // chromedriver_autodownload: true,
  noReset: true,
  chromeOptions: {
    w3c: false
  },
  app: APP_PATH, // Will be added in tests
  // browserName: 'com.tencent.qqmusic'
  // browserName: 'chrome'
};

const serverConfig: any = {
  path: '/wd/hub',
  host: process.env.APPIUM_HOST || 'localhost',
  port: process.env.APPIUM_PORT || 4723,
  logLevel: 'info'
};

export const ANDROID_OPTIONS = Object.assign(
  {
    capabilities: androidCaps
  },
  serverConfig
);

export const initPath = (path) => {
  fs.exists(path, async (exists) => {
    if (!exists) {
      fs.mkdirSync(path);
    }
  });
};

// 目录初始化，如果没有这些目录就先创建这些目录
initPath(IMAGES_PATH);