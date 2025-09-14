import { test, expect, Page } from '@playwright/test';

async function fillCustomerInformation(page: Page) {
  const nameInput = page.locator('#name, input[name="customer_name"]');
  await nameInput.fill('Matt');

  // Verify name was filled
  await expect(nameInput).toHaveValue('Matt');

  const emailInput = page.locator('#email, input[name="customer_email"]');
  await emailInput.fill('matt@example.com');

  // Verify email was filled
  await expect(emailInput).toHaveValue('matt@example.com');
}

async function addDomains(page: Page) {
  const bringDomainInput = page.locator('#bring-domain-input');
  const bringAddButton = page.locator('#bring-domain-add-btn');

  // Add first bring domain
  await bringDomainInput.fill('example.com');
  await bringAddButton.click();

  await page.waitForTimeout(500);

  // Verify first domain was added
  await expect(page.locator('text=example.com')).toBeVisible();

  // Add second bring domain
  await bringDomainInput.fill('test.com');
  await bringAddButton.click();
  await page.waitForTimeout(500);

  // Verify second domain was added
  await expect(page.locator('text=test.com')).toBeVisible();

  // Add Buy Domain
  const buyDomainsSection = page.locator('h3:has-text("Buy Domains")').locator('..');
  const buyDomainInput = buyDomainsSection.locator('input[type="text"]').first();
  await buyDomainInput.fill('mydomain.com');

  const buyAddButton = buyDomainsSection.locator('button:has-text("Add")');
  await buyAddButton.click();
  await page.waitForTimeout(500);

  // Verify at least one domain exists (form validation requirement)
  const domainCount = await page.locator('button:has-text("Remove")').count();
  expect(domainCount).toBe(3);
}


async function submitOrderAndGetId(page: Page): Promise<string | null> {
  const submitButton = page.locator('#order-submit-btn');

  // Wait for button to be enabled
  await expect(submitButton).toBeEnabled({ timeout: 5000 });
  await submitButton.click();

  // The form has a 5-second validation period before actual submission (ref: resources/js/pages/Orders/Create.tsx line 140)
  await page.waitForTimeout(5500);

  // Wait for navigation to the order summary page
  await page.waitForURL(/.*\/order.*/, { timeout: 10000 });

  // Look for the Order ID
  const orderIdElement = page.locator('p.text-gray-600:has-text("Order ID:")');
  const orderIdText = await orderIdElement.textContent();
  const orderIdMatch = orderIdText?.match(/Order ID:\s*(.+)/);

  return orderIdMatch ? orderIdMatch[1].trim() : null;
}

test.describe('Order Flow', () => {
  test('should complete order creation flow', async ({ page }) => {
    await page.goto('https://automation-hiring-challenge.fly.dev/');
    await page.waitForSelector('form', { timeout: 10000 });

    // Fill customer information
    await fillCustomerInformation(page);

    // Add domains
    await addDomains(page);

    // Submit order and get ID
    const orderId = await submitOrderAndGetId(page);

    if (orderId) {
      console.log(`Order successfully created with ID: ${orderId}`);
      expect(orderId).toBeTruthy();
    } else {
      console.log('Could not find order ID');
      expect(false).toBeTruthy();
    }
  });
});
