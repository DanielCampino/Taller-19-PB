const { test } = require('../fixtures/fixtures');
const { expect } = require('@playwright/test');

test('Checkout valido - Efectivo', async ({ filledCart }) => {

  await filledCart.locator('[data-test="proceed-1"]').click();
  await filledCart.locator('[data-test="proceed-2"]').click();
  await filledCart.locator('[data-test="country"]').selectOption({ index: 1 });
  await filledCart.locator('[data-test="postal_code"]').fill('123');
  await filledCart.locator('[data-test="house_number"]').fill('12');
  await filledCart.locator('[data-test="street"]').fill('Skiles Roads');
  await filledCart.locator('[data-test="city"]').fill('West Carolanneside');
  await filledCart.locator('[data-test="state"]').fill('South Dakota');
  
  const submit = filledCart.locator('[data-test="proceed-3"]');
  await expect(submit).toBeEnabled();
  await submit.click();

  await filledCart.locator('[data-test="payment-method"]')
    .selectOption('cash-on-delivery');
  const finish = filledCart.locator('[data-test="finish"]');
  await expect(finish).toBeEnabled();
  await finish.click();
  await expect (filledCart.locator('[data-test="payment-success-message"]')).toBeVisible();
});

test('Checkout invalido - Campos Vacios', async ({ filledCart }) => {
  await filledCart.locator('[data-test="proceed-1"]').click();
  await filledCart.locator('[data-test="proceed-2"]').click();
  const submit = filledCart.locator('[data-test="proceed-3"]');

  await expect(submit).toBeVisible();
  await expect(submit).not.toBeEnabled();
});