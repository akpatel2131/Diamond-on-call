import React, { useCallback } from "react";
import styles from "./dashboard.module.css";
import { useProductContext } from "../../context/productContext";
import Button from "../../uiComponents/Button/Button";

const Dashboard = () => {
  const {
    productListLoading,
    products,
    setPurchaseItem,
    setSaleItem,
    purchaseItem,
    saleItem,
  } = useProductContext();

  const handlePurchaseOrSell = useCallback((product, data, setData) => {
    const isProductExist = data.find((item) => item.id === product.id);
    if (isProductExist) {
      const updatedPurchaseItem = data.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setData(updatedPurchaseItem);
    } else {
      setData((previous) => [
        ...previous,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }, []);

  const handleSellClick = useCallback((product) => { 
    const quantity = saleItem.find((item) => item.id === product.id)?.quantity;
    if(quantity === product.stock){
      return;
    }
    handlePurchaseOrSell(product, saleItem, setSaleItem);
  },[saleItem])

  return (
    <div>
      {productListLoading ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productGrid}>
          {products?.length > 0 && products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.priceContainer}>
                <div className={styles.price}>
                  <span className={styles.label}>Price: </span>
                  <span className={styles.value}>${product.price}</span>
                </div>
                <div className={styles.stock}>
                  <span className={styles.label}>Stock: </span>
                  <span className={styles.value}>{product.stock} Units</span>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  onClick={() => {
                    handlePurchaseOrSell(product, purchaseItem, setPurchaseItem);
                  }}
                  variant="outlined"
                >
                  Buy
                </Button>
                <Button
                  onClick={() => {
                    handleSellClick(product)
                  }}
                  disabled={product.stock === 0}
                >
                  Sell
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
