import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button, { ButtonProps } from '@mui/material/Button';
import { Modal, Box, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const { server_address } = require('./config');
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
    event.dataTransfer.setData('bottomBarNode', true); // Add this line
    event.dataTransfer.effectAllowed = 'move';
  };
  const [refreshKey, setRefreshKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [classNames, setClassNames] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(server_address + 'save-disposition/', {
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
    setText("");
    handleClose();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(server_address + 'get-dispositions/');
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
      <div className='bottom-out'>
   
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
                label="Enter Disposition Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button type="submit" variant="contained" style={{background:"black"}}>
                Add Disposition
              </Button>
            </Box>
          </Modal>
        </div>


        <div  className="bottombarnode">

               <div className="description">DISPOSITIONS
               <div  onClick={handleOpen} >
           <AddIcon className='bottom-add-icon'/>
          </div>
           </div>
               
        {classNames.map((className, index) => (
          <div
          className='bottomnode-d'
            onDragStart={(event) => onDragStart(event, className.class_name)}
            draggable
            key={index}
          >
            <Button variant="contained" className='bottomsidebar-node'>
              {className.class_name}
            </Button>
          </div>
        ))}
        
        </div>

      </div>
    </aside>
  );
};