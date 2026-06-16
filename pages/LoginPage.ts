// AUTO-GENERATED — edit this file directly; use ordino_generate_code create/register_page for structural changes
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';


export class LoginPage extends BasePage {
  readonly path = '/login';

  // ── Locators ──────────────────────────────────────────────────────────
  // locator-helper: attr_combo
  private emailInput = this.page.locator('//input[@id="email"]');
  // locator-helper: attr_combo
  private passwordInput = this.page.locator('//input[@id="password"]');
  // locator-helper: attr_combo
  private loginButton = this.page.locator('//button[@id="login"]');
  // locator-helper: attr_combo
  private homeLink = this.page.locator('//a[normalize-space()="Home" and @href="/"]');
  // locator-helper: attr_combo
  private welcomeHeading = this.page.locator('//h3[normalize-space()="Welcome,"]');
  // locator-helper: attr_combo
  private errorAlert = this.page.locator('//*[@role="alert"]');

  // ── Steps ──────────────────────────────────────────────────────────────
  /** Navigates to the login page and waits for it to load. */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
    return this;
  }

  /** Fills credentials and submits the login form. */
  async step_login(email: string, password: string): Promise<this> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitForPageLoad();
    await this.page.waitForURL("**/", { timeout: 15000 });
    return this;
  }

  /**
   * Fills credentials and clicks Login without waiting for a URL change (for error scenarios).
   * @param email - Email address to enter
   * @param password - Password to enter
   * @returns this for chaining
   */
  async step_attemptLogin(email: string, password: string): Promise<this> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    return this;
  }

  /**
   * Fills only the email field, leaving password empty (to trigger the disabled-button guard).
   * @param email - Email address to enter
   * @returns this for chaining
   */
  async step_fillEmailOnly(email: string): Promise<this> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill('');
    return this;
  }

  // ── Verifies ───────────────────────────────────────────────────────────
  /**
   * Verifies the error alert is visible and contains the expected text.
   * @param expectedText - Substring expected in the error alert
   * @returns this for chaining
   */
  async verify_errorAlert(expectedText: string): Promise<this> {
    await this.errorAlert.waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.errorAlert).toContainText(expectedText);
    await expect(this.page).toHaveURL(/\/login/);
    return this;
  }

  /**
   * Verifies the Login button is disabled (e.g. when required fields are empty).
   * @returns this for chaining
   */
  async verify_loginButtonDisabled(): Promise<this> {
    await expect(this.loginButton).toBeDisabled();
    return this;
  }

  /** Verifies the user reached the authenticated home dashboard. */
  async verify_authenticated(): Promise<this> {
    await expect(this.page).not.toHaveURL(/\/login/);
    await this.homeLink.waitFor({ state: 'visible' });
    await expect(this.homeLink).toBeVisible();
    await this.welcomeHeading.waitFor({ state: 'visible' });
    await expect(this.welcomeHeading).toBeVisible();
    return this;
  }
}
