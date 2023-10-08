"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPath = exports.ANDROID_OPTIONS = exports.androidCaps = exports.APP_PATH = exports.IMAGES_PATH = exports.AUTO_CLOSE_TIMESTAMPS = exports.IS_MACOS = exports.DISABLE_CRON_TASK = exports.DISABLE_STATIC_SERVER = exports.CHROME_ENV = void 0;
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
exports.CHROME_ENV = process.env.CHROME_ENV;
exports.DISABLE_STATIC_SERVER = process.env.DISABLE_STATIC_SERVER;
exports.DISABLE_CRON_TASK = process.env.DISABLE_CRON_TASK;
exports.IS_MACOS = (0, os_1.platform)() === 'darwin';
exports.AUTO_CLOSE_TIMESTAMPS = 60000;
exports.IMAGES_PATH = (0, path_1.resolve)(__dirname, '..', '..', 'dist');
exports.APP_PATH = (0, path_1.resolve)(__dirname, '..', '..', 'public', 'qqmusic_11.9_debug.apk');
const DEFAULT_ANDROID_DEVICE_NAME = 'qqmusic';
const DEFAULT_ANDROID_PLATFORM_VERSION = '10';
exports.androidCaps = {
    platformName: 'Android',
    automationName: 'appium',
    deviceName: process.env.ANDROID_DEVICE_NAME || DEFAULT_ANDROID_DEVICE_NAME,
    platformVersion: process.env.ANDROID_PLATFORM_VERSION || DEFAULT_ANDROID_PLATFORM_VERSION,
    appPackage: "com.tencent.qqmusic",
    appActivity: ".activity.AppStarterActivity",
    chromedriverExecutable: '/Users/shining/Documents/Dx/qqmusic/qmfe-h5-appium-launcher/chromedriver/chromedriver83',
    noReset: true,
    chromeOptions: {
        w3c: false
    }
};
const serverConfig = {
    path: '/wd/hub',
    host: process.env.APPIUM_HOST || 'localhost',
    port: process.env.APPIUM_PORT || 4723,
    logLevel: 'info'
};
exports.ANDROID_OPTIONS = Object.assign({
    capabilities: exports.androidCaps
}, serverConfig);
const initPath = (path) => {
    fs_1.default.exists(path, async (exists) => {
        if (!exists) {
            fs_1.default.mkdirSync(path);
        }
    });
};
exports.initPath = initPath;
(0, exports.initPath)(exports.IMAGES_PATH);
//# sourceMappingURL=task-config.js.map