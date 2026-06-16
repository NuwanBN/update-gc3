// spec: .ordino/stories/login.story.md
import { test } from '@config/page.config';

test.describe('login', () => {


  // scenario: Happy Path
  test('[AC-1] should log in with valid credentials and reach home', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
    await loginPage.verify_authenticated();
  });

  // scenario: Wrong Credentials
  test('[AC-2] should show error when wrong credentials are submitted', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_attemptLogin(process.env.LOGIN_EMAIL!, 'WrongPass123!');
    await loginPage.verify_errorAlert('Incorrect username or password.');
  });

  // scenario: Empty Fields
  test('[AC-3] should disable Login button when password field is empty', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_fillEmailOnly(process.env.LOGIN_EMAIL!);
    await loginPage.verify_loginButtonDisabled();
  });

});
