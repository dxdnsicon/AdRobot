import * as Appium from 'appium';
// import * as AppiumDoctor from 'appium-doctor';

const startServer = () => {
  console.log('Appium', Appium)
  Appium.main();
}

export default startServer;