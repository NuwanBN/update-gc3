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
    await productPage.step_fillMandatoryDetails({
      name,
      displayName,
      price: expected.defaultPrice,
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(name);
  });

});
