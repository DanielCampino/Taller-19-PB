const { test } = require('../fixtures/fixtures');
const { expect } = require('@playwright/test');

//Interceptar petición
test('Interceptar petición', async ({ page }) => {

  await page.route('**/practicesoftwaretesting.com**', async route => {
    const headers = route.request().headers();

    headers['x-test-header'] = 'Mock-Header';
    expect(headers['x-test-header']).toBe('Mock-Header');

    await route.continue({ headers });
  });

  await page.goto('https://practicesoftwaretesting.com');
});

//Modificar respuesta
test('Modificar respuesta', async ({ page }) => {
  await page.route('**/api.practicesoftwaretesting.com/products**', async route => {
    const response = await route.fetch();
    const json = await response.json();

    json.data[0].name = 'Producto Modificado';

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

  await page.goto('https://practicesoftwaretesting.com');

  const products = page.locator('.card');
  await expect(products.first()).toBeVisible();
  await expect(products.first()).toContainText('Producto Modificado');
});

//Mock - Productos vacios
test('Mock - Productos vacios', async ({ page }) => {

  await page.route('**/api.practicesoftwaretesting.com/products**', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] })
    });
  });

  await page.goto('https://practicesoftwaretesting.com');
  await expect(page.locator('[data-test="no-results"]')).toBeVisible();
  await expect(page.locator('.card')).toHaveCount(0);
});

//Error de Servidor
test('Error de Servidor', async ({ page }) => {
  await page.route('**/api.practicesoftwaretesting.com/products**', route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' })
    });
  });

  await page.goto('https://practicesoftwaretesting.com');

  const products = page.locator('.card');
  await expect(products).toHaveCount(0);
});