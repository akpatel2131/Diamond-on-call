import axios from "axios";

// eslint-disable-next-line no-undef
const API_BASE = process.env.REACT_APP_API_ENDPOINT || "";

export const getProducts = async () => {
  return axios.get(`${API_BASE}/products`);
};

export const purchaseProduct = async (productData) => {
  return axios.post(`${API_BASE}/purchase`, productData);
};

export const checkoutSale = async (productData, discount) => {
  return axios.post(`${API_BASE}/sales/checkout`, { productData, discount });
};

export const addPurchaseProduct = async (productData) => {
  return axios.post(`${API_BASE}/cart/purchase`, productData);
};

export const addSellProduct = async (productData) => {
  return axios.post(`${API_BASE}/cart/sell`, productData);
};

export const getCartItems = async (type, discount = 0) => {
  return axios.get(`${API_BASE}/cart?type=${type}&discount=${discount}`);
};

export const deleteCartItem = async (productId, type) => {
  return axios.delete(`${API_BASE}/cart/${productId}?type=${type}`);
};
