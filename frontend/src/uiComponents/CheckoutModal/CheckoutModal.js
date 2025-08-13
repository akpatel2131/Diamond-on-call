import React from "react";
import styles from "./checkoutModal.module.css";
import Button from "../Button/Button";

export default function CheckoutModal({ show, onClose, message }) {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalStyles}>
        <h2>✅ Success</h2>
        <p>{message}</p>
        <Button onClick={onClose} className={styles.buttonStyles}>Go Back</Button>
      </div>
    </div>
  );
}