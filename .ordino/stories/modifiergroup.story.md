---
feature: modifiergroup
status: approved
version: 1
generated: 2026-06-16
last_updated: 2026-06-16
layer: ui
source:
  - user
---

# Intent

Verifies that an authenticated user can create modifier groups under Menu Management GC3, covering both the Product Modifier Group and Text Modifier Group types with mandatory and optional fields.

# Acceptance Criteria

- [ ] AC-1: User can create a Product Modifier Group with mandatory name and display name
- [ ] AC-2: User can create a Text Modifier Group with mandatory name and display name
- [ ] AC-3: User can create a Product Modifier Group with description and external ID filled
- [ ] AC-4: User can create a Product Modifier Group with a product added as a modifier

# Scenarios

## Product Modifier Group – Happy Path [AC-1]

- User is logged in
- User navigates to Menu Management GC3 → Modifier Groups
- User clicks Create New and selects "Product Modifier Group"
- User fills Modifier Group Name and Modifier Group Display Name
- User submits the form
- A success message appears and the new modifier group is listed

## Text Modifier Group – Happy Path [AC-2]

- User is logged in
- User navigates to Menu Management GC3 → Modifier Groups
- User clicks Create New and selects "Text Modifier Group"
- User fills Modifier Group Name and Modifier Group Display Name
- User clicks "Create Modifier" and fills a text modifier name, then saves
- User submits the form
- A success message appears and the new modifier group is listed

## Product Modifier Group – Extended Overview [AC-3]

- User is logged in and opens the create Product Modifier Group form
- User fills mandatory fields plus Description and External ID
- User submits the form and the modifier group is created successfully

## Product Modifier Group – With Product Modifier [AC-4]

- User is logged in and has an existing product in the system
- User creates a new Product Modifier Group with mandatory name and display name
- User clicks "Add Modifier" and searches for the product by name
- User selects the product via its row checkbox and clicks "Add Modifiers" to confirm
- User submits the form
- A success message appears and the new modifier group is listed
- Cleanup: the modifier group and the product are deleted after the test

# Out of Scope

- Adding modifiers to the group (requires existing products)
- Ranging configuration (no brand/location options in test env)
- Tags and custom fields
- Min/max choices configuration
- Edit or duplicate modifier group

# Change Log

- 2026-06-16: created for modifier group automation (user request)
- 2026-06-16: added AC-4 Product MG with product as modifier
