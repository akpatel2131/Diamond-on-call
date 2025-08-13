import React, { useCallback, useMemo } from "react";
import styles from "./purchase.module.css";
import { useProductContext } from "../context/productContext";
import { toNumber } from "lodash-es";
import Divider from "../components/Divider/Divider";

const PurchaseCard = ({ data, index, handleUpdateQuantity }) => {
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
          onChange={(event) => {
            handleUpdateQuantity(toNumber(event.target.value), data.id);
          }}
          value={toNumber(data.quantity)}
        />
      </div>
    </div>
  );
};

const Purchase = () => {
  const { purchaseItem, setPurchaseItem, handlePurchase, purchaseLoading } =
    useProductContext();

  const handleUpdateQuantity = useCallback(
    (value, productId) => {
      const data = purchaseItem.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: value,
          };
        }
        return item;
      });
      setPurchaseItem(data);
    },
    [purchaseItem]
  );

  const totalCost = useCallback(() => {
    return purchaseItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [purchaseItem]);

  return (
    <div className={styles.purchaseForm}>
      <h2 className={styles.header}>Purchase Inventory</h2>
      <Divider />

      {purchaseItem.length > 0 ? (
        <>
          <div className={styles.addedItemsContainer}>
            {purchaseItem.map((item, index) => (
              <>
                <PurchaseCard
                  data={item}
                  index={index}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
                <Divider />
              </>
            ))}
          </div>
          <div className={styles.itemHeader}>
            <span>Total Cost:</span>
            <span>Rs.{totalCost()}</span>
          </div>
        </>
      ) : (
        <div className={styles.noItem}>No items added to purchase</div>
      )}

      <button
        onClick={handlePurchase}
        disabled={purchaseLoading || purchaseItem.length === 0}
        className={styles.button}
      >
        {purchaseLoading ? "Processing..." : "Complete Purchase"}
      </button>
    </div>
  );
};

export default Purchase;
