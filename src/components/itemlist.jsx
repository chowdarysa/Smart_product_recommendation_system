import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_BASE}/items`);
        const json = await res.json();
        setItems(json.items || []);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <h2>Catalog Items</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.item_id} - {item.category}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};

export default ItemsList;
