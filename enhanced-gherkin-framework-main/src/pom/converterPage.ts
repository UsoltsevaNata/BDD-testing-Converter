import { Page } from 'playwright';
import { expect } from 'chai';

export class BasePage {
    constructor(protected page: Page) {}
    async open(url: string) {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }
    async click(selector: string) {
        await this.page.click(selector);
    }

    async type(selector: string, text: string) {
        await this.page.fill(selector, text);
    }

    async clear(selector: string) {
        await this.page.fill(selector, '');
    }

    async getText(selector: string): Promise<string> {
        const txt = await this.page.textContent(selector);
        return (txt || '').trim();
    }

    async checkTextEquals(selector: string, expectedText: string) {
        const actual = await this.getText(selector);
        expect(actual).to.equal(expectedText);
    }

    async checkTextContains(selector: string, expectedText: string) {
        const actual = await this.getText(selector);
        expect(actual).to.include(expectedText);
    }
    //Для возможности проверки количества записей в истории
    async getElementCount(selector: string): Promise<number> {
        const elements = await this.page.$$(selector);
        return elements.length;
    }
}
export class ConverterPage extends BasePage {
    //Ввод значения в соответствующеее поле
    async enterValue(value: string) {
        await this.clear('#value');
        await this.type('#value', value);
    }
    //Выбор типа конвертации
    async selectConversionType(type: string) {
        await this.page.selectOption('#type', type);
    }
    //Нажатие на кнопку Рассчитать
    async clickConvert() {
        await this.click('#convertBtn');
    }
    //Возврат результата
    async getResult(): Promise<string> {
        return await this.getText('#resultText');
    }
    //Проверка, корректности полученного резульата
    async checkResultEquals(expected: string) {
        await this.checkTextEquals('#resultText', expected);
    }

    async checkResultContains(substring: string) {
        await this.checkTextContains('#resultText', substring);
    }

    //Возврат текста о ошибке
    async getError(): Promise<string> {
        return await this.getText('#errorBlock');
    }

    async checkErrorContains(expectedError: string) {
        await this.checkTextContains('#errorBlock', expectedError);
    }
    //Количество записей в истории конвертации
    async getHistoryCount(): Promise<number> {
        return await this.getElementCount('#historyList li');
    }
    //Проверка количества записей в истории
    async checkHistoryCount(expected: number) {
        const actual = await this.getHistoryCount();
        expect(actual).to.equal(expected, `Ожидалось ${expected} записей в истории, найдено ${actual}`);
    }
    //Проверка пуста ли история
    async checkHistoryEmpty() {
        const count = await this.getHistoryCount();
        expect(count).to.equal(0, 'История должна быть пуста');
    }
    //Нажатие на кнопку очишение
    async clearHistory() {
        await this.click('#clearHistoryBtn');
    }
}
