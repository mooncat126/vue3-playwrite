import { test, expect } from '@playwright/test';

test('测试 Vuetify 组件的输入和按钮交互', async ({ page }) => {
  // 访问页面
  await page.goto('http://localhost:8080');

  // 等待输入框加载
  await page.waitForSelector('input[type="text"]');

  // 输入文本
  await page.fill('input[type="text"]', 'Playwright 和 Vue 3');

  // 确保按钮存在，并点击
  await page.locator('button:has-text("显示消息")').click();

  // 等待 v-alert 出现
  await page.waitForSelector('.v-alert');

  // 检查 v-alert 是否包含正确的文本
  await expect(page.locator('.v-alert')).toContainText('消息：Playwright 和 Vue 3');
});
