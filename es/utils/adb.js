"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeAdb = exports.closeWebview = exports.getSchemeOpenUrl = exports.getAndroidOpenUrl = void 0;
const getAndroidOpenUrl = (url) => {
    const qqmusicParams = encodeURIComponent(`{"url":"${url}"}`);
    return `adb shell am start -W -a android.intent.action.VIEW -d "qqmusic://qq.com/ui/openUrl?p=${qqmusicParams}"`;
};
exports.getAndroidOpenUrl = getAndroidOpenUrl;
const getSchemeOpenUrl = (url) => {
    const qqmusicScheme = `qqmusic://qq.com/ui/openUrl?p=${encodeURIComponent(`{"url":"${url}"}`)}`;
    return qqmusicScheme;
};
exports.getSchemeOpenUrl = getSchemeOpenUrl;
const closeWebview = async (client) => {
    return await client.executeAsyncScript('Music.client.open("ui", "closeWebview")', []);
};
exports.closeWebview = closeWebview;
const executeAdb = (adb) => {
    return `to do`;
};
exports.executeAdb = executeAdb;
//# sourceMappingURL=adb.js.map