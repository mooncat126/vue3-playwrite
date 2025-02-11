import { test, expect } from '@playwright/test';

test.describe('UserProfile Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/user-profile');
  });

  test('should display user name and email correctly', async ({ page }) => {
    await page.route('/api/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ name: 'Xiang', email: 'xiang@example.com' }),
      });
    });

    await page.reload();
    await page.waitForSelector('.v-progress-circular', { state: 'detached' });

    await expect(page.locator('.v-card-title')).toContainText('Xiang');
    await expect(page.locator('.v-card-subtitle')).toContainText('xiang@example.com');
    await expect(page.locator('button:has-text("Reload")')).toBeVisible();
  });

  test('should show error message if API fails', async ({ page }) => {
    await page.route('/api/user', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server Error' }),
      });
    });

    await page.reload();
    await page.waitForTimeout(3000);
    await page.waitForSelector('.error-container', { timeout: 10000 });

    await expect(page.locator('.v-alert')).toContainText('Failed to fetch user data. Please try again.');
    await expect(page.locator('.v-card-title')).not.toBeVisible();
    await expect(page.locator('.v-card-subtitle')).not.toBeVisible();
  });

  test('should reload user data when Reload button is clicked', async ({ page }) => {
    await page.route('/api/user', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ name: 'Xiang', email: 'xiang@example.com' }),
      });
    });

    await page.reload();
    await page.waitForSelector('.v-progress-circular', { state: 'detached' });

    // **拦截 Reload 之后的 API 请求**
    await page.route('/api/user', async (route) => {
      console.log("🚀 API Intercepted: Reloading User Data");
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ name: 'Xiang Reloaded', email: 'reload@example.com' }),
      });
    });

    const reloadButton = page.locator('button:has-text("Reload")');
    await expect(reloadButton).toBeVisible();
    await reloadButton.click();

    await page.waitForTimeout(3000);
    await expect(page.locator('.v-card-title')).toContainText('Xiang Reloaded', { timeout: 5000 });
    await expect(page.locator('.v-card-subtitle')).toContainText('reload@example.com');
  });
});
