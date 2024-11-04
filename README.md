
# Product Catalog App

## Description
This project is a simple Product Catalog app built using Angular 18.2.11. It allows users to view a list of products, filter by category, view product details, and add products to a shopping cart.

## Features
- Display a list of products fetched from FakeStoreAPI.
- Filter products by category.
- View detailed information about each product.
- Add products to a shopping cart with visual feedback.
- Responsive design for various screen sizes.

## Design Decisions
- **Component-Based Structure**: The app is split into different components, such as ProductListComponent and ProductDetailComponent, to ensure modularity and reusability.
- **Service Layer for API Interaction**: ProductService is used to handle HTTP requests and separate API logic from components.
- **Sass for Styling**: Used Sass (SCSS) for styling, with the styles split between components for better organization.
- **Reactive Forms and ngModel**: Added filtering functionality with ngModel and reactive streams using RxJS.
- **Standalone Components**: Originally attempted but reverted for modularity and compatibility with NgModules.

## Prerequisites
- Node.js (v14 or above)
- Angular CLI

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository-url>
cd product-catalog-app
```

Install the dependencies:

```bash
npm install
```

## Running the Application

To start the development server, run:

```bash
ng serve
```

The app will be available at `http://localhost:4200`.

## Building the Application

To build the project for production:

```bash
ng build
```

## Testing the Application

To test the project for production:

```bash
ng test
```

The output files will be in the `dist/` directory.

## Folder Structure

```
src
├── app
│   ├── components
│   │   ├── product-list
│   │   └── product-detail
│   ├── models
│   ├── services
│   └── app.module.ts
├── assets
└── environments
```

## Additional Notes

### Sass Integration
Converted CSS files to SCSS for enhanced styling features. If needed, modify styles in `.scss` files within each component.

### Handling Errors
Common issues such as routing errors or HTTP client injection errors were addressed by configuring `RouterModule` and `HttpClientModule` properly within `app.module.ts`.

### Adding to Cart
A shopping cart icon appears when a product is added to the cart. The functionality is managed within the ProductDetailComponent, providing feedback upon adding items.

