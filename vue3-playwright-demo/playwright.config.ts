import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // 指定测试目录
  testDir: './tests',  
  testMatch: '*.spec.ts',
  use: {
    // 浏览器配置，如头部模式等
  }
};

export default config;
