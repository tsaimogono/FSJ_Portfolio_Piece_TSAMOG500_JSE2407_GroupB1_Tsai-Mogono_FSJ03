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
npm 

## Installation

Clone the repository:
Copygit clone https://github.com/tsaimogono/FSJ_Portfolio_Piece_TSAMOG500_JSE2407_GroupB1_Tsai-Mogono_FSJ03.git

Navigate to the project directory:
Copycd nextjs-ecommerce-catalog

Run the development server:
Copynpm run dev

Open http://localhost:3000 in your browser to view the application.


bash
Copy code
Install dependencies:

bash
Copy code
npm install
Configure Firebase:



Create a .env.local file with your Firebase credentials:

bash
Copy codeNEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDZ3c4r9uCBda6_L31BCKHXrh3thy0q3hE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=final-portfolio-data.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=final-portfolio-data
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=final-portfolio-data.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=783527241974
NEXT_PUBLIC_FIREBASE_APP_ID=1:783527241974:web:30018d6445e02705d064d7
NEXT_PUBLIC_API_URL=http://localhost:3000

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




