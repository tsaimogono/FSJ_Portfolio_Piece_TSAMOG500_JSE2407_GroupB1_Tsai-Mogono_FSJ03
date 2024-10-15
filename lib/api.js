const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch products with pagination, sorting, and filtering by category.
 * @param {Object} options - The options for fetching products.
 * @param {number} [options.page=1] - The page number for pagination.
 * @param {number} [options.pageSize=20] - The number of products to fetch per page.
 * @param {string} [options.sortBy='price'] - The field to sort by.
 * @param {string} [options.order='asc'] - Sorting order ('asc' or 'desc').
 * @param {string} [options.category=''] - Product category filter.
 * @param {string} [options.search=''] - Search query for product title.
 * @returns {Promise<Object>} - Object containing products and pagination info.
 */
export const getProducts = async ({
  page = 1,
  pageSize = 20,
  sortBy = 'price',
  order = 'asc',
  category,
  search,
}) => {
  const url = new URL(`${BASE_URL}/api/products`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('pageLimit', pageSize.toString());
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('order', order);
  if (category) url.searchParams.append('category', category);
  if (search) url.searchParams.append('search', search);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return {
      products: data.products,
      currentPage: page,
      totalPages: Math.ceil(data.total / pageSize),
      totalProducts: data.total,
      pageSize: pageSize
    };
  } catch (error) {
    console.error(error);
    return {
      products: [],
      currentPage: 1,
      totalPages: 0,
      totalProducts: 0,
      pageSize: pageSize
    };
  }
};


/**
 * Fetch a single product by ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} - The product details.
 */
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetch categories from the API.
 * @returns {Promise<Array>} - List of product categories.
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};