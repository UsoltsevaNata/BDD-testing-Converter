import { Browser, BrowserContext, BrowserContextOptions, chromium, Page } from 'playwright';
import { ConverterPage } from '../pom/converterPage';
import config from '../utils/config';
import path from 'path';
import { getFormattedTimestamp } from '../utils/timestamp';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;
let converterPage: ConverterPage;

const variables: { [key: string]: any } = {};

const actionMappings: { pattern: string; identifier: string }[] = [
    { pattern: 'Открыть страницу', identifier: 'openPage' },
    { pattern: 'Open page', identifier: 'openPage' },

    { pattern: 'Ввести значение', identifier: 'enterValue' },
    { pattern: 'Enter value',                  identifier: 'enterValue' },

    { pattern: 'Выбрать тип конвертации',      identifier: 'selectType' },
    { pattern: 'Select conversion type',       identifier: 'selectType' },

    { pattern: 'Нажать кнопку конвертации',    identifier: 'clickConvert' },
    { pattern: 'Click convert button',         identifier: 'clickConvert' },

    { pattern: 'Нажать кнопку очистки истории', identifier: 'clearHistory' },
    { pattern: 'Click clear history button',    identifier: 'clearHistory' },

    { pattern: 'Должен увидеть результат',     identifier: 'checkResultExact' },
    { pattern: 'Should see result',            identifier: 'checkResultExact' },

    { pattern: 'Результат должен содержать',   identifier: 'checkResultContains' },
    { pattern: 'Result should contain',        identifier: 'checkResultContains' },

    { pattern: 'Должен увидеть ошибку',        identifier: 'checkError' },
    { pattern: 'Should see error',             identifier: 'checkError' },

    { pattern: 'Должен увидеть количество записей в истории', identifier: 'checkHistoryCount' },
    { pattern: 'Should see history count',     identifier: 'checkHistoryCount' },

    { pattern: 'История должна быть пуста',    identifier: 'checkHistoryEmpty' },
    { pattern: 'History should be empty',      identifier: 'checkHistoryEmpty' }
];

function getActionIdentifier(action: string): string | null {
    for (const mapping of actionMappings) {
        if (action.startsWith(mapping.pattern)) {
            return mapping.identifier;
        }
    }
    return null;
}

export async function performAction(action: string, parameters: string[]) {
    await ensureBrowser();

    try {
        const id = getActionIdentifier(action);
        if (!id) {
            throw new Error(`Неизвестное действие: ${action}`);
        }

        switch (id) {
            case 'openPage':
                await converterPage.open(parameters[0]);
                break;

            case 'enterValue':
                await converterPage.enterValue(parameters[0]);
                break;

            case 'selectType':
                await converterPage.selectConversionType(parameters[0]);
                break;

            case 'clickConvert':
                await converterPage.clickConvert();
                break;

            case 'clearHistory':
                await converterPage.clearHistory();
                break;

            case 'checkResultExact':
                await converterPage.checkResultEquals(parameters[0]);
                break;

            case 'checkResultContains':
                await converterPage.checkResultContains(parameters[0]);
                break;

            case 'checkError':
                await converterPage.checkErrorContains(parameters[0]);
                break;

            case 'checkHistoryCount': {
                const count = parseInt(parameters[0]);
                await converterPage.checkHistoryCount(count);
                break;
            }

            case 'checkHistoryEmpty':
                await converterPage.checkHistoryEmpty();
                break;
        }
    } catch (error: any) {
        console.error(`❌ Error: ${action} → ${error.message}`);
        const ts = getFormattedTimestamp();
        throw error;
    }
}

async function ensureBrowser() {
    const isCI = process.env.CI === 'true';
    if (!browser) {
        browser = await chromium.launch({headless: true});
        const contextOptions: BrowserContextOptions = {};
        context = await browser.newContext(contextOptions);
        page = await context.newPage();
        converterPage = new ConverterPage(page);
    }
}


export async function closeBrowser() {
    if (page) {
        await page.close();
        page = null;
    }
    if (browser) {
        await browser.close();
        browser = null;
    }
}
export async function resetContext() {
    if (page) {
        await page.close();
        page = null;
    }
    if (context) {
        await context.close();
        context = null;
    }
    if (browser) {
        context = await browser.newContext();
        page = await context.newPage();
        converterPage = new ConverterPage(page);
    } else {
        await ensureBrowser();
    }
}
export function setVariable(name: string, value: any) {
    variables[name] = value;
}

export function getVariable(name: string): any {
    return variables[name];
}
