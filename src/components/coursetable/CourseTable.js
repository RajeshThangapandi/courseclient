// src/CourseTable.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify'; // Import toast

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8000/api/courses/')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSearchClick = (course) => {
    // Define the action for the search icon
    console.log('Search clicked for course:', course);
  };

  const handleDeleteClick = (course_code) => {
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this course?')) {
      fetch(`http://localhost:8000/api/courses/${course_code}/`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            // Remove the deleted course from state
            setCourses(courses.filter(course => course.code !== course_code));
            toast.success('Course deleted successfully!');
          } else {
            toast.error('Failed to delete course.');
          }
        })
        .catch(error => {
          console.error('Error deleting course:', error);
          toast.error('Error deleting course.');
        });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">List Courses</h1>
     
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.title}</td>
              <td>{course.code}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleSearchClick(course)}
                  title="Search"
                >
                  <i className="fas fa-search"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDeleteClick(course.code)} // Pass the course code
                  title="Delete"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Back
      </button>
    </div>
  );
};

export default CourseTable;
