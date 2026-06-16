---
feature: login
status: approved
version: 1
generated: 2026-06-16
last_updated: 2026-06-16
layer: ui
source:
  - user
---

# Intent

Verifies that a user can sign in to GrubCENTER with valid credentials and reach the authenticated application, and that invalid attempts are handled correctly.

# Acceptance Criteria

- [ ] AC-1: User can log in with valid email and password and leave the login page
- [ ] AC-2: User sees an error message when submitting wrong credentials
- [ ] AC-3: Login button is disabled when required fields are empty

# Scenarios

## Happy Path [AC-1]

- User opens the login page at `/login`
- User enters a valid email address and password
- User clicks Login
- User is redirected away from the login page into the authenticated application

## Wrong Credentials [AC-2]

- User opens the login page at `/login`
- User enters a valid email address and a wrong password
- User clicks Login
- An error alert appears with the text "Incorrect username or password."
- URL remains at `/login`

## Empty Fields [AC-3]

- User opens the login page at `/login`
- User leaves the email field empty and enters any password (or vice versa)
- The Login button is disabled — the form cannot be submitted

# Out of Scope

- Forgot password flow
- Multi-factor authentication

# Change Log

- 2026-06-16: created for login automation (user request)
