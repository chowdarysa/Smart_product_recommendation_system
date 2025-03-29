import React, { useState } from 'react';
import { API_BASE } from '../config';

const InteractionForm = () => {
  const [userId, setUserId] = useState('');
  const [itemId, setItemId] = useState('');
  const [eventType, setEventType] = useState('click');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id: userId,
      event_type: eventType,
      details: { item_id: itemId }
    };

    try {
      const res = await fetch(`${API_BASE}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      setResponseMessage(JSON.stringify(json));
    } catch (error) {
      console.error('Error recording interaction:', error);
      setResponseMessage('Error recording interaction');
    }
  };

  return (
    <div>
      <h2>Record Interaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
        />
        <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="click">Click</option>
          <option value="view">View</option>
          <option value="purchase">Purchase</option>
        </select>
        <button type="submit">Submit Interaction</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default InteractionForm;