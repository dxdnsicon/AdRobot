// 通过Appium启动Q音客户端

import * as webdriverio from 'webdriverio';
import { ANDROID_OPTIONS, APP_PATH, AUTO_CLOSE_TIMESTAMPS } from '../config/task-config';
import { sleep } from '../utils/index';

// curl -XDELETE http://127.0.0.1:4723/wd/hub/session/078036bf-ee98-49ba-907f-80f22c96c42c

const startApp = async () => {
  let client;
  try {
    // ANDROID_OPTIONS.capabilities.app = '/data/app/com.tencent.qqmusic';
    console.log('webdriverio', webdriverio)
    client = await webdriverio.remote(ANDROID_OPTIONS);
    setTimeout(async () => {
      await client.deleteSession();
    }, AUTO_CLOSE_TIMESTAMPS);
    await sleep(4000);
    return client;
  } catch(e) {
    console.log('error', e);
    if (e.toString()?.indexOf(`Cannot start the 'com.tencent.qqmusic' application`) > -1)  {
      ANDROID_OPTIONS.capabilities.app = APP_PATH;
      client = await webdriverio.remote(ANDROID_OPTIONS);
    }
    await client.deleteSession();
    throw null;
  }
}

export default startApp;