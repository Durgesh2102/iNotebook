
import './App.css';
import {
  BrowserRouter as Router,
  Routes, // Replace Switch with Routes
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './componants/Navbar';
import Home from './componants/Home';
import NoteState from './context/notes/NoteState';
import { useContext, useEffect, useState } from 'react';
import noteContext from './context/notes/noteContext';
import SignUp from './componants/SignUp';
import LogIn from './componants/LogIn';
import Archive from './componants/Archive';
import ModalBrowser from './componants/profile Modal/ModalBrowser';
import RightSideBar from './componants/note/RightSideBar';


function App() {
  let context = useContext(noteContext)
  const [user, setUser] = useState(null);


  return (
    <>
      <NoteState>
        <>
        
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/login"
              element={<LogIn />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
              <Route
              path="/archive"
              element={<Archive />}
            />
          </Routes>
        </>
        <ModalBrowser />
        <RightSideBar />
      </NoteState>
    </>
  );
}

export default App;
