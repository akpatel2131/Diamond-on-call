import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import React from "react";
import {
  getProducts,
  purchaseProduct,
  checkoutSale,
  addSellProduct,
  getCartItems,
  addPurchaseProduct,
  deleteCartItem,
} from "../services/api";
import { useAsyncFn, useAsyncRetry, useEffectOnce } from "react-use";
import { toast } from "react-toastify";

const AUTO_CLOSE_TIME = 5000;
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [purchaseItem, setPurchaseItem] = useState({});
  const [saleItem, setSaleItem] = useState({});
  const [checkoutModalMeesage, setCheckoutModalMeesage] = useState("");
  const [discount, setDiscount] = useState(0);

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
        await purchaseProduct(purchaseItem.products);
        await fetchProducts();
        setPurchaseItem([]);
        setCheckoutModalMeesage(
          `Product purchased successfully! Please check your email for the receipt.`
        );
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    }, [purchaseItem, fetchProducts]);

  const [{ loading: saleLoading }, handleSale] = useAsyncFn(
    async (discount) => {
      try {
        await checkoutSale(saleItem.products, discount);
        await fetchProducts();
        setSaleItem([]);
        setCheckoutModalMeesage(
          `Product sold successfully! Please check your email for the receipt.`
          );
      } catch (error) {
        toast.error(error.response.data.message, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    },
    [saleItem, fetchProducts]
  );

  const [{ loading: cartLoading }, fetchCart] = useAsyncFn(
    async (type, discountpercent = 0) => {
      try {
        const data = await getCartItems(type, discountpercent);
        if (type === "purchase") {
          setPurchaseItem(data.data.data);
        } else {
          setSaleItem(data.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    },
    []
  );

  const [{ loading: sellCartLoading }, handleSellCart] = useAsyncFn(
    async (products) => {
      try {
        await addSellProduct(products);
        await fetchCart("sell", discount);
        toast.success("Product added to sell cart successfully", {
          autoClose: AUTO_CLOSE_TIME,
        });
        return;
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    },
    [fetchCart, discount]
  );

  const [{ loading: purchaseCartLoading }, handlePurchaseCart] = useAsyncFn(
    async (products) => {
      try {
        await addPurchaseProduct(products);
        await fetchCart("purchase", null);
        toast.success("Product added to purchase cart successfully", {
          autoClose: AUTO_CLOSE_TIME,
        });
        return;
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    },
    [fetchCart]
  );

  const [{ loading: deleteCartLoading }, handleDeleteCart] = useAsyncFn(
    async (type, productId) => {
      try {
        await deleteCartItem(productId, type);
        await fetchCart(type, null);
        toast.success("Product deleted successfully", {
          autoClose: AUTO_CLOSE_TIME,
        });
        return;
      } catch (error) {
        toast.error(error.response.data.error, {
          autoClose: AUTO_CLOSE_TIME,
        });
      }
    },
    [fetchCart]
  );


  useEffectOnce(() => {
    fetchCart("purchase", null);
    fetchCart("sell", null);
  });

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
      handlePurchaseCart,
      handleSellCart,
      cartLoading,
      sellCartLoading,
      purchaseCartLoading,
      discount,
      setDiscount,
      fetchCart,
      handleDeleteCart,
      deleteCartLoading
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
    handlePurchaseCart,
    handleSellCart,
    cartLoading,
    sellCartLoading,
    purchaseCartLoading,
    discount,
    setDiscount,
    fetchCart,
    handleDeleteCart,
    deleteCartLoading
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
