import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  Box,
  CircularProgress,
  Button,
  Stack
} from '@mui/material';
import { api } from '../services/api';

const Items = ({ username }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.getItems();
        // Remove duplicates based on item_id
        const uniqueItems = response.items.reduce((acc, current) => {
          const exists = acc.find(item => item.item_id === current.item_id);
          if (!exists) {
            return acc.concat([current]);
          }
          return acc;
        }, []);
        setItems(uniqueItems || []);
      } catch (err) {
        setError('Failed to fetch items');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleInteraction = async (itemId, eventType) => {
    try {
      await api.recordInteraction(username, eventType, itemId);
      console.log(`Interaction recorded: ${eventType} for item ${itemId}`);
    } catch (err) {
      console.error('Error recording interaction:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        All Items ({items.length})
      </Typography> */}
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.item_id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                  Item ID: {item.item_id}
                </Typography>
                <Typography>
                  Category: {item.CATEGORY_L1}
                </Typography>
                <Typography>
                  Date: {new Date(parseInt(item.timestamp)).toLocaleDateString()}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => handleInteraction(item.item_id, 'view')}
                  >
                    View
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleInteraction(item.item_id, 'purchase')}
                  >
                    Purchase
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Items; 