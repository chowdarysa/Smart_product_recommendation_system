import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Login from './components/Login';
import Items from './components/Items';
import Recommendations from './components/Recommendations';
import './App.css';

// Separate component for the navigation bar
const NavigationBar = () => {
  const username = localStorage.getItem('username');
  const location = useLocation();
  
  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Recommendation App
        </Typography>
        {username && (
          <>
            <Button color="inherit" component={Link} to="/items">
              All Items
            </Button>
            <Button color="inherit" component={Link} to="/recommendations">
              Recommendations
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

function App() {
  const username = localStorage.getItem('username');

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/items" 
            element={username ? <Items username={username} /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/recommendations" 
            element={username ? <Recommendations username={username} /> : <Navigate to="/login" replace />} 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
