import { BasePage } from './BasePage';
import { productExpected as expected } from '@config/page-loader';
import { expect, Locator } from '@playwright/test';

export type ProductDetails = {
  name: string;
  displayName: string;
  price: string;
};

export class ProductPage extends BasePage {
  readonly path = '/menu-management-gc3/products';

  // ── Locators ──────────────────────────────────────────────────────────
  // locator-helper: attr_combo
  private createNewButton = this.page.locator('//button[@id="create-new-button"]');
  // locator-helper: attr_combo
  private productNameInput = this.page.locator('//input[@id="product-overview-name-input"]');
  // locator-helper: attr_combo
  private productDisplayNameInput = this.page.locator('//input[@id="product-overview-display-name-input"]');
  // locator-helper: attr_combo
  private priceInput = this.page.locator('//input[@id="enter-price-input-input"]');
  // locator-helper: attr_combo
  private createProductButton = this.page.locator('//button[@id="create-product-button"]');
  // locator-helper: attr_combo
  private successToast = this.page.locator('//li[contains(@class,"toast")][contains(.,"Product created successfully")]');

  // locator-helper: dyn_param
  private productRow(name: string): Locator {
    return this.page.locator(`//div[contains(@class,"table-last-row-border-none")][.//*[normalize-space()="${name}"]]`);
  }

  // ── Steps ──────────────────────────────────────────────────────────────
  /**
   * Navigates to the Products list under Menu Management GC3.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Opens the Create New product form from the products list.
   * @returns this for chaining
   */
  async step_openCreateForm(): Promise<this> {
    await this.page.goto('/menu-management-gc3/products/new', { waitUntil: 'domcontentloaded' });
    await this.productNameInput.waitFor({ state: 'visible', timeout: 15000 });
    return this;
  }

  /**
   * Fills mandatory product details on the create form.
   * @param details - Product name, display name, and price
   * @returns this for chaining
   */
  async step_fillMandatoryDetails(details: ProductDetails): Promise<this> {
    await this.productNameInput.click();
    await this.productNameInput.pressSequentially(details.name, { delay: 20 });
    await this.productDisplayNameInput.click();
    await this.productDisplayNameInput.pressSequentially(details.displayName, { delay: 20 });
    await this.priceInput.scrollIntoViewIfNeeded();
    await this.priceInput.click();
    await this.priceInput.pressSequentially(details.price, { delay: 20 });
    await this.priceInput.press('Tab');
    await expect(this.createProductButton).toBeEnabled({ timeout: 15000 });
    return this;
  }

  /**
   * Submits the create product form.
   * @returns this for chaining
   */
  async step_submitProduct(): Promise<this> {
    await this.createProductButton.click();
    await this.page.waitForURL('**/menu-management-gc3/products', { timeout: 20000 });
    await this.waitForPageLoad();
    return this;
  }

  // ── Verifies ───────────────────────────────────────────────────────────
  /**
   * Verifies the success toast and that the product appears in the list.
   * @param productName - The product name that should appear in the list
   * @returns this for chaining
   */
  async verify_productCreated(productName: string): Promise<this> {
    await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.successToast).toContainText(expected.successTitle);
    await expect(this.successToast).toContainText(productName);
    await this.productRow(productName).waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.productRow(productName)).toBeVisible();
    return this;
  }
}
