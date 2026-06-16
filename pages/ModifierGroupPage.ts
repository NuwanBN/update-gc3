import { BasePage } from './BasePage';
import { modifiergroupExpected as expected } from '@config/page-loader';
import { expect, Locator } from '@playwright/test';

export type ModifierGroupType = 'product' | 'text';

export type ModifierGroupDetails = {
  name: string;
  displayName: string;
  description?: string;
  externalId?: string;
};

export class ModifierGroupPage extends BasePage {
  readonly path = '/menu-management-gc3/modifier-groups';

  // ── Locators ──────────────────────────────────────────────────────────
  // locator-helper: attr_combo
  private createNewButton = this.page.locator('//button[@id="create-new-button"]');
  // locator-helper: attr_combo
  private typeDialogProductOption = this.page.locator('//*[@id="modifier-type-product"]');
  // locator-helper: attr_combo
  private typeDialogTextOption = this.page.locator('//*[@id="modifier-type-text"]');
  // locator-helper: attr_combo
  private nameInput = this.page.locator('//input[@id="overview-name-input"]');
  // locator-helper: attr_combo
  private displayNameInput = this.page.locator('//input[@id="overview-display-name-input"]');
  // locator-helper: attr_combo
  private descriptionInput = this.page.locator('//textarea[@id="overview-description-input"]');
  // locator-helper: attr_combo
  private externalIdInput = this.page.locator('//input[@id="overview-external-id-input"]');
  // locator-helper: attr_combo
  private createButton = this.page.locator('//button[@id="create-button"]');
  // locator-helper: attr_combo
  private successToast = this.page.locator('//li[contains(@class,"toast")][contains(.,"Modifier group created successfully")]');
  // locator-helper: attr_combo
  private deleteConfirmButton = this.page.locator('//button[@id="delete-modifier-group-confirmation-confirm-button"]');
  // locator-helper: attr_combo – inside the "Add Text" modifier dialog
  private textModifierNameInput = this.page.locator('//input[@id="undefined-modifier-name-translation-input"]');
  // locator-helper: attr_combo – save button inside the modifier dialog
  private textModifierSaveButton = this.page.locator('//button[@id="undefined-save-button"]');
  // locator-helper: attr_combo – search input in the "Select Products" dialog
  private productModifierSearchInput = this.page.locator('//input[@placeholder="Enter product name..."]');
  // locator-helper: text – confirms product selection in the "Select Products" dialog
  private addModifiersConfirmButton = this.page.locator('//*[@role="dialog"]//button[normalize-space()="Add Modifiers"]');

  // locator-helper: dyn_param – product row checkbox inside the "Select Products" dialog
  private productModifierRowCheckbox(productName: string): Locator {
    return this.page.locator(
      `//div[contains(@class,"table-last-row-border-none")][.//*[contains(normalize-space(),"${productName}")]]//*[@data-cy[contains(.,"product-table-select-") and not(contains(.,"select-all"))]]`
    );
  }

  // locator-helper: dyn_param
  private modifierGroupRow(name: string): Locator {
    return this.page.locator(`//div[contains(@class,"table-last-row-border-none")][.//*[normalize-space()="${name}"]]`);
  }

  // locator-helper: dyn_param
  private modifierGroupRowDropdown(name: string): Locator {
    return this.page.locator(
      `//div[contains(@class,"table-last-row-border-none")][.//*[normalize-space()="${name}"]]//*[@data-cy[contains(.,"product-table-dropdown")]]`
    );
  }

  // ── Steps ──────────────────────────────────────────────────────────────
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Opens the Create New dialog and selects the modifier group type, then
   * waits for the creation form to load.
   */
  async step_openCreateForm(type: ModifierGroupType): Promise<this> {
    await this.createNewButton.click();
    const typeOption = type === 'product' ? this.typeDialogProductOption : this.typeDialogTextOption;
    await typeOption.waitFor({ state: 'visible', timeout: 8000 });
    await typeOption.click();
    await this.page.waitForURL(`**/modifier-groups/${type}/new`, { timeout: 15000 });
    await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
    return this;
  }

  private async typeIntoField(locator: Locator, value: string): Promise<void> {
    await locator.click();
    await locator.pressSequentially(value, { delay: 20 });
  }

  /**
   * Fills the modifier group details on the create form.
   */
  async step_fillDetails(details: ModifierGroupDetails): Promise<this> {
    await this.typeIntoField(this.nameInput, details.name);
    await this.nameInput.press('Tab');

    await this.displayNameInput.clear();
    await this.typeIntoField(this.displayNameInput, details.displayName);
    await this.displayNameInput.press('Tab');

    if (details.description) {
      await this.descriptionInput.fill(details.description);
    }

    if (details.externalId) {
      await this.typeIntoField(this.externalIdInput, details.externalId);
      await this.externalIdInput.press('Tab');
    }

    return this;
  }

  /**
   * Opens the "Add Text" modifier dialog, fills the modifier name, and saves.
   * Required for Text Modifier Groups before the create button becomes enabled.
   */
  async step_addTextModifier(modifierName: string): Promise<this> {
    await this.page.locator('//button[@id="create-modifier-button"]').click();
    await this.textModifierNameInput.waitFor({ state: 'visible', timeout: 8000 });
    await this.typeIntoField(this.textModifierNameInput, modifierName);
    await this.textModifierNameInput.press('Tab');
    await expect(this.textModifierSaveButton).toBeEnabled({ timeout: 8000 });
    await this.textModifierSaveButton.click();
    await this.textModifierNameInput.waitFor({ state: 'hidden', timeout: 8000 });
    await expect(this.createButton).toBeEnabled({ timeout: 10000 });
    return this;
  }

  /**
   * Opens the "Select Products" dialog, searches for the product by name,
   * selects it via its row checkbox, and confirms with "Add Modifiers".
   * Required for Product Modifier Groups when you want a product as a modifier.
   */
  async step_addProductModifier(productName: string): Promise<this> {
    await this.page.locator('//button[@id="create-modifier-button"]').click();
    await this.productModifierSearchInput.waitFor({ state: 'visible', timeout: 8000 });
    await this.productModifierSearchInput.fill(productName);
    await this.productModifierRowCheckbox(productName).waitFor({ state: 'visible', timeout: 15000 });
    await this.productModifierRowCheckbox(productName).click({ force: true });
    await this.addModifiersConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.addModifiersConfirmButton.click();
    await this.productModifierSearchInput.waitFor({ state: 'hidden', timeout: 8000 });
    await expect(this.createButton).toBeEnabled({ timeout: 10000 });
    return this;
  }

  /**
   * Submits the create modifier group form and waits for the list page.
   */
  async step_submit(): Promise<this> {
    await expect(this.createButton).toBeEnabled({ timeout: 15000 });
    await this.createButton.click();
    await this.page.waitForURL('**/menu-management-gc3/modifier-groups', { timeout: 20000 });
    await this.waitForPageLoad();
    return this;
  }

  // ── Verifies ───────────────────────────────────────────────────────────
  async verify_created(name: string): Promise<this> {
    await this.successToast.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.successToast).toContainText(expected.successTitle);
    await expect(this.successToast).toContainText(name);
    await this.modifierGroupRow(name).waitFor({ state: 'visible', timeout: 15000 });
    await expect(this.modifierGroupRow(name)).toBeVisible();
    return this;
  }

  /**
   * Deletes the modifier group by name via the row kebab menu → Delete → Yes, Delete.
   */
  async step_delete(name: string): Promise<this> {
    if (!this.page.url().includes('/menu-management-gc3/modifier-groups')) {
      await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
      await this.waitForPageLoad();
    }
    await this.modifierGroupRow(name).waitFor({ state: 'visible', timeout: 15000 });
    await this.modifierGroupRowDropdown(name).click();
    await this.page.locator('[role="menuitem"]').filter({ hasText: 'Delete' }).first().waitFor({ state: 'visible', timeout: 5000 });
    await this.page.locator('[role="menuitem"]').filter({ hasText: 'Delete' }).first().click();
    await this.deleteConfirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.deleteConfirmButton.click();
    await this.modifierGroupRow(name).waitFor({ state: 'hidden', timeout: 10000 });
    return this;
  }
}
