import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 1000 * 60 * 10, //10 minutes
  // use: {
  //   video: 'on',
  //   screenshot: 'on',
  //   trace: 'on',
  //   permissions: ['geolocation'],
  //   geolocation: { latitude: 13.120611, longitude: 80.0349464 },
  //   viewport: { width: 600, height: 400 },
  // },
}
export default config;