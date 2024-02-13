import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, TextField } from '@mui/material';

const BotPanel = () => {
  const [clients, setClients] = useState([
    'Bot 1',
    'Bot 2',
    'Bot 3',
    'Bot 4',
    'Bot 5',
    'Bot 6',
    'Bot 7',
    'Bot 8',
    'Bot 9',
    'Bot 10'
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newBotName, setNewBotName] = useState('');

  const handleAddBotClick = () => {
    setIsPopupOpen(true);
  };

  const handleCancelClick = () => {
    setIsPopupOpen(false);
  };

  const handleAddClick = () => {
    // Check if the new bot name is not empty
    if (newBotName.trim() !== '') {
      // Add the new bot name to the list of clients
      setClients([...clients, newBotName]);
    }
    // Close the popup
    setIsPopupOpen(false);
    // Clear the input field
    setNewBotName('');
  };
  
  return (
    <Box className="px-6 py-8" style={{ padding: '30px' }}>

      <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "6px" }}>
        <Typography className="headline-medium heading_log" marginBottom="6px" style={{ color: 'black', fontSize: "19pt", fontWeight: "bold" }}>
          Bots
        </Typography>

        <Button type="button" variant="contained" onClick={handleAddBotClick} style={{ background: "black", color: "white" }}>
          Add Bot
        </Button>
      </div>

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

      <div>
        <Grid container spacing={2} >
          {clients.map((client, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <Card variant="outlined" style={{ border: '1px solid black', padding: 0 }}>
                <CardContent style={{ textAlign: "center", padding: 0 }}>
                  <a href={`http://${window.location.hostname}:${window.location.port}/dispana/${client}`} style={{ textDecoration: "none", color: "black" }}>
                    <Typography variant="h6" component="h2">
                      {client}
                    </Typography>
                  </a>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

    </Box>
  );
};

export default BotPanel;
