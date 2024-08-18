// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/index';
import Header from './Components/Common/Header';
import Paddy from './Components/Paddy/index';
import TableComponent from './Components/Common/Table';
import EditForm from './Components/Paddy/EditForm';
import RiceTable from './Components/Rice/RiceTable';
import Rice from './Components/Rice/RiceInput';

function App() {
  const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleFormSubmit = (formData) => {
    setData(prevData => [...prevData, formData]);
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/paddyData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }
  
  return (
    <div className="App">

      <Router>
        {/* <Header /> */}
        {isAuthenticated && <Header />}
        <Routes>
          <Route path="/" exact element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          {/* Protected routes */}
          <Route path="/paddy" element={isAuthenticated ? <Paddy onSubmit={handleFormSubmit}  /> : <Navigate to="/" />} />
          <Route path="/paddyTable" element={isAuthenticated ? <TableComponent data={data}  /> : <Navigate to="/" />} />
          <Route path='/edit/:id' element={isAuthenticated ? <EditForm /> : <Navigate to="/" />} />
          <Route path="/riceTable" element={<RiceTable />} />
          <Route path="/rice" element={<Rice onSubmit={handleFormSubmit} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
