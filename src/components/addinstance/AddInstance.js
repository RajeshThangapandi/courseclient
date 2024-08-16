// src/AddInstance.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is present
import './AddInstance.css'; // Import custom CSS for additional styling

const AddInstance = () => {
  const [dropdownValue, setDropdownValue] = useState('');
  const [inputField1, setInputField1] = useState('');
  const [inputField2, setInputField2] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course data for dropdown options
    fetch('http://localhost:8000/api/courses/')
      .then(response => response.json())
      .then(data => {
        // Set dropdown options with course codes
        const options = data.map(course => ({
          value: course.code,
          label: course.code,
        }));
        setDropdownOptions(options);
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSubmit = () => {
    // Validation
    if (!dropdownValue) {
      toast.error('Please select a course.');
      return;
    }
    if (!inputField1) {
      toast.error('Please enter the year.');
      return;
    }
    if (!inputField2) {
      toast.error('Please enter the semester.');
      return;
    }

    const instanceData = {
      year: parseInt(inputField1, 10),   // Convert year to integer
      semester: parseInt(inputField2, 10), // Convert semester to integer
      course_code: dropdownValue,
    };

    fetch('http://localhost:8000/api/instances/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instanceData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Instance added:', data);
        toast.success('Instance added successfully!'); // Show success toast
        // Navigate to another route or handle successful submission
        navigate('/instancetable');
      })
      .catch(error => {
        console.error('Error adding instance:', error);
        toast.error('Error adding instance. Please try again.'); // Show error toast
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container">
        <h1 className="mb-4 text-center">Add Instance</h1>
        <div className="form-group">
          <label htmlFor="dropdown">Select Course</label>
          <select
            id="dropdown"
            className="form-control"
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
          >
            <option value="" disabled>Select Course</option>
            {dropdownOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="input1">Year</label>
          <input
            id="input1"
            type="text"
            className="form-control"
            placeholder="Year"
            value={inputField1}
            required
            onChange={(e) => setInputField1(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="input2">Semester</label>
          <input
            id="input2"
            type="text"
            className="form-control"
            placeholder="Semester"
            value={inputField2}
            required
            onChange={(e) => setInputField2(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="btn btn-secondary mt-3 ml-2"
          onClick={() => navigate(-1)} // Navigate back to the previous page
        >
          Back To Home
        </button>
        <ToastContainer /> {/* Toast container for displaying toasts */}
      </div>
    </div>
  );
};

export default AddInstance;
