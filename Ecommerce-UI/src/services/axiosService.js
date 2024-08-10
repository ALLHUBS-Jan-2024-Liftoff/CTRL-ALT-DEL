import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL
});

export const getProducts = () => axios.get(`${API_URL}/product`);
export const getProductById = (id) => axios.get(`${API_URL}/product/${id}`);
export const createProduct = (product) => axios.post(`${API_URL}/product/new`, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}/product/${id}`, product);

export const getCategories = () => axios.get(`${API_URL}/productCategory`);
export const createCategory = (category) => axios.post(`${API_URL}/productCategory/new`, category);
export const updateCategory = (id, category) => axios.put(`${API_URL}/productCategory/${id}`, category);

export default axiosInstance;

