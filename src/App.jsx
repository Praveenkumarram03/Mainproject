import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage'; // Import the LoginPage component
import SidebarPage from './components/SidebarPage';
import  AssemblerPage from './components/AssemblerPage';
import Cobol from './components/cobol';
import Java from './components/java';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login Page Route */}
        <Route path="/main" element={<SidebarPage />} /> {/* Sidebar Page Route */}
        <Route path="/Assembler" element={<AssemblerPage />} />
        <Route path="/Cobol" element={<Cobol />} />
        <Route path="/Java" element={<Java />} />

        
      </Routes>
    </Router>
  );
}

export default App;



