import { BasePage } from './BasePage';
import { productExpected as expected } from '@config/page-loader';
import { expect, Locator } from '@playwright/test';

export type ProductDetails = {
  name: string;
  displayName: string;
  price: string;
  description?: string;
  externalId?: string;
  calories?: string;
  /** Set to false to mark the product as inactive before submitting. Defaults to active (true). */
  statusActive?: boolean;
  /** Set to true to select "Price Excludes Tax" instead of the default "Price Includes Tax". */
  priceExcludesTax?: boolean;
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
  private productDescriptionInput = this.page.locator('//textarea[@id="product-overview-description-input-input"]');
  // locator-helper: attr_combo
  private productExternalIdInput = this.page.locator('//input[@id="product-overview-external-id-input"]');
  // locator-helper: attr_combo
  private priceInput = this.page.locator('//input[@id="enter-price-input-input"]');
  // locator-helper: attr_combo
  private nutritionalInfoTab = this.page.locator('//button[contains(normalize-space(.),"Nutritional Info")]');
  // locator-helper: attr_combo
  private caloriesInput = this.page.locator('//input[@id="input-field-input"]');
  // locator-helper: attr_combo
  private statusToggle = this.page.locator('//button[@id="product-overview-status"]');
  // locator-helper: attr_combo
  private priceExcludesTaxRadio = this.page.locator('//button[@id="horizontal-2"]');
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
   * Opens the Create New product form.
   * @returns this for chaining
   */
  async step_openCreateForm(): Promise<this> {
    await this.page.goto('/menu-management-gc3/products/new', { waitUntil: 'domcontentloaded' });
    await this.productNameInput.waitFor({ state: 'visible', timeout: 15000 });
    return this;
  }

  /**
   * Types into a React-controlled input field.
   * @param locator - Target input locator
   * @param value - Text value to enter
   * @returns this for chaining
   */
  private async typeIntoField(locator: Locator, value: string): Promise<void> {
    await locator.click();
    await locator.pressSequentially(value, { delay: 20 });
  }

  /**
   * Fills product details on the create form (mandatory and optional fields).
   * @param details - Product field values to enter
   * @returns this for chaining
   */
  async step_fillProductDetails(details: ProductDetails): Promise<this> {
    await this.typeIntoField(this.productNameInput, details.name);
    await this.typeIntoField(this.productDisplayNameInput, details.displayName);

    if (details.description) {
      await this.productDescriptionInput.fill(details.description);
    }

    if (details.externalId) {
      await this.typeIntoField(this.productExternalIdInput, details.externalId);
    }

    await this.priceInput.scrollIntoViewIfNeeded();
    await this.typeIntoField(this.priceInput, details.price);
    await this.priceInput.press('Tab');

    if (details.calories) {
      await this.nutritionalInfoTab.click();
      await this.caloriesInput.waitFor({ state: 'visible', timeout: 10000 });
      await this.typeIntoField(this.caloriesInput, details.calories);
    }

    if (details.statusActive === false) {
      const ariaChecked = await this.statusToggle.getAttribute('aria-checked');
      if (ariaChecked === 'true') {
        await this.statusToggle.click();
      }
    }

    if (details.priceExcludesTax === true) {
      await this.priceExcludesTaxRadio.scrollIntoViewIfNeeded();
      await this.priceExcludesTaxRadio.click();
    }

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
