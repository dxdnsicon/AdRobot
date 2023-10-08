// 核心监控逻辑

import AppInit from './appinit'
import { getSchemeOpenUrl } from '../utils/adb';
import { save_base64 } from '../utils/image';
import { sleep } from '../utils/index';
import getAppConfig from './getAppConfig';

const monitorCore = async () => {
  try {
    const client = await AppInit();
    setTimeout(async () => {
      const config = await getAppConfig();
      const result = [];
      for ( let i in config) {
        const moduleName = config[i];
        const module = require(`../case/${moduleName}`);
        const pageItem = module.default;
        const url = getSchemeOpenUrl(pageItem.pageUrl);
        await client.url(url);
        // 截图
        const imagesBase64 = await client.takeScreenshot();
        save_base64(imagesBase64, pageItem);
        const context = await client.getContexts();
        console.log('context', context)
        await sleep(2000);
        // 切换到webview 上下文
        await client.switchContext('WEBVIEW_com.tencent.qqmusic');
        const caseList = pageItem.pageCase;
        const pageResult = [];
        for (let i in caseList) {
          const windows = await client.getWindowHandles();
          await client.switchToWindow(windows[0]);
          pageResult[i] = {
            describe: caseList[i].describe,
            test: await caseList[i].methods(client)
          }
        }
        result.push(pageResult);
      }
      await sleep(2000)
      await client.deleteSession();
      // 展示自动化测试结果
      console.log('appium Test result:', result);
      process.exit(0);
    }, 2000)
  } catch(e) {
    throw e;
  }
}

export default monitorCore;