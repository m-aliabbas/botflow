import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('sidebarNode', true); // Add this line
    event.dataTransfer.effectAllowed = 'move';
  };

 
  return (
    <aside>
      <div className="description">Class</div>
      <div className="left-out">
        <div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'POSITIVE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
        Positive
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'NEGATIVE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
     Negative
      </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'AM')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
        AM
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'BUSY')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
Busy
       </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'DNC')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
        Dnc
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'ABUSE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Abuse
       </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'GREETING')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Greeting
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'LOCATION')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Location
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'NOT-INTERESTED')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
      Not Interested
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'SPANISH')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Spanish
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'OTHER')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
      Other
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'NONE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       None
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'AGAIN')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Again
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'AFFORD')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Afford
        </Button>
      </div></div>
      <div >
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'INSURED')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Insured
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'BOT')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       BOT
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'SORRY-GREETING')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Sorry Greeting
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, '  GREET-BACK')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Greet Back
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'REPITCH')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Repitch
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'EMAIL')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Email
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'QUALITY')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Quality
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'ARE-YOU-THERE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Are you there
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'WHAT-INSURANCE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       What insurance
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'MY-NUMBER')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       My Number
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'WHO-ARE-YOU')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
      Who are you
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'NEED-INFO')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
       Need Info
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'ALREADY-HAVE')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
      ALREADY HAVE
        </Button>
      </div>
      <div className="sidebarnode" onDragStart={(event) => onDragStart(event, 'CALL-BACK')} draggable>
      <Button variant="contained" className='leftsidebar-node'> 
      CALL BACK
        </Button>
      </div>
      </div>
      </div>
    </aside>
  );
};