/*
* spider for wiki sites of candidates
*/

const { Builder, By, Key, util } = require('selenium-webdriver');

async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.wikipedia.org/");
    await driver.findElement(By.name('search-input')).sendKeys('Selenium', Key.ENTER);

}
example();