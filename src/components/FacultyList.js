import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [facultyName, setFacultyName] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [age, setAge] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = "http://localhost:5000/api/faculty";

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { facultyName, department, course, age };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setFacultyName('');
      setDepartment('');
      setCourse('');
      setAge('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (faculty) => {
    setEditingId(faculty._id);
    setFacultyName(faculty.facultyName);
    setDepartment(faculty.department);
    setCourse(faculty.course);
    setAge(faculty.age);
  };

  return (
    <div>
      <h2>Faculty List</h2>
      <input 
        placeholder="Faculty Name" 
        value={facultyName} 
        onChange={(e) => setFacultyName(e.target.value)} 
      />
      <input 
        placeholder="Department" 
        value={department} 
        onChange={(e) => setDepartment(e.target.value)} 
      />
      <input 
        placeholder="Course" 
        value={course} 
        onChange={(e) => setCourse(e.target.value)} 
      />
      <input 
        placeholder="Age" 
        type="number"
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
      />
      <button onClick={saveFaculty}>
        {editingId ? "Update Faculty" : "Add Faculty"}
      </button>
      
      <ul>
        {faculty.map(facultyMember => (
          <li key={facultyMember._id}>
            {facultyMember.facultyName} - Dept: {facultyMember.department}, Course: {facultyMember.course}, Age: {facultyMember.age}
            <button onClick={() => editFaculty(facultyMember)}>Edit</button>
            <button onClick={() => deleteFaculty(facultyMember._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
