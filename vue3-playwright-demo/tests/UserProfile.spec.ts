import { test, expect } from '@playwright/test';

test.describe('UserProfile Component', () => {
  test.beforeEach(async ({ page }) => {
    // 拦截 API 请求并返回模拟数据
    await page.route('/api/user', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ name: 'John Doe', email: 'john@example.com' })
    }));
  });

  test('should display user information', async ({ page }) => {
    await page.goto('http://localhost:8080');
    await expect(page.locator('h1')).toContainText('John Doe');
    await expect(page.locator('p')).toContainText('Email: john@example.com');
  });
});
