import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { Modal, Box, TextField,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Select, MenuItem } from '@mui/material';
const { server_address} = require('./config');
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
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
  
    event.dataTransfer.effectAllowed = 'move';
  };

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
        selectedState: selectedState, // This is the new part
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
      const response = await fetch(server_address+'get-states/');
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
    <>
    <aside>
      <div className='right-sidebar'>
    
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

<div className="dndnode">
<div className="description">STATES
<div  onClick={handleOpen} >
           <AddIcon className='bottom-add-icon'/>
          </div>
          </div>
    
    {classNames.map((className, index) => (
          <div
            className='sidebar-node-d'
            onDragStart={(event) => onDragStart(event, className.class_name)}
            draggable
            key={index}
          >
            <Button variant="contained" className='sidebar-node'>
            <NavLink className="navlink" to={'/dyamic_states/'+className.link}>
            {className.class_name}
        </NavLink>
              
            </Button>
          </div>
        ))}
      
        </div>
      
      </div>
    </aside>


  </>
  );
};