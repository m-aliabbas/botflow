import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useParams } from 'react-router-dom';


const BotPanel = () => {
  const [clients, setClients] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newBotName, setNewBotName] = useState('');
  const location = useLocation();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch(`http://127.0.0.1:8000/get-clients/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setClients(data); // Set the entire array of clients as fetched
      } else {
        console.error('Failed to fetch clients');
      }
    };

    fetchClients();
  }, []);

  const handleAddBotClick = () => {
    setIsPopupOpen(true);
  };

  const handleCancelClick = () => {
    setIsPopupOpen(false);
  };

  const handleAddClick = async () => {
    if (newBotName.trim() !== '') {
      const clientData = {
        name: newBotName,
        user_id: userId,
      };
  
      try {
        const response = await fetch('http://127.0.0.1:8000/save-client/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clientData),
        });
  
        if (response.ok) {
          const savedClient = await response.json();
          setClients([...clients, savedClient]); // Append the new client object to the existing list
  
          // Refresh the page
          window.location.reload();
        } else {
          console.error('Failed to save the client');
          // Check if the response status is 400
          if (response.status === 400) {
            alert("Client already Exists!"); // Show an alert to the user
          }
        }
      } catch (error) {
        console.error('Error saving the client:', error);
      }
  
      setIsPopupOpen(false);
      setNewBotName('');
    }
  };

  const navigate = useNavigate(); // Hook to navigate

  const handleNavigate = (clientId) => {
    navigate('/statepanel', { state: { clientId } }); // Navigate with client.id as state
    console.log("client_id : ",clientId)
  };


  return (
    <Box className="px-6 py-8" style={{ padding: '30px' }}>
      {/* Heading and Buttons */}
      <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "6px" }}>
        <Typography className="headline-medium heading_log" marginBottom="6px" style={{ color: 'black', fontSize: "19pt", fontWeight: "bold" }}>
          Bots
        </Typography>
        <div>
          <Button type="button" variant="contained" onClick={handleAddBotClick} style={{ background: "black", color: "white" , marginRight:"10px"}}>
            Add Bot
          </Button>
          <Button component={Link} to="/logout" variant="contained" style={{ background: "black", color: "white" }}>
            Logout
          </Button>
        </div>
      </div>

      {/* Add Bot Popup */}
      {isPopupOpen && (
        <div className="overlay">
          <div className="popup">
            <div className="popup-content">
              <Typography variant="h6">Add Bot</Typography>
              <TextField
                sx={{ marginBottom: "10px", marginTop: "12px" }}
                label="Bot Name"
                variant="outlined"
                fullWidth
                value={newBotName}
                required
                onChange={(e) => setNewBotName(e.target.value)}
              />
              <Button variant="outlined" onClick={handleAddClick} style={{ marginRight: '10px' }}>
                Add
              </Button>
              <Button variant="outlined" onClick={handleCancelClick}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Clients Grid */}
      <Grid container spacing={2}>
  {clients.length === 0 ? (
    <Typography variant="h6" style={{ textAlign: 'center', width: '100%' }}>Please Add Bot's.</Typography>
  ) : (
    clients.map((client) => (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={client.id} onClick={() => handleNavigate(client.id)}>
        <Card variant="outlined" style={{ border: '1px solid black', padding: 0 }}>
          <CardContent style={{ textAlign: "center", padding: 0 }}>
            <Typography variant="h6" component="h2">
              {client.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))
  )}
</Grid>
    </Box>
  );
};

export default BotPanel;
