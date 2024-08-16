// src/InstanceTable.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast } from 'react-toastify'; // Import toast for notifications
import './InstanceTable.css'; // Import the CSS file for styling

const InstanceTable = () => {
  const [instances, setInstances] = useState([]);
  const [detailedInstances, setDetailedInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch instance data from the API
    fetch('http://localhost:8000/api/instances/')
      .then(response => response.json())
      .then(data => {
        setInstances(data);

        // Generate year and semester options from the fetched data
        const years = Array.from(new Set(data.map(instance => instance.year)));
        const semesters = Array.from(new Set(data.map(instance => instance.semester)));

        setYearOptions(years);
        setSemesterOptions(semesters);

        // Fetch detailed data for each instance
        const fetchDetails = data.map(instance =>
          fetch(`http://localhost:8000/api/instances/${instance.year}/${instance.semester}/${instance.course_code}/`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .catch(error => console.error('Error fetching detailed instance:', error))
        );

        // Store all detailed data in a single array
        Promise.all(fetchDetails)
          .then(results => {
            console.log('Detailed instances fetched:', results);
            setDetailedInstances(results);
          })
          .catch(error => console.error('Error processing detailed instances:', error));
      })
      .catch(error => console.error('Error fetching instances:', error));
  }, []);

  useEffect(() => {
    // Apply filters based on selected year and semester
    const filtered = instances.filter(instance => {
      return (
        (selectedYear ? instance.year === parseInt(selectedYear, 10) : true) &&
        (selectedSemester ? instance.semester === parseInt(selectedSemester, 10) : true)
      );
    });

    setFilteredInstances(filtered);
  }, [selectedYear, selectedSemester, instances]); // Dependency array

  const handleSearchClick = (instance) => {
    console.log('Search clicked for instance:', instance);
  };

  const handleDeleteClick = (instance) => {
    if (window.confirm('Are you sure you want to delete this instance?')) {
      fetch(`http://localhost:8000/api/instances/${instance.year}/${instance.semester}/${instance.course_code}/delete/`, {
        method: 'DELETE'
      })
        .then(response => {
          if (response.ok) {
            toast.success('Instance deleted successfully!');
            // Refresh the list after deletion
            setInstances(prevInstances => prevInstances.filter(inst => inst !== instance));
            setFilteredInstances(prevFiltered => prevFiltered.filter(inst => inst !== instance));
          } else {
            throw new Error('Failed to delete instance');
          }
        })
        .catch(error => {
          toast.error('Error deleting instance: ' + error.message);
          console.error('Error deleting instance:', error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Instance Table</h1>

      {/* Filter Form */}
      <div className="mb-4 filter-form">
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="year">Year</label>
            <select
              id="year"
              className="form-control"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Select Year</option>
              {yearOptions.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="semester">Semester</label>
            <select
              id="semester"
              className="form-control"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="">Select Semester</option>
              {semesterOptions.map(semester => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Instances Table */}
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Course Title</th>
            <th>Year-Sem</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredInstances.map((instance, index) => {
            // Find the detailed instance based on course_code, year, and semester
            const detailedInstance = detailedInstances.find(
              detailed =>{
                return  detailed.course_code === instance.course_code 
              }
               
            );

            return (
              <tr key={index}>
                <td>{detailedInstance ? detailedInstance.title : 'Loading...'}</td>
                <td>{instance.year}-{instance.semester}</td>
                <td>{instance.course_code}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleSearchClick(instance)}
                    title="Search"
                  >
                    <i className="fas fa-search"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDeleteClick(instance)}
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default InstanceTable;
