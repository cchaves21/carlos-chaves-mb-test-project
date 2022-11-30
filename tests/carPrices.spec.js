import { test, expect } from '@playwright/test';
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const urlBase = 'https://www.mercedes-benz.co.uk/passengercars.html'

//Parce of the cvs file with the tests inputs
const records = parse(fs.readFileSync(path.join(__dirname, '../input.csv')), {
  columns: true,
  skip_empty_lines: true
});

//Accessing the home url
test.beforeEach(async ({ page }) => {
  await page.goto(urlBase);
});

test.describe('Validate model prices', () => {

  for (const record of records) {

    test(`Validate ${record.model} models price are between £${record.lower_value} and £${record.higher_value}`, async ({ page }) => {
    
      //Path to get to the pricing page
      await expect(page).toHaveTitle('Mercedes-Benz Passenger Cars');
      await page.getByRole('button', { name: 'Agree to all' }).click();
      await page.getByRole('menuitem', { name: 'Our Cars' }).click();
      await page.locator('p:has-text("Hatchbacks")').click();
      await page.getByRole('link', { name: 'A-Class Hatchback' }).click();
      await page.locator('owc-stage:has-text("A-Class Hatchback Build your carSearch online")').getByRole('link', { name: 'Build your car' }).click();
      await page.getByRole('button', { name: 'Fuel type, selected 0 items' }).click();
      await page.locator('label:has-text("Diesel") wb-icon').click();
      await page.getByRole('button', { name: 'Fuel type, selected 1 items' }).click();

      //Count all price elements
      const elemtsSize = await page.locator(".cc-motorization-header__info-box").count();

      //validation of each price element on page
      for(let i = 0; i <= elemtsSize -1; i++){
        let fullText = await page.locator(".cc-motorization-header__info-box").nth(i).textContent();
        let price = await fullText.split("£")[1].replace(",", "");
        await expect(parseInt(price)).toBeGreaterThan(parseInt(record.lower_value));
        await expect(parseInt(price)).toBeLessThan(parseInt(record.higher_value));
      }
    });
  }
});