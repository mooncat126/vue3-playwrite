import { test, expect } from '@playwright/test';

test('测试 Vue 3 组件', async ({ page }) => {
  // 启动开发服务器
  await page.goto('http://localhost:8080');

  // 输入文本
  await page.fill('input[type="text"]', 'Playwright 和 Vue 3');

  // 点击显示消息按钮
  await page.click('button');

  // 检查页面上是否显示了输入的文本
  await expect(page.locator('p')).toContainText('消息：Playwright 和 Vue 3');
})
