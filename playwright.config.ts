import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reportSlowTests: null,
  timeout: 1000 * 60 * 10, //10 minutes
   use: {
     //video: 'on',
     //screenshot: 'on',
     //trace: 'on',
   },
}
export default config;