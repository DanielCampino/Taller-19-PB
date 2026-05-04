const { test } = require('../fixtures/fixtures');
const { expect } = require('@playwright/test');

test('Login valido', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.fill('[data-test="email"]', 'customer@practicesoftwaretesting.com');
  await page.fill('[data-test="password"]', 'welcome01');
  await page.click('[data-test="login-submit"]');

  await expect(page).toHaveURL(/account/);
  await expect(page.locator('h1')).toContainText('My account');
});

test('Login invalido', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');

  await page.fill('[data-test="email"]', 'wrong@mail.com');
  await page.fill('[data-test="password"]', 'wrongpass');
  await page.click('[data-test="login-submit"]');

  await expect(page.locator('.alert')).toBeVisible();
});