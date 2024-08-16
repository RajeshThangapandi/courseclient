// src/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h1>IIT BOMBAY-COURSE MANAGEMENT SYSTEM</h1>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/addcourse')}>
        Add Course
      </button>
      <button className="btn btn-primary mt-3 ml-2" onClick={() => navigate('/coursetable')}>
        List Courses
      </button>
      <button className="btn btn-primary mt-3 ml-2" onClick={() => navigate('/addinstance')}>
      Add Instance
      </button>
      <button className="btn btn-primary mt-3 ml-2" onClick={() => navigate('/instancetable')}>
        Instance Table
      </button>
     
    </div>
  );
};

export default Home;
