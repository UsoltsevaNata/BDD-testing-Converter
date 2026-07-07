const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getPage } = require('../support/hooks');

// -------------------- Общие шаги --------------------
Given('пользователь открывает страницу конвертера', async function () {
  const page = getPage();
  await page.goto('http://localhost:8080/');
  // Ждём загрузки формы (поле ввода)
  await page.waitForSelector('#value', { timeout: 10000 });
});

When('пользователь вводит значение {string}', async function (value) {
  const page = getPage();
  await page.fill('#value', value);
});

When('выбирает тип конвертации {string}', async function (type) {
  const page = getPage();
  await page.selectOption('#type', type);
});

When('нажимает кнопку "Рассчитать"', async function () {
  const page = getPage();
  await page.click('#convertBtn');
  // Ожидаем появления результата или ошибки
  await Promise.race([
    page.waitForSelector('#resultText', { timeout: 5000 }),
    page.waitForSelector('#errorBlock', { timeout: 5000 })
  ]);
});

// Шаг для выполнения конвертации в несколько действий (для истории)
When('пользователь выполняет конвертацию {string} типа {string}', async function (value, type) {
  const page = getPage();
  await page.fill('#value', value);
  await page.selectOption('#type', type);
  await page.click('#convertBtn');
  await Promise.race([
    page.waitForSelector('#resultText', { timeout: 5000 }),
    page.waitForSelector('#errorBlock', { timeout: 5000 })
  ]);
});

When('пользователь нажимает "Очистить" историю', async function () {
  const page = getPage();
  await page.click('#clearHistoryBtn');
  // Небольшая пауза для обновления истории
  await page.waitForTimeout(500);
});

// -------------------- Проверки результата --------------------
Then('отображается результат {string}', async function (expected) {
  const page = getPage();
  const resultLocator = page.locator('#resultText');
  await expect(resultLocator).toHaveText(expected);
});

Then('результат содержит {string}', async function (expected) {
  const page = getPage();
  const resultLocator = page.locator('#resultText');
  await expect(resultLocator).toContainText(expected);
});

Then('отображается результат содержащий {string}', async function (expected) {
  const page = getPage();
  const resultLocator = page.locator('#resultText');
  await expect(resultLocator).toContainText(expected);
});

// -------------------- Проверки ошибок --------------------
Then('отображается ошибка {string}', async function (expected) {
  const page = getPage();
  const errorLocator = page.locator('#errorBlock');
  await expect(errorLocator).toContainText(expected);
});

// -------------------- Проверки истории --------------------
Then('история содержит {int} запись', async function (count) {
  const page = getPage();
  const historyItems = page.locator('#historyList li');
  await expect(historyItems).toHaveCount(count);
});

Then('история содержит {int} записи', async function (count) {
  const page = getPage();
  const historyItems = page.locator('#historyList li');
  await expect(historyItems).toHaveCount(count);
});

Then('история содержит {int} записей', async function (count) {
  const page = getPage();
  const historyItems = page.locator('#historyList li');
  await expect(historyItems).toHaveCount(count);
});

Then('история пуста', async function () {
  const page = getPage();
  const historyItems = page.locator('#historyList li');
  await expect(historyItems).toHaveCount(0);
});