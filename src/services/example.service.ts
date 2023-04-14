import { Service } from 'typedi';
import { Example } from '@/interfaces/example.interface';
import puppeteer, { Page } from 'puppeteer';

@Service()
export class ExampleService {
  public async lauchPuppeteer(): Promise<Page> {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--window-size=1400,1080'],
    });

    let page = (await browser.pages())[0];
    await page.setViewport({ width: 1400, height: 1080 });
    return page;
  }

  public async searchGoogle(page: Page, text: string): Promise<Example> {
    console.log('Abrindo página https://www.google.com');
    await page.goto('https://www.google.com', {
      waitUntil: 'networkidle0',
    });

    //query do navegador
    //document.querySelector("textarea[type='search']")

    const TEXT_AREA = "textarea[type='search']";

    console.log(`Digitando...`);
    await page.waitForSelector(TEXT_AREA, { timeout: 5000 });
    await page.type(TEXT_AREA, text);

    console.log(`Apertando botão enter...`);
    page.keyboard.press('Enter');

    return { text };
  }
}
