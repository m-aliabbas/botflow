import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('bottomBarNode', true); // Add this line
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
     <div className='bottom-out'>
      <div className="description">Disposition  </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'DNC')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
      DNC
      </Button>
      </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'BUSY')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
        BUSY
        </Button>
      </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'A')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
      ANS MACHINE
       </Button>
      </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'N')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
     N
      </Button>
      </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'NP')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
     NP
     </Button>
      </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'NI')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
   NI
    </Button>
      </div>
      <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'XFER')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
   XFER
    </Button>
      </div> <div className="bottombarnode" onDragStart={(event) => onDragStart(event, 'LBR')} draggable>
      <Button variant="contained" className='bottomsidebar-node'> 
   LBR
    </Button>
      </div>
      </div>
    </aside>
  );
};