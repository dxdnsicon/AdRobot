"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const webdriverio = __importStar(require("webdriverio"));
const task_config_1 = require("../config/task-config");
const index_1 = require("../utils/index");
const startApp = async () => {
    var _a;
    let client;
    try {
        console.log('webdriverio', webdriverio);
        client = await webdriverio.remote(task_config_1.ANDROID_OPTIONS);
        setTimeout(async () => {
            await client.deleteSession();
        }, task_config_1.AUTO_CLOSE_TIMESTAMPS);
        await (0, index_1.sleep)(4000);
        return client;
    }
    catch (e) {
        console.log('error', e);
        if (((_a = e.toString()) === null || _a === void 0 ? void 0 : _a.indexOf(`Cannot start the 'com.tencent.qqmusic' application`)) > -1) {
            task_config_1.ANDROID_OPTIONS.capabilities.app = task_config_1.APP_PATH;
            client = await webdriverio.remote(task_config_1.ANDROID_OPTIONS);
        }
        await client.deleteSession();
        throw null;
    }
};
exports.default = startApp;
//# sourceMappingURL=appinit.js.map