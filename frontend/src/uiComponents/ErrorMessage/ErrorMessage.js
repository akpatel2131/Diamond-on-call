import styles from "./errorMessage.module.css";
import React from "react";

export default function ErrorMessage({ message }) {
    return <div className={styles.error}>{message}</div>;
}