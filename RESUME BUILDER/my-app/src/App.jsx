import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import './App.css'
import WithoutAi from './components/templatePage';
import ResumeEditor from './components/resumeEditor';
import Temp5 from './components/temp5';
import Sidebar from './components/Sidebar';
import Temp1 from './components/Temp1';
import Temp2 from './components/Temp2';
import Temp3 from './components/Temp3';
import Temp4 from './components/Temp4';
import Temp8 from './components/Temp8';
import Temp9 from './components/Temp9';
import Temp10 from './components/Temp10';

function App() {
  
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path='/templatepage' element={<WithoutAi />} />
            <Route path="/temp1" element={<Temp1 />} />
            <Route path="/temp2" element={<Temp2 />} />
            <Route path="/temp3" element={<Temp3 />} />
            <Route path="/temp4" element={<Temp4 />} />
            <Route path="/temp5" element={<Temp5 />} />
            <Route exact path='/temp8' element={<Temp8 />} />
            <Route exact path='/temp9' element={<Temp9 />} />
            <Route exact path='/temp10' element={<Temp10/>} />
          </Routes>
    </Router>
  );
}

export default App
