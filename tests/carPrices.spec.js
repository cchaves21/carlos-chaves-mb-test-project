import { test, expect } from '@playwright/test';

const urlBase = 'https://www.mercedes-benz.co.uk/passengercars.html'

//Accessing the home url
test.beforeEach(async ({ page }) => {
  await page.goto(urlBase);
});

test.describe('Validate model prices', () => {

  test('Validate A Class models price are between £15,000 and £60,000', async ({ page }) => {
   
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
      await expect(parseInt(price)).toBeGreaterThan(15000);
      await expect(parseInt(price)).toBeLessThan(60000);
    }
  });
});