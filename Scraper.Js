const puppeteer = require('puppeteer');
const path = require('path');
const DownloadPath = path.resolve('./');
const MyURL = "https://app-dev.condoworks.co/security/login";


webScraper(MyURL);

async function webScraper(url) {
    //launch browser, open new page, and go to website
    const browser = await puppeteer.launch(
        { userDataDir: './' }
    );
    const page = await browser.newPage();
    await page.goto(MyURL);


    //Enter email, password, and click sign in
    await page.type('#Email', 'coop.test@condoworks.co');
    await page.type('#Password', 'MyTesting711');
    await page.click('#btnSubmit');

    await page.waitForNavigation();

    //Navigate to ../invoices/all
    await page.click('button[class="navbar-toggler"]');
    await page.waitForTimeout(400);
    await page.click('a[class="nav-link dropdown-toggle"]');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Search for '123' in invoices and click the appropriate invoice
    await page.waitForSelector('[name="invoices.InvoiceNumber"]');
    await page.type('input[name="invoices.InvoiceNumber"]', '123');
    await page.waitForTimeout(1200); 
    await page.click("#\\32  > td:nth-child(1) > a > button");

    // Wait for invoice page to load and set the download path
    await page.waitForTimeout(4000);
    await page._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: DownloadPath
    });

    // Click the download icon and wait for download to complete before closing browser
    await page.click('#thumb-InvoiceFile-init-0 > div.file-thumbnail-footer > div.file-actions > div > a');
    console.log('file download in progress...');
    await page.waitForTimeout(4000);
    console.log("File successfully downloaded to: " + DownloadPath);

    await browser.close();
}
