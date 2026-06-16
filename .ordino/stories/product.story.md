---
feature: product
status: approved
version: 1
generated: 2026-06-16
last_updated: 2026-06-16
layer: ui
source:
  - user
---

# Intent

Verifies that an authenticated user can create a new product under Menu Management GC3 with mandatory and optional fields.

# Acceptance Criteria

- [ ] AC-1: User can create a product with mandatory name, display name, and price
- [ ] AC-2: User can create a product with description and external ID filled
- [ ] AC-3: User can create a product with nutritional calories filled
- [ ] AC-4: User can create a product with status set to inactive
- [ ] AC-5: User can create a product with Price Excludes Tax selected
- [ ] AC-6: User can create a product with a nutritional classification selected
- [ ] AC-7: User can create a product with an allergen selected
- [ ] AC-8: User can create a product with a tag selected

# Scenarios

## Happy Path [AC-1]

- User is logged in
- User navigates to Menu Management GC3 → Products
- User opens the Create New product form
- User fills Product Name, Product Display Name, and Price
- User submits the form
- A success message appears and the new product is listed

## Extended Overview [AC-2]

- User is logged in and opens the create product form
- User fills mandatory fields plus Product Description and External ID
- User submits and the product is created successfully

## Nutritional Info [AC-3]

- User is logged in and opens the create product form
- User fills mandatory fields and navigates to Nutritional Info to enter Calories
- User submits and the product is created successfully

## Inactive Status [AC-4]

- User is logged in and opens the create product form
- User fills mandatory fields and toggles the status switch to inactive
- User submits the form
- The product is created successfully and appears in the list

## Price Excludes Tax [AC-5]

- User is logged in and opens the create product form
- User fills mandatory fields and selects "Price Excludes Tax" radio option
- User submits the form
- The product is created successfully and appears in the list

## Nutritional Classification [AC-6]

- User is logged in and opens the create product form
- User fills mandatory fields and opens the Classifications dropdown in Nutritional Info
- User selects "Gluten Free" from the list
- User submits the form and the product is created successfully

## Allergen [AC-7]

- User is logged in and opens the create product form
- User fills mandatory fields and opens the Allergens dropdown in Nutritional Info
- User selects "Celery" from the list
- User submits the form and the product is created successfully

## Tag [AC-8]

- User is logged in and opens the create product form
- User fills mandatory fields and opens the Tags dropdown
- User selects a tag from the list
- User submits the form and the product is created successfully

# Out of Scope

- Category selection (dropdown options unavailable in test env)
- Modifier groups, tags, custom fields
- Image upload
- Edit or delete product

# Change Log

- 2026-06-16: created for product creation automation (user request)
- 2026-06-16: added AC-2 extended overview and AC-3 nutritional info coverage
- 2026-06-16: added AC-4 inactive status and AC-5 Price Excludes Tax coverage
- 2026-06-16: added AC-6 classification, AC-7 allergen, AC-8 tag coverage
