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


// import Animation from '../src/Animation.js'
function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/hello" element={<HelloState/>}>
        </Route>
        <Route path="/intro" element={<IntroState/>}>
        </Route>
        <Route path="/pitch" element={<PitchState/>}>
        </Route>
        <Route path="/pitch" element={<PitchState/>}>
        </Route>
        <Route path="/q1" element={<BinaryQState/>}>
        </Route>
        <Route path="/q2" element={<EntityQState/>}>
        </Route>
        <Route path="/busy" element={<BusyState/>}>
        </Route>
        <Route path="/ni" element={<NiState/> }>
        </Route>
        <Route path="/bot" element={<BotState/>}>
        </Route>
        <Route path="/transfer" element={<TransferState/>}>
        </Route>
        <Route path="/prev" element={<PrevState/> }>
        </Route>
        <Route path="/a" element={<CustomNodeA/>}>
        </Route>
        <Route path="/b" element={<CustomNodeB/> }>
        </Route>
        <Route path="/c" element={<CustomNodeC/> }>
        </Route>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
