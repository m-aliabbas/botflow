import React, { useState, useEffect } from 'react';
import {Typography, Button, Grid, Card, CardContent, TextField,IconButton, Modal, Box } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { NavLink } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import { Select, MenuItem } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
const { server_address} = require('../config');

const StatePanel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const clientId = location.state ? location.state.clientId : 'default_user_id';
  
  const [open, setOpen] = useState(false);
  const [text,setText] = useState('');
  const [classNames, setClassNames] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedState, setSelectedState] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include the selectedState in the body of the request
      const payload = {
        text: text,
        selectedState: selectedState,
        clientId:clientId, // This is the new part
      };
      console.log(payload);
      const response = await fetch(server_address + 'save-state/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        console.log('Text and state saved successfully');
        // Additional success handling here, if necessary
      } else {
        console.error('Failed to save text and state');
        // Additional error handling here, if necessary
      }
    } catch (error) {
      console.error('Error:', error);
      // Additional error handling here, if necessary
    }
    // Reset form and close modal after submission
    setRefreshKey((oldKey) => oldKey + 1);
    setText("");
    setSelectedState(""); // Optionally reset selected state to "None"
    handleClose();
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch(server_address+`get-states/${clientId}`);
      if (response.ok) {
        const data = await response.json();
        setClassNames(data); // Update the state with the data
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refreshKey]);


  return (
    <Box className="px-6 py-8" style={{ padding: '30px' }}>
      {/* Heading and Buttons */}
      <div className='heading_out' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "6px" }}>
        <Typography className="headline-medium heading_log" marginBottom="6px" style={{ color: 'black', fontSize: "19pt", fontWeight: "bold" }}>
          State Panel
        </Typography>
        <div>
          <Button type="button" variant="contained" onClick={handleOpen} style={{ background: "black", color: "white" , marginRight:"10px"}}>
            Add State
          </Button>
          <Button component={Link} to="/botpanel" variant="contained" style={{ background: "black", color: "white" }}>
            Bot Panel
          </Button>
        </div>
      </div>

      <div>
     
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <TextField
              label="Enter State Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
    <label>
      Select Class To be Copied
    </label>
  <Select
        labelId="state-select-label"
        id="state-select"
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        fullWidth
        displayEmpty
        sx={{ my: 2 }} // Adjust spacing as needed
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {classNames.map((className) => (
          <MenuItem key={className.class_name} value={className.class_name}>
            {className.class_name}
          </MenuItem>
        ))}
      </Select>
            <Button type="submit" variant="contained" style={{background:"black"}}>
              Add State
            </Button>
          </Box>
        </Modal>
      </div>


      {/* Clients Grid */}
      <div>
    {classNames.length === 0 ? (
      <div style={{ textAlign: 'center' }}>Please add states for specific Client!</div>
    ) : (
      <Grid container spacing={2}>
        {classNames.map((className, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={className.id}> {/* Make sure the key is correctly referenced */}
            <Card variant="outlined" style={{ border: '1px solid black', padding: 0 }}>
              <CardContent style={{ textAlign: "center", padding: 0 }}>
                <Typography 
                  variant="h6" 
                  component="h2" 
                  style={{ cursor: 'pointer' }} // Added style for cursor to indicate it's clickable
                  onClick={() => navigate(`/dynamic_states/${className.link}`, { state: { clientId: clientId } })}
                >
                  {className.class_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </div>
    </Box>
  );
};

export default StatePanel;
