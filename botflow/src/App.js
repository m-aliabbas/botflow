import React, { useState } from 'react';
import Home from './components/home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

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
