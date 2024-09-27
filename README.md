### Next.js E-Commerce Product Catalog
### Overview
This project is a Next.js-based e-commerce product catalog application. It features a responsive product grid, detailed product pages, search functionality, category filtering, and sorting options. The application integrates with a mock API to fetch and display product data.
Table of Contents

## Features
Getting Started

## Prerequisites
Installation


### Project Structure
Key Components
API Integration
Styling
Error Handling
Future Enhancements
Contributing
License

## Features

Responsive product grid layout
Detailed product pages with image carousel
Search functionality for products
Category-based filtering
Sorting options (price, rating, etc.)
Pagination for product list
Error boundary for graceful error handling

Getting Started
Prerequisites

Node.js (v14 or later)
npm or yarn

## Installation

Clone the repository:
Copygit clone https://github.com/tsaimogono/TSAMOG500-JSE2407-B1-TSAI-MOGONO-FSJ02.git

Navigate to the project directory:
Copycd nextjs-ecommerce-catalog

Install dependencies:
Copynpm install
or
Copyyarn install

Run the development server:
Copynpm run dev
or
Copyyarn dev

Open http://localhost:3000 in your browser to view the application.

Project Structure
Copy.
├── app/
│   ├── components/
│   │   ├── ErrorBoundary.js
│   │   ├── Modal.js
│   │   ├── Navbar.js
│   │   ├── Pagination.js
│   │   ├── ProductCard.js
│   │   └── ProductGrid.js
│   ├── lib/
│   │   └── api.js
│   ├── product/
│   │   └── [id]/
│   │       └── page.js
│   ├── layout.js
│   └── page.js
├── public/
├── styles/
│   └── globals.css
├── .gitignore
├── next.config.js
├── package.json
└── README.md

## Key Components

ProductGrid: Main component for displaying the product list with filtering and sorting options.
ProductCard: Reusable component for individual product display in the grid.
Pagination: Component for handling page navigation in the product list.
ErrorBoundary: Catches and displays errors gracefully.
Modal: Reusable modal component (currently unused, but available for future features).

## Styling
The project uses Tailwind CSS for styling, providing a responsive and customizable design. Global styles are defined in styles/globals.css.
Error Handling
The application includes an ErrorBoundary component to catch and display errors gracefully, preventing the entire app from crashing due to component-level errors.
Future Enhancements

## Implement user authentication and authorization
Add a shopping cart functionality
Integrate with a real payment gateway
Implement product reviews and ratings system
Add more advanced filtering options
Optimize images and implement lazy loading for better performance

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
License
This project is licensed under the MIT License.