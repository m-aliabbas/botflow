import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
  
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <aside>
     {/* a31621
      bfdbf7
      053c5e */}
      <div className='right-sidebar'>
      <div className="description">States</div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'HELLO')} draggable>
        <Button variant="contained" className='sidebar-node'> 
        <NavLink className="navlink" to="/hello">
          hello
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'INTRO')} draggable>
      <Button variant="contained" className='sidebar-node'> 
        <NavLink className="navlink" to="/intro">
          Intro
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'PITCH')} draggable>
      <Button variant="contained" className='sidebar-node'> 
        <NavLink className="navlink" to="/pitch">
        Pitch
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'BINARY-QUESTION')} draggable>
      <Button variant="contained" className='sidebar-node'> 
        <NavLink className="navlink" to="/q1">
      Binary Question
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'ENTYTY-QUESTION')} draggable>
      <Button variant="contained" className='sidebar-node'> 
        <NavLink className="navlink" to="/q2">
        Entity Question
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'BUSY')} draggable>
      <Button variant="contained" className='sidebar-node'> 
        <NavLink className="navlink" to="/busy">
        Busy
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'NI')} draggable>
      <Button variant="contained" className='sidebar-node'> 
       <NavLink className="navlink" to="/ni">
       Ni
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'BOT')} draggable>
      <Button variant="contained" className='sidebar-node'> 
       <NavLink className="navlink" to="/bot">
       Bot
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'TRANSFER')} draggable>
      <Button variant="contained" className='sidebar-node'> 
       <NavLink className="navlink" to="/transfer">
       Transfer
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'PREV')} draggable>
      <Button variant="contained" className='sidebar-node'> 
      <NavLink className="navlink" to="/prev">
      Prev
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'CUSTOM-A')} draggable>
      <Button variant="contained" className='sidebar-node'> 
      <NavLink className="navlink" to="/a">
      Custom A
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'CUSTOM-B')} draggable>
      <Button variant="contained" className='sidebar-node'> 
      <NavLink className="navlink" to="/b">
      Custom B
        </NavLink>
        </Button>
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'CUSTOM-C')} draggable>
      <Button variant="contained" className='sidebar-node'> 
      <NavLink className="navlink" to="/c">
      Custom C
        </NavLink>
        </Button>
      </div>
      </div>
    </aside>
  );
};