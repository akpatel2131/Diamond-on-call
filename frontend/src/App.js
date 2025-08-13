import React, { useState, useEffect } from "react";
import MessageAlert from "./components/MessageAlert/MessageAlert";
import Dashboard from "./pages/Dashboard";
import Purchase from "./pages/Purchase";
import Sale from "./pages/Sale";
import { getProducts, purchaseProduct, checkoutSale } from "./services/api";
import styles from "./app.module.css";
import { ProductProvider, useProductContext } from "./context/productContext";

function HomeSection() {
  const { error, success } = useProductContext();
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>Inventory Sale System</h1>
        <MessageAlert type="error" message={error} />
        <MessageAlert type="success" message={success} />
        <div className={styles.productSection}>
          <Dashboard />
          <div className={styles.purchaseSaleSection}>
            <Purchase />
            {/* <Sale /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ProductProvider>
      <HomeSection />
    </ProductProvider>
  );
}

export default App;
