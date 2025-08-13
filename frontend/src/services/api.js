import axios from 'axios';

const API_BASE = 'http://localhost:5001/api';

export const getProducts = async () => {
  return axios.get(`${API_BASE}/products`);
};

export const purchaseProduct = async (productId, quantity) => {
  return axios.post(`${API_BASE}/purchase`, { productId, quantity });
};

export const checkoutSale = async (productId, quantity, discount) => {
  return axios.post(`${API_BASE}/sales/checkout`, { productId, quantity, discount });
};
