// spec: .ordino/stories/modifiergroup.story.md
import { test } from '@config/page.config';
import { modifiergroupExpected as expected } from '@config/page-loader';

test.describe('modifiergroup', () => {

  let createdModifierGroupName = '';

  test.beforeEach(async ({ loginPage }) => {
    createdModifierGroupName = '';
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
  });

  test.afterEach(async ({ modifierGroupPage }) => {
    if (createdModifierGroupName) {
      await modifierGroupPage.step_navigate();
      await modifierGroupPage.step_delete(createdModifierGroupName);
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

});
