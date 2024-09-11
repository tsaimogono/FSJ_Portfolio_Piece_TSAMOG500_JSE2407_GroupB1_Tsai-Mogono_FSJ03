// api/products.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://next-ecommerce-api.vercel.app',
});

/**
 * Fetch products with pagination, sorting, and filtering by category.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @param {string} sort - Sorting order ('price_asc' or 'price_desc').
 * @param {string} category - Product category filter.
 * @returns {Promise<Array>} - List of products.
 */
export const getProducts = async (page = 1, limit = 20, sort = '', category = '') => {
  const skip = (page - 1) * limit;
  try {
    const response = await api.get(`/products`, {
      params: {
        limit,
        skip,
        sort,
        category,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Fetch a single product by ID.
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} - The product details.
 */
export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
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
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
