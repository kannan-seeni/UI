// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/index';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import Paddy from './Components/Paddy/index';
import EditForm from './Components/Paddy/EditForm';
import RiceTable from './Components/Rice/RiceTable';
import Rice from './Components/Rice/RiceInput';
import RiceEditForm from './Components/Rice/RiceEditForm';
import PaddyTable from './Components/Paddy/PaddyTable';
import GodownTable from './Components/MasterData/Godown/GodownTable';
import GodownInput from './Components/MasterData/Godown/GodownInput';
import RegionTable from './Components/MasterData/Region/Region';
import GodownEditForm from './Components/MasterData/Godown/GodownEditForm';

function App() {
  const [data, setData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleFormSubmit = (formData) => {
    setData(prevData => [...prevData, formData]);
  };
  const handleFormRiceSubmit = (formData) => {
    setData(prevData => [...prevData, formData]);
  };
  const handleFormGodownInput = (formValues) => {
    setData(prevData => [...prevData, formValues]);
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
    const fetchDataRice = async () => {
      try {
        const response = await fetch('http://localhost:3001/riceData');
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
    }

    fetchData();
    fetchDataRice();
  }, []);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
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
        {isAuthenticated && <Header onLogout={handleLogout} />}
        <Routes>
          <Route path="/" exact element={<Login setIsAuthenticated={setIsAuthenticated} handleLogout />} />
          <Route path="/paddy" element={isAuthenticated ? <Paddy onSubmit={handleFormSubmit} /> : <Navigate to="/" />} />
          <Route path="/paddyTable" element={isAuthenticated ? <PaddyTable data={data} /> : <Navigate to="/" />} />
          <Route path='/paddyEdit/:id' element={isAuthenticated ? <EditForm /> : <Navigate to="/" />} />
          <Route path="/rice" element={isAuthenticated ? <Rice onSubmit={handleFormRiceSubmit} /> : <Navigate to="/" />} />
          <Route path="/riceTable" element={isAuthenticated ? <RiceTable data={data} /> : <Navigate to="/" />} />
          <Route path="/riceEdit/:id" element={isAuthenticated ? <RiceEditForm /> : <Navigate to="/" />} />
          <Route path="/masterdataregion" element={isAuthenticated ? <RegionTable /> : <Navigate to="/" />} />
          <Route path="/masterdatagodown" element={isAuthenticated ? <GodownTable data={data} /> : <Navigate to="/" />} />
          <Route path="/masterdatagodowninput" element={isAuthenticated ? <GodownInput handleFormGodownInput={handleFormGodownInput} /> : <Navigate to="/" />} />
          <Route path="/masterdatagodownEdit/:id" element={isAuthenticated ? <GodownEditForm /> : <Navigate to="/" />} />

        </Routes>
        {isAuthenticated && <Footer />}
      </Router>
    </div>
  );
}

export default App;


