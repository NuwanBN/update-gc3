// spec: .ordino/stories/modifiergroup.story.md
import { test } from '@config/page.config';
import { modifiergroupExpected as expected } from '@config/page-loader';

test.describe('modifiergroup', () => {

  let createdModifierGroupName = '';
  let createdProductName = '';

  test.beforeEach(async ({ loginPage }) => {
    createdModifierGroupName = '';
    createdProductName = '';
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
  });

  test.afterEach(async ({ modifierGroupPage, productPage }) => {
    if (createdModifierGroupName) {
      await modifierGroupPage.step_navigate();
      await modifierGroupPage.step_delete(createdModifierGroupName);
    }
    if (createdProductName) {
      await productPage.step_navigate();
      await productPage.step_deleteProduct(createdProductName);
    }
  });

  // scenario: Product Modifier Group – Happy Path
  test('[AC-1] should create a Product Modifier Group with mandatory details', async ({ modifierGroupPage }) => {
    const ts = Date.now();
    const name = `Auto PMG ${ts}`;
    const displayName = `Auto PMG Display ${ts}`;

    await modifierGroupPage.step_navigate();
    await modifierGroupPage.step_openCreateForm('product');
    await modifierGroupPage.step_fillDetails({ name, displayName });
    await modifierGroupPage.step_submit();
    await modifierGroupPage.verify_created(name);
    createdModifierGroupName = name;
  });

  // scenario: Text Modifier Group – Happy Path
  test('[AC-2] should create a Text Modifier Group with mandatory details', async ({ modifierGroupPage }) => {
    const ts = Date.now();
    const name = `Auto TMG ${ts}`;
    const displayName = `Auto TMG Display ${ts}`;

    await modifierGroupPage.step_navigate();
    await modifierGroupPage.step_openCreateForm('text');
    await modifierGroupPage.step_fillDetails({ name, displayName });
    await modifierGroupPage.step_addTextModifier(expected.defaultTextModifierName);
    await modifierGroupPage.step_submit();
    await modifierGroupPage.verify_created(name);
    createdModifierGroupName = name;
  });

  // scenario: Product Modifier Group – Extended Overview
  test('[AC-3] should create a Product Modifier Group with description and external ID', async ({ modifierGroupPage }) => {
    const ts = Date.now();
    const name = `Auto PMG Ext ${ts}`;
    const displayName = `Auto PMG Ext Display ${ts}`;

    await modifierGroupPage.step_navigate();
    await modifierGroupPage.step_openCreateForm('product');
    await modifierGroupPage.step_fillDetails({
      name,
      displayName,
      description: `${expected.descriptionPrefix} ${ts}`,
      externalId: `${expected.externalIdPrefix}-${ts}`,
    });
    await modifierGroupPage.step_submit();
    await modifierGroupPage.verify_created(name);
    createdModifierGroupName = name;
  });

  // scenario: Product Modifier Group – With Product Modifier
  test('[AC-4] should create a Product Modifier Group with a product added as a modifier', async ({ productPage, modifierGroupPage }) => {
    const ts = Date.now();
    const productName = `Auto Mod Prod ${ts}`;
    const mgName = `Auto PMG With Prod ${ts}`;
    const mgDisplayName = `Auto PMG With Prod Display ${ts}`;

    // Create the product first
    await productPage.step_navigate();
    await productPage.step_openCreateForm();
    await productPage.step_fillProductDetails({
      name: productName,
      displayName: `${productName} Display`,
      price: '10',
    });
    await productPage.step_submitProduct();
    await productPage.verify_productCreated(productName);
    createdProductName = productName;

    // Create the modifier group and add the product as a modifier
    await modifierGroupPage.step_navigate();
    await modifierGroupPage.step_openCreateForm('product');
    await modifierGroupPage.step_fillDetails({ name: mgName, displayName: mgDisplayName });
    await modifierGroupPage.step_addProductModifier(productName);
    await modifierGroupPage.step_submit();
    await modifierGroupPage.verify_created(mgName);
    createdModifierGroupName = mgName;
  });

});
