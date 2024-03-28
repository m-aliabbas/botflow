import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/home';
import PlaceHolderState from './components/States/placeholderState';
import Login from './components/Login/Login';
import BotPanel from './components/Login/BotPanel';
import StatePanel from './components/Login/StatePanel';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Import the ProtectedRoute component
import Logout from './components/Login/Logout'; // Import the Logout component


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}> {/* Wrap protected routes */}
            <Route path="dynamic_states/:item" element={<PlaceHolderState/>}/>
            <Route path="/botpanel" element={<BotPanel/>}/>
            <Route path="/statepanel" element={<StatePanel/>}/>
            <Route path="/" element={<Home />}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/> {/* Add the logout route */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
