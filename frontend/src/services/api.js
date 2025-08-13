import axios from "axios";

// eslint-disable-next-line no-undef
const API_BASE = process.env.REACT_APP_API_ENDPOINT || "";

console.log({ API_BASE });

export const getProducts = async () => {
  return axios.get(`${API_BASE}/products`);
};

export const purchaseProduct = async (productData) => {
  return axios.post(`${API_BASE}/purchase`, productData);
};

export const checkoutSale = async (productData, discount) => {
  return axios.post(`${API_BASE}/sales/checkout`, { productData, discount });
};
