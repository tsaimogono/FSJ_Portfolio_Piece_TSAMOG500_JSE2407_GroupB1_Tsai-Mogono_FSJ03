1// api/products.js
2import axios from 'axios';
3
4const api = axios.create({
5  baseURL: 'https://next-ecommerce-api.vercel.app',
6});
7
8export const getProducts = async (page = 1, limit = 20) => {
9  try {
10    const response = await api.get(`/products?_page=${page}&_limit=${limit}`);
11    return response.data;
12  } catch (error) {
13    console.error(error);
14    return [];
15  }
16};
17
18export const getProduct = async (id) => {
19  try {
20    const response = await api.get(`/products/${id}`);
21    return response.data;
22  } catch (error) {
23    console.error(error);
24    return null;
25  }
26};