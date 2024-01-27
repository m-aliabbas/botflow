import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { Modal, Box, TextField,IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/save-state/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        console.log('Text saved successfully');
      } else {
        console.error('Failed to save text');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setRefreshKey((oldKey) => oldKey + 1);
    handleClose();
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get-states/');
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
    <aside>
     {/* a31621
      bfdbf7
      053c5e */}
      <div className='right-sidebar'>
      <div className="description">States</div>
      <div>
      <Button variant="contained" onClick={handleOpen}>
        Add States
      </Button>
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
            label="Class Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
    {classNames.map((className, index) => (
          <div
            className="dndnode"
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
    </aside>
  );
};