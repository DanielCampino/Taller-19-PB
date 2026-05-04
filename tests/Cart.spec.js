const { test } = require('../fixtures/fixtures');
const { expect } = require('@playwright/test');

test('Añadir producto a carrito', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com');

  const firstProduct = page.locator('[data-test="product-name"]').first();
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();

  await expect(page).toHaveURL(/product/);
  await page.click('[data-test="add-to-cart"]');

  const cart = page.locator('[data-test="nav-cart"]');
  await expect(cart).toBeVisible();
  await cart.click();

  await expect(page).toHaveURL(/checkout/);
  await expect(page.locator('table')).toBeVisible();
  await expect(page.locator('tbody tr')).toHaveCount(1);
  await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('1');
});

test('Carrito vacio', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/checkout');

  await expect(page.locator('table')).not.toBeVisible();
});