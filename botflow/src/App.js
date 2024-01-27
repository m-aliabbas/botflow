import React, { useState } from 'react';
import Home from './components/home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomBar from './components/bottomBar';
import IntroState from './components/States/introState';
import HelloState from './components/States/helloState';
import PitchState from './components/States/pitchState';
import BusyState from './components/States/busyState';
import NiState from './components/States/niState';
import PrevState from './components/States/prevState';
import CustomNodeA from './components/States/customNodeA';
import CustomNodeB from './components/States/customNodeB';
import CustomNodeC from './components/States/customNodeC';
import BinaryQState from './components/States/binaryQState';
import EntityQState from './components/States/entityQState';
import BotState from './components/States/botState';
import TransferState from './components/States/TransferState';
import PlaceHolderState from './components/States/placeholderState';

// import Animation from '../src/Animation.js'
function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/dyamic_states/:item" element={<PlaceHolderState/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
