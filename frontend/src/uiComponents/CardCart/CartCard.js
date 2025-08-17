import styles from "./cartCard.module.css";
import { toNumber } from "lodash-es";
import React from "react";
import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CartProductCard = ({ data, index, handleUpdateQuantity, onDelete }) => {
  const [inputValue, setInputValue] = React.useState(data.quantity);

  return (
    <div key={index} className={styles.purchaseItems}>
      <div className={styles.itemHeader}>
        <span className={styles.itemName}>{data.name}</span>
        <span>Rs.{data.price}</span>
      </div>
      <div className={styles.quantityContainer}>
        <span className={styles.itemQuantity}>Quantity:</span>
        <input
          className={styles.input}
          type="number"
          min="1"
          placeholder="Enter quantity"
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && inputValue > 0) {
              handleUpdateQuantity(inputValue);
            }
          }}
          value={inputValue || ""}
        />
      </div>
      {!inputValue && <ErrorMessage message={"Please enter quantity"} />}
      <Button variant="negative" onClick={() => onDelete()}>
        Delete
      </Button>
    </div>
  );
};

export default CartProductCard;
