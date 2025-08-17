import React, { useCallback, useMemo } from "react";
import styles from "./sale.module.css";
import { useProductContext } from "../../context/productContext";
import CartProductCard from "../../uiComponents/CardCart/CartCard";
import Divider from "../../uiComponents/Divider/Divider";
import { TotalCost } from "../Purchase/Purchase";
import { toNumber } from "lodash-es";
import EmptyData from "../../uiComponents/EmptyData/EmptyData";
import Button from "../../uiComponents/Button/Button";
import ErrorMessage from "../../uiComponents/ErrorMessage/ErrorMessage";

const Sale = () => {
  const {
    saleItem,
    setSaleItem,
    handleSale,
    saleLoading,
    handleSellCart,
    sellCartLoading,
    discount,
    setDiscount,
    fetchCart,
    handleDeleteCart,
  } = useProductContext();

  const handleUpdateQuantity = useCallback(
    (productData, discount) => {
      handleSellCart(productData, discount);
    },
    [saleItem]
  );

  if (sellCartLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.saleForm}>
      <h2 className={styles.header}>Sale Product</h2>
      <Divider />

      {saleItem.products?.length > 0 ? (
        <div className={styles.addedItemsContainer}>
          {saleItem.products?.map((item, index) => (
            <>
              <CartProductCard
                data={item}
                index={index}
                handleUpdateQuantity={(quantity) => {
                  const data = {
                    ...item,
                    quantity,
                  };
                  handleUpdateQuantity(data, discount);
                }}
                onDelete={() => handleDeleteCart("sell", item.id)}
              />
              <Divider />
            </>
          ))}
        </div>
      ) : (
        <EmptyData />
      )}

      {saleItem.products?.length > 0 && (
        <>
          <div className={styles.quantityContainer}>
            <span className={styles.itemQuantity}>Discount:</span>
            <input
              type="number"
              value={saleItem.discount || discount || ""}
              placeholder="Discount (%)"
              onChange={(e) => setDiscount(toNumber(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter" && discount <=100 && discount >=0) {
                  fetchCart("sell", discount);
                }
              }}
              className={styles.input}
            />
          </div>
          {discount < 0 || discount > 100 && <ErrorMessage message={"Discount should be between 0 and 100"} />}
          <TotalCost cost={saleItem.totalCost} />
        </>
      )}

      <Button
        onClick={() => handleSale(discount)}
      >
        {saleLoading ? "Processing..." : "Complete Sale"}
      </Button>
    </div>
  );
};

export default Sale;
