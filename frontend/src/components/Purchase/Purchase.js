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
  const { purchaseItem, handlePurchase, purchaseLoading, handlePurchaseCart, purchaseCartLoading, handleDeleteCart } =
    useProductContext();

  const handleUpdateQuantity = useCallback(
    (productData) => {
      handlePurchaseCart(productData);
    },
    [handlePurchaseCart]
  );

  if(purchaseCartLoading) {
    return <div>...loading</div>
  }
  return (
    <div className={styles.purchaseForm}>
      <h2 className={styles.header}>Purchase Inventory</h2>
      <Divider />

      {purchaseItem.products?.length > 0 ? (
        <>
          <div className={styles.addedItemsContainer}>
            {purchaseItem.products?.map((item, index) => (
              <>
                <CartProductCard
                  data={item}
                  index={index}
                  handleUpdateQuantity={(quantity) => {
                    const data = {
                      ...item,
                      quantity,
                    }
                    handleUpdateQuantity(data);
                  }}
                  onDelete={() => handleDeleteCart("purchase", item.id)}
                />
                <Divider />
              </>
            ))}
          </div>
          <TotalCost cost={purchaseItem.totalCost} />
        </>
      ) : (
        <EmptyData />
      )}

      <Button
        onClick={handlePurchase}
      >
        {purchaseLoading ? "Processing..." : "Complete Purchase"}
      </Button>
    </div>
  );
};

export default Purchase;
