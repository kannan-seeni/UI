// import logo from './logo.svg';
import React,{useState} from 'react';
import './App.css';
import Login from './Components/Login/index';
import Header from './Components/Common/Header';
import Paddy from  './Components/Paddy/index';
import TableComponent  from './Components/Common/Table';

function App() {
  const [data, setData] = useState([]);
  const handleFormSubmit = (formData) => {
    setData(prevData => [...prevData, formData]);
};

  return (
    <div className="App">
      <Header />
      <Login />
      <Paddy onSubmit={handleFormSubmit}/>
      <TableComponent data={data} />
    </div>
  );
}

export default App;
