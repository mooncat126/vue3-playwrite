import { test, expect } from '@playwright/test';

test.describe('UserProfile Component', () => {
  test.beforeEach(async ({ page }) => {
    // 设置路由拦截，并添加延迟
    await page.route('http://localhost:8080/api/user', async (route) => {
      // 使用 Promise 实现延迟
      await new Promise(resolve => setTimeout(resolve, 3000));
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ name: '李白', email: 'libai@example.com' })
      });
    });

    // 访问用户资料页面
    await page.goto('http://localhost:8080/user-profile');
  });

  test('正确显示用户数据后的加载情况', async ({ page }) => {
    // 等待加载指示器出现和消失，验证是否正确处理加载状态
    await page.waitForSelector('.v-progress-circular', { state: 'attached' });
    await page.waitForSelector('.v-progress-circular', { state: 'detached' });

    // 验证用户名和邮箱地址是否正确显示
    await expect(page.locator('.v-card-title')).toContainText('李白');
    await expect(page.locator('.v-card-subtitle')).toContainText('libai@example.com');
  });

  test('当 API 请求失败时应显示错误消息', async ({ page }) => {
    // 修改路由拦截以模拟 API 失败
    await page.route('http://localhost:8080/api/user', route => route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Server Error' })
    }));

    // 触发重新加载或调用失败的 API
    const reloadButton = page.locator('button:has-text("Reload")');
    await reloadButton.click();

    // 等待错误消息显示
    await expect(page.locator('.error-container .v-alert')).toHaveText(
      /Error: Failed to fetch user data. Please try again./
    );
  });

  test('正确处理重载按钮点击事件', async ({ page }) => {
    // 模拟点击重载按钮
    const reloadButton = page.locator('button:has-text("Reload")');
    await reloadButton.click();

    // 等待加载指示器消失
    await page.waitForSelector('.v-progress-circular', { state: 'detached' });

    // 验证点击重载后的数据是否正确显示
    await expect(page.locator('.v-card-title')).toContainText('李白');
    await expect(page.locator('.v-card-subtitle')).toContainText('libai@example.com');

    // 确保没有错误提示显示
    const errorAlert = page.locator('.v-alert');
    await expect(errorAlert).toHaveCount(0);
  });
});
