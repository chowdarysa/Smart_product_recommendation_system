import React, { useState } from 'react';
import { API_BASE } from '../config';

const Recommendations = () => {
  const [userId, setUserId] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    try {
      const res = await fetch(`${API_BASE}/recommendations?user_id=${userId}`);
      const json = await res.json();
      setRecommendations(json.recommendations || []);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setRecommendations([]);
    }
  };

  return (
    <div>
      <h2>Get Recommendations</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      <div>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec.itemId}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
