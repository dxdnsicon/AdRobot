"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appinit_1 = __importDefault(require("./appinit"));
const adb_1 = require("../utils/adb");
const image_1 = require("../utils/image");
const index_1 = require("../utils/index");
const getAppConfig_1 = __importDefault(require("./getAppConfig"));
const monitorCore = async () => {
    try {
        const client = await (0, appinit_1.default)();
        setTimeout(async () => {
            const config = await (0, getAppConfig_1.default)();
            const result = [];
            for (let i in config) {
                const moduleName = config[i];
                const module = require(`../case/${moduleName}`);
                const pageItem = module.default;
                const url = (0, adb_1.getSchemeOpenUrl)(pageItem.pageUrl);
                await client.url(url);
                const imagesBase64 = await client.takeScreenshot();
                (0, image_1.save_base64)(imagesBase64, pageItem);
                const context = await client.getContexts();
                console.log('context', context);
                await (0, index_1.sleep)(2000);
                await client.switchContext('WEBVIEW_com.tencent.qqmusic');
                const caseList = pageItem.pageCase;
                const pageResult = [];
                for (let i in caseList) {
                    const windows = await client.getWindowHandles();
                    await client.switchToWindow(windows[0]);
                    pageResult[i] = {
                        describe: caseList[i].describe,
                        test: await caseList[i].methods(client)
                    };
                }
                result.push(pageResult);
            }
            await (0, index_1.sleep)(2000);
            await client.deleteSession();
            console.log('appium Test result:', result);
            process.exit(0);
        }, 2000);
    }
    catch (e) {
        throw e;
    }
};
exports.default = monitorCore;
//# sourceMappingURL=core.js.map