const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch products with pagination, sorting, and filtering by category.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @param {string} sort - Sorting order ('price_asc' or 'price_desc').
 * @param {string} category - Product category filter.
 * @param {string} searchQuery - Search query for product title.
 * @returns {Promise<Array>} - List of products.
 */
export const getProducts = async ({
  page = 1,
  pageSize = 20,
  sortBy = 'id',
  order = 'asc',
  category = '',
  search = ''
}) => {
  const url = `${BASE_URL}/api/products?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&order=${order}&category=${category}&search=${search}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return {
      products: data.products,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalProducts: data.totalProducts,
      pageSize: data.pageSize
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
