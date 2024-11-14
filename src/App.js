// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';
import BulkUpload from './components/BulkUpload';
import './NavBar.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/students">Student</Link>
        <Link to="/faculty">Faculty</Link>
        <Link to="/bulk-upload">Bulk Upload</Link>
      </nav>
      <Routes>
        <Route path="/students" element={<StudentList />} />
        <Route path="/faculty" element={<FacultyList />} />
        <Route path="/bulk-upload" element={<BulkUpload />} />
      </Routes>
    </Router>
  );
}

export default App;
