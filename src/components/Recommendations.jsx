import React, { useEffect, useState } from 'react';
import { 
  Container, 
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Button,
  Stack
} from '@mui/material';
import { api } from '../services/api';

const Recommendations = ({ username }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Username prop:', username); // Debug log

    const fetchRecommendations = async () => {
      try {
        console.log('Fetching recommendations for user:', username); // Debug log
        const response = await api.getRecommendations(username);
        console.log('API Response:', response); // Debug log
        setRecommendations(response.recommendations || []);
      } catch (err) {
        console.error('Detailed error:', err); // More detailed error log
        setError('Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRecommendations();
    } else {
      console.log('No username provided'); // Debug log
      setError('No username provided');
      setLoading(false);
    }
  }, [username]);

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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Recommended Items
      </Typography>
      <Paper elevation={2}>
        <List>
          {recommendations.map((item, index) => (
            <ListItem 
              key={item.itemId}
              divider={index !== recommendations.length - 1}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2
              }}
            >
              <ListItemText
                primary={`Item ID: ${item.itemId}`}
                //secondary={`Score: ${(item.score * 100).toFixed(4)}%`}
              />
              <Stack direction="row" spacing={1}>
                <Button 
                  variant="outlined" 
                  size="small"
                  onClick={() => handleInteraction(item.itemId, 'view')}
                >
                  View
                </Button>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => handleInteraction(item.itemId, 'purchase')}
                >
                  Purchase
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Recommendations; 