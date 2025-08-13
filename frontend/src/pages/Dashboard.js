import React from "react";
import styles from "./dashboard.module.css";
import { useProductContext } from "../context/productContext";

const Dashboard = () => {
  const {loading, products} = useProductContext();
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
                <button className={styles.button}>Purchase</button>
                <button className={styles.button}>Sale</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
