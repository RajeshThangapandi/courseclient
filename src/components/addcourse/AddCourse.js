// src/AddCourse.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AddCourse.css'; // Import the CSS file for styling
import { toast } from 'react-toastify'; // Import toast for notifications

const AddCourse = () => {
  const [courseData, setCourseData] = useState({
    course_id: '',
    course_code: '',
    title: '',
    description: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Course Data:', courseData);

    // Here you would typically send the courseData to your backend API
    fetch('http://localhost:8000/api/courses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    })
      .then(response => {
        if (response.ok) {
          toast.success('Course added successfully!');
          // Navigate back to the previous page
          navigate('/coursetable');
        } else {
          throw new Error('Failed to add course');
        }
      })
      .catch(error => {
        toast.error('Error adding course: ' + error.message);
        console.error('Error adding course:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Add a Course</h1>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="course_id">Course ID</label>
          <input
            type="number"
            className="form-control"
            id="course_id"
            name="course_id"
            value={courseData.course_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="course_code">Course Code</label>
          <input
            type="text"
            className="form-control"
            id="course_code"
            name="course_code"
            value={courseData.course_code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add a Course
        </button>
        <button className="btn btn-secondary ml-3 mt-3" onClick={() => navigate(-1)}>
          Back To Home
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
