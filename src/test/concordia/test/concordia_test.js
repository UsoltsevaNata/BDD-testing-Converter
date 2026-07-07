// Generated with ❤ by Concordia
// source: C:/IdeaProjects/demo/features/concordia_test.testcase
//
// THIS IS A GENERATED FILE - MODIFICATIONS CAN BE LOST !

const assert = require("assert").strict;

Feature("Unit conversion");

Scenario("Kilograms to grams | kilograms_to_grams - 1", async ({I}) => {
    I.amOnPage("/"); // (13,3)
    I.fillField('#value', "5"); // (14,3)
    I.selectOption('#type', "kg-to-g"); // (15,5)
    I.click('#convertBtn'); // (16,5)
    I.see("5 кг = 5000 г"); // (17,3)
});

Scenario("Kilograms to grams | meters_to_kilometers - 1", async ({I}) => {
    I.amOnPage("/"); // (25,3)
    I.fillField('#value', "1500"); // (26,3)
    I.selectOption('#type', "m-to-km"); // (27,5)
    I.click('#convertBtn'); // (28,5)
    I.see("1,5"); // (29,3)
});

Scenario("Kilograms to grams | kilometers_to_meters - 1", async ({I}) => {
    I.amOnPage("/"); // (37,3)
    I.fillField('#value', "1"); // (38,3)
    I.selectOption('#type', "km-to-m"); // (39,5)
    I.click('#convertBtn'); // (40,5)
    I.see("1 км = 1000 м"); // (41,3)
});

Scenario("Kilograms to grams | meters_to_centimeters - 1", async ({I}) => {
    I.amOnPage("/"); // (49,3)
    I.fillField('#value', "1"); // (50,3)
    I.selectOption('#type', "m-to-cm"); // (51,5)
    I.click('#convertBtn'); // (52,5)
    I.see("1 м = 100 см"); // (53,3)
});

Scenario("Kilograms to grams | centimeters_to_meters - 1", async ({I}) => {
    I.amOnPage("/"); // (61,3)
    I.fillField('#value', "250"); // (62,3)
    I.selectOption('#type', "cm-to-m"); // (63,5)
    I.click('#convertBtn'); // (64,5)
    I.see("2,5"); // (65,3)
});

Scenario("Kilograms to grams | meters_to_millimeters - 1", async ({I}) => {
    I.amOnPage("/"); // (73,3)
    I.fillField('#value', "3"); // (74,3)
    I.selectOption('#type', "m-to-mm"); // (75,5)
    I.click('#convertBtn'); // (76,5)
    I.see("3 м = 3000 мм"); // (77,3)
});

Scenario("Kilograms to grams | celsius_to_fahrenheit - 1", async ({I}) => {
    I.amOnPage("/"); // (85,3)
    I.fillField('#value', "100"); // (86,3)
    I.selectOption('#type', "c-to-f"); // (87,5)
    I.click('#convertBtn'); // (88,5)
    I.see("100 C = 212 F"); // (89,3)
});

Scenario("Kilograms to grams | fahrenheit_to_celsius - 1", async ({I}) => {
    I.amOnPage("/"); // (97,3)
    I.fillField('#value', "32"); // (98,3)
    I.selectOption('#type', "f-to-c"); // (99,5)
    I.click('#convertBtn'); // (100,5)
    I.see("0"); // (101,3)
});

Scenario("Kilograms to grams | kelvin_to_celsius - 1", async ({I}) => {
    I.amOnPage("/"); // (109,3)
    I.fillField('#value', "0"); // (110,3)
    I.selectOption('#type', "k-to-c"); // (111,5)
    I.click('#convertBtn'); // (112,5)
    I.see("-273,15"); // (113,3)
});

Scenario("Kilograms to grams | alphabetic_string - 1", async ({I}) => {
    I.amOnPage("/"); // (121,3)
    I.fillField('#value', "abc"); // (122,3)
    I.selectOption('#type', "kg-to-g"); // (123,5)
    I.click('#convertBtn'); // (124,5)
    I.seeInField('#errorBlock', "Введите корректное числовое значение"); // (125,3)
});

Scenario("Kilograms to grams | characters - 1", async ({I}) => {
    I.amOnPage("/"); // (133,3)
    I.fillField('#value', "!@#"); // (134,3)
    I.selectOption('#type', "m-to-km"); // (135,5)
    I.click('#convertBtn'); // (136,5)
    I.seeInField('#errorBlock', "Введите корректное числовое значение"); // (137,3)
});

Scenario("Kilograms to grams | negative_mass - 1", async ({I}) => {
    I.amOnPage("/"); // (145,3)
    I.fillField('#value', "-5"); // (146,3)
    I.selectOption('#type', "kg-to-g"); // (147,5)
    I.click('#convertBtn'); // (148,5)
    I.seeInField('#errorBlock', "Значение не может быть отрицательным"); // (149,3)
});

Scenario("Kilograms to grams | negative_length - 1", async ({I}) => {
    I.amOnPage("/"); // (157,3)
    I.fillField('#value', "-100"); // (158,3)
    I.selectOption('#type', "m-to-km"); // (159,5)
    I.click('#convertBtn'); // (160,5)
    I.seeInField('#errorBlock', "Значение не может быть отрицательным"); // (161,3)
});

Scenario("Kilograms to grams | negative_kelvin - 1", async ({I}) => {
    I.amOnPage("/"); // (169,3)
    I.fillField('#value', "-10"); // (170,3)
    I.selectOption('#type', "k-to-c"); // (171,5)
    I.click('#convertBtn'); // (172,5)
    I.seeInField('#errorBlock', "Температура в Кельвинах не может быть отрицательной"); // (173,3)
});

Scenario("Kilograms to grams | below_absolute_zero_celsius - 1", async ({I}) => {
    I.amOnPage("/"); // (181,3)
    I.fillField('#value', "-300"); // (182,3)
    I.selectOption('#type', "c-to-f"); // (183,5)
    I.click('#convertBtn'); // (184,5)
    I.seeInField('#errorBlock', "Температура ниже абсолютного нуля"); // (185,3)
});

Scenario("Kilograms to grams | below_absolute_zero_fahrenheit - 1", async ({I}) => {
    I.amOnPage("/"); // (193,3)
    I.fillField('#value', "-500"); // (194,3)
    I.selectOption('#type', "f-to-c"); // (195,5)
    I.click('#convertBtn'); // (196,5)
    I.seeInField('#errorBlock', "Температура ниже абсолютного нуля"); // (197,3)
});

Scenario("Kilograms to grams | result_added - 1", async ({I}) => {
    I.amOnPage("/"); // (205,3)
    I.fillField('#value', "100"); // (206,3)
    I.selectOption('#type', "m-to-km"); // (207,5)
    I.click('#convertBtn'); // (208,5)
    I.see("0,1"); // (209,3)
});

Scenario("Kilograms to grams | three_conversions - 1", async ({I}) => {
    I.amOnPage("/"); // (217,3)
    I.fillField('#value', "5"); // (218,3)
    I.selectOption('#type', "kg-to-g"); // (219,5)
    I.click('#convertBtn'); // (220,5)
    I.fillField('#value', "100"); // (221,5)
    I.selectOption('#type', "c-to-f"); // (222,5)
    I.click('#convertBtn'); // (223,5)
    I.fillField('#value', "1"); // (224,5)
    I.selectOption('#type', "km-to-m"); // (225,5)
    I.click('#convertBtn'); // (226,5)
    I.see("5 кг = 5000 г"); // (227,3)
    I.see("100 C = 212 F"); // (228,5)
    I.see("1 км = 1000 м"); // (229,5)
});

Scenario("Kilograms to grams | history_cleared - 1", async ({I}) => {
    I.amOnPage("/"); // (237,3)
    I.fillField('#value', "1"); // (238,3)
    I.selectOption('#type', "km-to-m"); // (239,5)
    I.click('#convertBtn'); // (240,5)
    I.click('#clearHistoryBtn'); // (241,5)
    I.wait(2); // (242,5)
    I.dontSee("1 км = 1000 м"); // (243,3)
});

Scenario("Kilograms to grams | invalid_input_skipped - 1", async ({I}) => {
    I.amOnPage("/"); // (251,3)
    I.fillField('#value', "abc"); // (252,3)
    I.selectOption('#type', "kg-to-g"); // (253,5)
    I.click('#convertBtn'); // (254,5)
    I.see("Введите корректное числовое значение"); // (255,3)
    I.dontSee("abc кг"); // (256,5)
});

