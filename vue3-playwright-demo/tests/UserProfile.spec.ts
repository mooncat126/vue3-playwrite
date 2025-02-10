import { test, expect } from '@playwright/test';

test.describe('UserProfile Component', () => {
  test.beforeEach(async ({ page }) => {
    // 拦截 API 请求并返回模拟数据
    await page.route('/api/user', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ name: 'Xiang', email: 'Xiang@example.com' })
    }));

    // 访问 UserProfile 页面
    await page.goto('http://localhost:8080/user-profile'); 
  });

  test('should display user name and email', async ({ page }) => {
    // 断言用户名是否正确
    await expect(page.locator('h1')).toHaveText('Xiang');

    // 断言邮箱是否正确
    await expect(page.locator('p')).toContainText('Email: xiang@example.com');
  });
});
