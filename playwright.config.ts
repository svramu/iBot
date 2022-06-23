import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 1000 * 60 * 10, //10 minutes
}
export default config;