import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Purchase from "./components/Purchase/Purchase";
import Sale from "./components/Sale/Sale";
import styles from "./app.module.css";
import { ProductProvider, useProductContext } from "./context/productContext";
import CheckoutModal from "./uiComponents/CheckoutModal/CheckoutModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function HomeSection() {
  const { checkoutModalMeesage, setCheckoutModalMeesage } =
    useProductContext();
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1>E Purchase</h1>
        <h2>Product Dashboard</h2>
        <div className={styles.productSection}>
          <Dashboard />
          <div className={styles.purchaseSaleSection}>
            <Purchase />
            <Sale />
          </div>
        </div>
      </div>
      <CheckoutModal
        show={!!checkoutModalMeesage}
        onClose={() => setCheckoutModalMeesage("")}
        message={checkoutModalMeesage}
      />
      <ToastContainer
        closeButton={false}
        closeOnClick
      />
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
