import React from 'react';
import styles from './purchase.module.css';

const Purchase = ({ products, purchaseForm, setPurchaseForm, handlePurchase, loading }) => {
  return (
    <div className={styles.purchaseForm}>
      <h2>Purchase Inventory</h2>

      <select
        value={purchaseForm.productId}
        onChange={(e) => setPurchaseForm({ ...purchaseForm, productId: e.target.value })}
      >
        <option value="">Choose a product...</option>
        {products.map(product => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price} (Stock: {product.stock})
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={purchaseForm.quantity}
        placeholder="Enter quantity"
        onChange={(e) => setPurchaseForm({ ...purchaseForm, quantity: e.target.value })}
        className={styles.input}
      />

      <button onClick={handlePurchase} disabled={loading} className={styles.button}>
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>
    </div>
  );
};

export default Purchase;
