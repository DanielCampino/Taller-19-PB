const { test } = require('../fixtures/fixtures');
const { expect } = require('@playwright/test');

test('Filtrar productos por categoria', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  const checkbox = page.locator('label', { hasText: 'Hammer' }).locator('input');
  await checkbox.check();

  const products = page.locator('.card');
  await expect(products.first()).toBeVisible();
  await expect(products.first()).toContainText('Hammer');
});

test('Filtrar productos - Sin resultados', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  const checkbox = page.locator('label', { hasText: 'Hammer' }).locator('input');
  await checkbox.check();
  await page.fill('[placeholder="Search"]', 'productoinvalido');
  await page.locator('[data-test="search-submit"]').click();

  const noResults = page.locator('[data-test="no-results"]');
  await expect(noResults).toBeVisible();
});