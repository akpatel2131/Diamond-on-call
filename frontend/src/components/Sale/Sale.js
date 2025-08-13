import React, { useCallback, useMemo } from "react";
import styles from "./sale.module.css";
import { useProductContext } from "../../context/productContext";
import CartProductCard from "../../uiComponents/CardCart/CartCard";
import Divider from "../../uiComponents/Divider/Divider";
import { TotalCost } from "../Purchase/Purchase";
import { useState } from "react";
import { toNumber } from "lodash-es";
import EmptyData from "../../uiComponents/EmptyData/EmptyData";
import Button from "../../uiComponents/Button/Button";

const Sale = () => {
  const [discount, setDiscount] = useState(0);
  const { saleItem, setSaleItem, handleSale, saleLoading } =
    useProductContext();

  const handleUpdateQuantity = useCallback(
    (value, productId) => {
      let updatedData;
      if (value === null) {
        updatedData = saleItem.filter((item) => item.id !== productId);
      } else {
        updatedData = saleItem.map((item) => {
          if (item.id === productId && item.stock >= value) {
            return {
              ...item,
              quantity: value,
            };
          }
          return item;
        });
      }
      setSaleItem(updatedData);
    },
    [saleItem]
  );

  const totalCost = useCallback(() => {
    let total = saleItem.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    total += total * 0.2;
    return total - (total * discount) / 100;
  }, [saleItem, discount]);

  const disabled = useMemo(() => {
    const quantityNotExist = saleItem.some((item) => !item.quantity);
    return saleLoading || saleItem.length === 0 || quantityNotExist;
  }, [saleItem]);

  return (
    <div className={styles.saleForm}>
      <h2 className={styles.header}>Sale Product</h2>
      <Divider />

      {saleItem.length > 0 ? (
        <div className={styles.addedItemsContainer}>
          {saleItem.map((item, index) => (
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
      ) : (
        <EmptyData />
      )}

      {saleItem.length > 0 && (
        <>
          <div className={styles.quantityContainer}>
            <span className={styles.itemQuantity}>Discount:</span>
            <input
              type="number"
              min="0"
              max="100"
              value={discount || ""}
              placeholder="Discount (%)"
              onChange={(e) => setDiscount(toNumber(e.target.value))}
              className={styles.input}
            />
          </div>

          <TotalCost cost={totalCost()} />
        </>
      )}

      <Button
        onClick={() => handleSale(discount)}
        disabled={disabled}
      >
        {saleLoading ? "Processing..." : "Complete Sale"}
      </Button>
    </div>
  );
};

export default Sale;
