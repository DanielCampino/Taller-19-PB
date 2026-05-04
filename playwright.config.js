const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    headless: true,

    screenshot: 'on',
    video: 'on',
    trace: 'on'
  },

  reporter: [
    ['html'],
    ['list']
  ],

  workers: 1
});