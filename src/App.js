// import logo from './logo.svg';
import React, { useState } from 'react';
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
