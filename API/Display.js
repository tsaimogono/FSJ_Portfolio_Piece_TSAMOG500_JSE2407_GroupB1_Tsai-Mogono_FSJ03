// api/products.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://next-ecommerce-api.vercel.app',
});

/**
 * Fetch products with pagination.
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of products to fetch per page.
 * @returns {Promise<Array>} - List of products.
 */
export const getProducts = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit; // Calculate the number of products to skip
  try {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
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
