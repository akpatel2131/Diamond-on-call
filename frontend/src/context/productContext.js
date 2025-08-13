import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import React from "react";
import { getProducts, purchaseProduct, checkoutSale } from "../services/api";
import { useAsyncFn, useAsyncRetry, useEffectOnce } from "react-use";
import { toast } from "react-toastify";

const AUTO_CLOSE_TIME = 5000;
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [purchaseItem, setPurchaseItem] = useState([]);
  const [saleItem, setSaleItem] = useState([]);
  const [checkoutModalMeesage, setCheckoutModalMeesage] = useState("");

  const {
    loading: productListLoading,
    retry: fetchProducts,
    value: products,
  } = useAsyncRetry(async () => {
    try {
      const data = await getProducts();
      return data.data.data;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: AUTO_CLOSE_TIME,
      });
    }
  }, [getProducts]);

  const [{ loading: purchaseLoading }, handlePurchase] =
    useAsyncFn(async () => {
      try {
        const res = await purchaseProduct(purchaseItem);
        if (res.data.success) {
          await fetchProducts();
          setPurchaseItem([]);
          setCheckoutModalMeesage(
            `Product purchased successfully! Please check your email for the receipt.`
          );
        } else {
          toast.error(res.data.message, {
            autoClose: AUTO_CLOSE_TIME,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    }, [purchaseItem, fetchProducts]);

  const [{ loading: saleLoading }, handleSale] = useAsyncFn(
    async (discount) => {
      try {
        const res = await checkoutSale(saleItem, discount);
        if (res.data.success) {
          await fetchProducts();
          setSaleItem([]);
          setCheckoutModalMeesage(
            `Product sold successfully! Please check your email for the receipt.`
          );
        } else {
          toast.error(res.data.message, {
            autoClose: AUTO_CLOSE_TIME,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    },
    [saleItem, fetchProducts]
  );

  const value = useMemo(() => {
    return {
      products,
      productListLoading,
      purchaseItem,
      setPurchaseItem,
      saleItem,
      setSaleItem,
      handlePurchase,
      purchaseLoading,
      handleSale,
      saleLoading,
      checkoutModalMeesage,
      setCheckoutModalMeesage,
    };
  }, [
    products,
    productListLoading,
    purchaseItem,
    saleItem,
    handlePurchase,
    purchaseLoading,
    handleSale,
    saleLoading,
    checkoutModalMeesage,
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
