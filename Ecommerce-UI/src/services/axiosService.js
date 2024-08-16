import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const getProducts = () => axios.get(`${API_URL}/product`);
export const getProductById = (id) => axios.put(`${API_URL}/product/${id}`);
export const createProduct = (product) => axios.post(`${API_URL}/product/new`, product);
export const updateProduct = (product) => axios.post(`${API_URL}/product/update`, product);
export const getCategories = () => axios.get(`${API_URL}/productCategory`);
export const getCategoryById = (id) => axios.put(`${API_URL}/productCategory/${id}`);
export const createCategory = (category) => axios.post(`${API_URL}/productCategory/new`, category);
export const updateCategory = (category) => axios.post(`${API_URL}/productCategory/update`, category);
export const deleteProduct = (id) => {
        console.log("Product Id "+id);
        try{
            axios.delete(`${API_URL}/product/delete`,{params : {productId : id }});
        } catch(error){
            console.log(error);
        }
};
export const searchProducts = (searchTerm) => axios.get(`${API_URL}/product/search?name=${searchTerm}`);


export default axiosInstance;