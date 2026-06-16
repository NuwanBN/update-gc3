// spec: .ordino/stories/product.story.md
import { test } from '@config/page.config';
import { productExpected as expected } from '@config/page-loader';

test.describe('product', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
  });

  // scenario: Happy Path
  test('[AC-1] should create a product with mandatory details', async ({ productPage }) => {
    const ts = Date.now();
    const name = `Auto Product ${ts}`;
    const displayName = `Auto Display ${ts}`;

    await productPage.step_navigate();
    await productPage.step_openCreateForm();
    await productPage.step_fillProductDetails({
      name,
      displayName,
      price: expected.defaultPrice,
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(name);
  });

  // scenario: Extended Overview
  test('[AC-2] should create a product with description and external ID', async ({ productPage }) => {
    const ts = Date.now();
    const name = `Auto Extended Product ${ts}`;
    const displayName = `Auto Extended Display ${ts}`;

    await productPage.step_navigate();
    await productPage.step_openCreateForm();
    await productPage.step_fillProductDetails({
      name,
      displayName,
      price: expected.extendedPrice,
      description: `${expected.descriptionPrefix} ${ts}`,
      externalId: `${expected.externalIdPrefix}-${ts}`,
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(name);
  });

  // scenario: Nutritional Info
  test('[AC-3] should create a product with calories filled', async ({ productPage }) => {
    const ts = Date.now();
    const name = `Auto Nutrition Product ${ts}`;
    const displayName = `Auto Nutrition Display ${ts}`;

    await productPage.step_navigate();
    await productPage.step_openCreateForm();
    await productPage.step_fillProductDetails({
      name,
      displayName,
      price: expected.defaultPrice,
      calories: expected.defaultCalories,
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(name);
  });

  // scenario: Inactive Status
  test('[AC-4] should create a product with status set to inactive', async ({ productPage }) => {
    const ts = Date.now();
    const name = `Auto Inactive Product ${ts}`;
    const displayName = `Auto Inactive Display ${ts}`;

    await productPage.step_navigate();
    await productPage.step_openCreateForm();
    await productPage.step_fillProductDetails({
      name,
      displayName,
      price: expected.defaultPrice,
      statusActive: false,
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(name);
  });

  // scenario: Price Excludes Tax
  test('[AC-5] should create a product with Price Excludes Tax selected', async ({ productPage }) => {
    const ts = Date.now();
    const name = `Auto ExTax Product ${ts}`;
    const displayName = `Auto ExTax Display ${ts}`;

    await productPage.step_navigate();
    await productPage.step_openCreateForm();
    await productPage.step_fillProductDetails({
      name,
      displayName,
      price: expected.defaultPrice,
      priceExcludesTax: true,
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(name);
  });

});
