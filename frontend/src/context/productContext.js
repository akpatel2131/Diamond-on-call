import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import React from "react";
import { getProducts } from "../services/api";
import { useEffectOnce } from "react-use";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState([]);
  const [saleItem, setSaleItem] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [getProducts]);

  // const handlePurchase = async () => {
  //   try {
  //     const res = await purchaseProduct(
  //       purchaseForm.productId,
  //       parseInt(purchaseForm.quantity)
  //     );
  //     if (res.data.success) {
  //       setSuccess("Purchase successful!");
  //       fetchProducts();
  //       setPurchaseForm({ productId: "", quantity: "" });
  //     } else {
  //       setError(res.data.message);
  //     }
  //   } catch {
  //     setError("Purchase failed");
  //   }
  // };

  // const handleSale = async () => {
  //   try {
  //     const res = await checkoutSale(
  //       saleForm.productId,
  //       parseInt(saleForm.quantity),
  //       parseFloat(saleForm.discount)
  //     );
  //     if (res.data.success) {
  //       setSuccess("Sale completed!");
  //       fetchProducts();
  //       setSaleForm({ productId: "", quantity: "", discount: 10 });
  //     } else {
  //       setError(res.data.message);
  //     }
  //   } catch {
  //     setError("Sale failed");
  //   }
  // };

  useEffectOnce(() => {
    fetchProducts();
  });

  const value = useMemo(() => {
    return {
      products,
      fetchProducts,
      loading,
      purchaseItem,
      setPurchaseItem,
      saleItem,
      setSaleItem,
      error,
      success,
    };
  }, [
    products,
    fetchProducts,
    loading,
    purchaseItem,
    saleItem,
    error,
    success,
  ]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
