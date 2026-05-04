const base = require('@playwright/test');
const { expect } = require('@playwright/test');

exports.test = base.test.extend({
  loggedPage: async ({ page }, use) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');

    await page.fill('[data-test="email"]', 'customer@practicesoftwaretesting.com');
    await page.fill('[data-test="password"]', 'welcome01');
    await page.click('[data-test="login-submit"]');
    await expect(page).toHaveURL(/account|home/);

    await use(page);
  },

  filledCart: async ({ loggedPage }, use) => {
    await loggedPage.click('[data-test="nav-home"]');
    const firstProduct = loggedPage.locator('[data-test="product-name"]').first();
    await expect(firstProduct).toBeVisible();
    await firstProduct.click();

    await expect(loggedPage).toHaveURL(/product/);
    await loggedPage.click('[data-test="add-to-cart"]');

    const cart = loggedPage.locator('[data-test="nav-cart"]');
    await expect(cart).toBeVisible();
    await cart.click();

    await use(loggedPage);
  }
});

exports.expect = base.expect;