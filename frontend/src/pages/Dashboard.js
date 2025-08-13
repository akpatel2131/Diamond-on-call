import React, { useCallback } from "react";
import styles from "./dashboard.module.css";
import { useProductContext } from "../context/productContext";

const Dashboard = () => {
  const {
    loading,
    products,
    setPurchaseItem,
    setSaleItem,
    purchaseItem,
    saleItem,
  } = useProductContext();

  const handlePurchaseOrSell = useCallback(
    (product, data, setData) => {
      const isProductAlreadyInPurchase = data.find(
        (item) => item.id === product.id
      );
      if (isProductAlreadyInPurchase) {
        const updatedPurchaseItem = data.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setData(updatedPurchaseItem);
      } else {
        setData((previous) => [...previous, {
          ...product,
          quantity: 1
        }]);
      }
    },
    []
  );

  return (
    <div>
      <h2>Product Dashboard</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
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
                <button
                  className={styles.button}
                  onClick={() => handlePurchaseOrSell(product, purchaseItem, setPurchaseItem)}
                >
                  Purchase
                </button>
                <button
                  className={styles.button}
                  onClick={() => handlePurchaseOrSell(product, saleItem, setSaleItem)}
                >
                  Sale
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
