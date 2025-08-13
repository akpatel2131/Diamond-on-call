import React from 'react';
import styles from './sale.module.css';

const Sale = ({ products, saleForm, setSaleForm, handleSale, loading }) => {
  return (
    <div className={styles.saleForm}>
      <h2>Make Sale</h2>

      <select
        value={saleForm.productId}
        onChange={(e) => setSaleForm({ ...saleForm, productId: e.target.value })}
      >
        <option value="">Choose a product...</option>
        {products.filter(p => p.stock > 0).map(product => (
          <option key={product.id} value={product.id}>
            {product.name} - ${product.price} (Available: {product.stock})
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        value={saleForm.quantity}
        placeholder="Enter quantity"
        onChange={(e) => setSaleForm({ ...saleForm, quantity: e.target.value })}
      />

      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        value={saleForm.discount}
        placeholder="Discount (%)"
        onChange={(e) => setSaleForm({ ...saleForm, discount: e.target.value })}
        className={styles.discount}
      />

      <button onClick={handleSale} disabled={loading}>
        {loading ? 'Processing...' : 'Complete Sale'}
      </button>
    </div>
  );
};

export default Sale;
