
Swiftstore
This project is a fully functional e-commerce store built with Next.js. It fetches product data from the Next E-Commerce API and displays products with pagination, product details, and a review system. Users can browse products, view detailed product information, and navigate between different pages of products.

Table of Contents
Features
Technologies Used
Project Setup
File Structure
API Endpoints
Key Components
Error Handling
Pagination
Carousel & Reviews
Contributing
License
Features
Product Listing: Displays a grid of products (20 products per page).
Pagination: Users can navigate between product pages.
Product Details: Each product has a dedicated page showing its description, price, category, rating, stock, and reviews.
Image Carousel: The product details page includes a carousel for viewing product images.
Reviews: Displays user reviews, including the reviewer's name, rating, and comment.
Error Handling: Displays friendly error messages in case of API failures or product not found.
Loading States: Loading indicators are shown while fetching product data.
Technologies Used
Next.js: Server-side rendering and routing.
React: Building the user interface.
Tailwind CSS: Styling the components.
Fetch API: For making requests to the Next E-Commerce API.
ESLint: Code linting and formatting.
JSDoc: For documenting the code.
Project Setup
Prerequisites
Node.js (v14+)
npm or yarn
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/tsaimogono/TSAMOG-500-JSE2407-B1-TSAI-MOGONO-FSJ01.git
cd swiftstore
Install dependencies:

bash
Copy code
npm install
# or
yarn install
Run the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open the app in the browser:

bash
Copy code
http://localhost:3000
File Structure
bash
Copy code
nextjs-ecommerce-store/
├── app/
│   ├── components/
│   │   ├── ErrorBoundary.js        # Error handling component
│   │   ├── Modal.js                # Modal component for product details
│   │   ├── Navbar.js               # Navigation bar
│   │   ├── Pagination.js           # Pagination component
│   │   ├── ProductCard.js          # Individual product card
│   │   ├── ProductGrid.js          # Product grid component
│   ├── page.js                     # Main home page showing product list
├── lib/
│   ├── api.js                      # API functions to fetch products and categories
├── public/                         # Public assets (e.g., favicon)
├── styles/                         # Global styles and Tailwind CSS config
├── .eslintrc.js                    # ESLint configuration
├── README.md                       # This README file
├── package.json                    # Project dependencies and scripts
API Endpoints