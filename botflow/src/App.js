import React, { useState } from 'react';
import Home from './components/home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlaceHolderState from './components/States/placeholderState';
import Login from './components/Login/Login';
import BotPanel from './components/Login/BotPanel';

// import Animation from '../src/Animation.js'
function App() {


  return (

    <>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />}/>
        <Route path="/dyamic_states/:item" element={<PlaceHolderState/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/botpanel" element={<BotPanel/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
