"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../utils/log"));
const index_1 = require("../utils/index");
const adb_1 = require("../utils/adb");
const checkBottomBarJump = async (client) => {
    try {
        await client.$('.bottom_bar__btn').click();
        const windows = await client.getWindowHandles();
        await client.switchToWindow(windows[1]);
        const url = await client.getUrl();
        await (0, adb_1.closeWebview)(client);
        return url.indexOf(' https://i.y.qq.com/n2/m/myservice/v3/index.html') >= -1;
    }
    catch (e) {
        (0, log_1.default)('checkBottomBarJump error', e);
        return false;
    }
};
const checkPrivilegeTabClickAviable = async (client) => {
    try {
        const tab = await client.$('.tab__box').$$('a.tab_item')[1];
        await client.touchClick(tab.elementId);
        await (0, index_1.sleep)(2000);
        const targetDom = await client.$('#js_slider_huge').getCSSProperty('display');
        return (targetDom === null || targetDom === void 0 ? void 0 : targetDom.value) === 'block';
    }
    catch (e) {
        (0, log_1.default)('checkPrivilegeTabClickAviable error', e);
        return false;
    }
};
exports.default = {
    pageName: '会员中心',
    pageUrl: 'https://i.y.qq.com/n2/m/myvip/v9/index.html?_hidehd=1&_hdct=2&_miniplayer=1',
    pageCase: [
        {
            describe: '测试底部开通按钮跳转链接是否是集权页',
            methods: checkBottomBarJump
        },
        {
            describe: '检测权益tab是否可点击',
            methods: checkPrivilegeTabClickAviable
        }
    ]
};
//# sourceMappingURL=vipcenter.js.map