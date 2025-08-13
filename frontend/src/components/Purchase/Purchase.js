import React, { useCallback, useMemo } from "react";
import styles from "./purchase.module.css";
import { useProductContext } from "../../context/productContext";
import Divider from "../../uiComponents/Divider/Divider";
import Button from "../../uiComponents/Button/Button";
import CartProductCard from "../../uiComponents/CardCart/CartCard";
import EmptyData from "../../uiComponents/EmptyData/EmptyData";

export const TotalCost = ({ cost }) => {
  return (
    <div className={styles.totalCost}>
      <span>Total Cost:</span>
      <span>Rs.{cost}</span>
    </div>
  );
};

const Purchase = () => {
  const { purchaseItem, setPurchaseItem, handlePurchase, purchaseLoading } =
    useProductContext();

  const handleUpdateQuantity = useCallback(
    (value, productId) => {
      let updatedData;
      if (value === null) {
        updatedData = purchaseItem.filter((item) => item.id !== productId);
      } else {
        updatedData = purchaseItem.map((item) => {
          if (item.id === productId) {
            return {
              ...item,
              quantity: value,
            };
          }
          return item;
        });
      }
      setPurchaseItem(updatedData);
    },
    [purchaseItem]
  );

  const totalCost = useCallback(() => {
    return purchaseItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [purchaseItem]);

  const disabled = useMemo(() => {
    const quantityNotExist = purchaseItem.some((item) => !item.quantity);
    return purchaseLoading || purchaseItem.length === 0 || quantityNotExist;
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
                <CartProductCard
                  data={item}
                  index={index}
                  handleUpdateQuantity={handleUpdateQuantity}
                />
                <Divider />
              </>
            ))}
          </div>
          <TotalCost cost={totalCost()} />
        </>
      ) : (
        <EmptyData />
      )}

      <Button
        onClick={handlePurchase}
        disabled={disabled}
      >
        {purchaseLoading ? "Processing..." : "Complete Purchase"}
      </Button>
    </div>
  );
};

export default Purchase;
