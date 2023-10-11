// 连接app
import MyAppBridge from '../utils/myApp';
import { APP_PATH, AUTO_CLOSE_TIMESTAMPS, MAIN_APK_NAME } from '../config/task-config';
import { sleep } from '../utils/index';

// curl -XDELETE http://127.0.0.1:4723/wd/hub/session/078036bf-ee98-49ba-907f-80f22c96c42c

const startApp = async () => {
  const client = new MyAppBridge({
    apk: APP_PATH,
    apkName: MAIN_APK_NAME
  });
  try {
    await client.initDevices();
    await client.installApp();
    await client.startApp();
    await client.loginApp();
    await client.mainTask();
    return client;
  } catch(e) {
    console.error('error:', e?.toString?.())
    throw null;
  }
}

export default startApp;