// import logo from './logo.svg';
import React, { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/index';
import Header from './Components/Common/Header';
import Paddy from './Components/Paddy/index';
import TableComponent from './Components/Common/Table';

function App() {
  const [data, setData] = useState([]);
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
        <Header />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/paddy" element={<Paddy onSubmit={handleFormSubmit}></Paddy>} />

          <Route path="/paddyTable" element={<TableComponent data={data} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
