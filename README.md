# E-Commerce Product Listing Application

A modern e-commerce product listing and detail page application built with React, React Router, and Tailwind CSS. This application fetches product data from the DummyJSON API and provides a complete shopping experience with filtering, search, and product details.

## Features

### Product Listing Page
- **Dynamic Product Grid**: Displays products in a responsive grid layout
- **Advanced Filtering**:
  - Category filter (dynamically fetched from API)
  - Price range filter (min/max inputs)
  - Brand filter (multi-select checkboxes)
  - Search functionality (searches by title, description, and brand)
- **Pagination**: Client-side pagination with customizable page size
- **Loading States**: Spinner animations while data is being fetched
- **Error Handling**: User-friendly error messages with retry functionality

### Product Detail Page
- **Product Information**: Displays complete product details including:
  - High-quality product images
  - Product title and description
  - Price and rating with star visualization
  - Brand and category information
  - Stock availability
- **Customer Reviews**: Shows product reviews with ratings and comments
- **Image Gallery**: Additional product images when available
- **Navigation**: Back button to return to the listing page
- **Call-to-Action**: Add to Cart and Buy Now buttons

### Technical Features
- **React Router**: Client-side routing between listing and detail pages
- **Context API**: Global state management for filters
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **API Integration**: Fetches data from DummyJSON public API
- **Filter Persistence**: Filters remain applied when navigating back from detail page

## Tech Stack

- **React 19**: UI library with functional components and hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **DummyJSON API**: Public API for product data

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation header with search
│   ├── Filters.jsx         # Sidebar with category, price, and brand filters
│   ├── ProductCard.jsx     # Individual product card component
│   └── Pagination.jsx      # Pagination controls
├── context/
│   └── FilterContext.jsx   # Global filter state management
├── pages/
│   ├── ProductListingPage.jsx  # Main product listing page
│   └── ProductDetailPage.jsx   # Product detail view
├── services/
│   └── api.js              # API service layer for DummyJSON
├── App.jsx                 # Main app with routing
├── main.jsx                # React entry point
└── index.css               # Global styles with Tailwind directives
```

## API Usage

The application uses the DummyJSON public API:

- **Products**: `https://dummyjson.com/products`
- **Categories**: `https://dummyjson.com/products/categories`
- **Product by ID**: `https://dummyjson.com/products/{id}`
- **Category Products**: `https://dummyjson.com/products/category/{category}`

## Assumptions Made

1. **Client-side Filtering**: All filtering is performed on the client side after fetching products. This is suitable for the dataset size (100 products) but would need server-side filtering for larger datasets.

2. **Pagination**: Pagination is implemented on the client side. For production with large datasets, API-based pagination would be more efficient.

3. **Brand Extraction**: Brands are extracted from the fetched products rather than having a dedicated brands endpoint.

4. **No Authentication**: The application does not include user authentication or shopping cart functionality, as these were not specified in the requirements.

5. **Image Availability**: The application assumes all products have thumbnail images available from the API.

## Architectural Decisions

1. **Context API for Filters**: Chosen over Redux for simplicity, as the filter state is the only global state needed.

2. **Component Separation**: Each UI element (Header, Filters, ProductCard, Pagination) is a separate component for reusability and maintainability.

3. **Service Layer**: API calls are centralized in a dedicated service file for easy maintenance and testing.

4. **Functional Components**: Used throughout with React hooks for state management and side effects.

5. **Tailwind CSS**: Chosen for rapid development and consistent styling without writing custom CSS.

6. **React Router**: Provides clean URL-based navigation and browser history management.

## Potential Improvements

If given more time, the following improvements could be implemented:

1. **Server-side Filtering**: Move filtering logic to the API for better performance with large datasets.

2. **Shopping Cart**: Add cart functionality with local storage persistence.

3. **User Authentication**: Implement user login/registration for personalized experiences.

4. **Wishlist Feature**: Allow users to save products to a wishlist.

5. **Advanced Search**: Add search suggestions, autocomplete, and filters within search.

6. **Product Comparison**: Enable users to compare multiple products side-by-side.

7. **Sorting Options**: Add sorting by price, rating, and popularity.

8. **Lazy Loading**: Implement image lazy loading for better performance.

9. **Error Boundaries**: Add React error boundaries for better error handling.

10. **Unit Tests**: Add Jest and React Testing Library for component testing.

11. **TypeScript**: Migrate to TypeScript for better type safety.

12. **SEO Optimization**: Add meta tags and server-side rendering for better SEO.

13. **Analytics**: Integrate analytics for user behavior tracking.

14. **Accessibility**: Improve WCAG compliance with ARIA labels and keyboard navigation.

15. **Performance Optimization**: Implement code splitting and memoization where appropriate.

## License

This project is created for assessment purposes and uses the DummyJSON public API.
