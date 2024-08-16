import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import AddCourse from './components/addcourse/AddCourse';
import CourseTable from './components/coursetable/CourseTable';
import InstanceTable from './components/instancetable/InstanceTable';
import AddInstance from './components/addinstance/AddInstance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path="/coursetable" element={<CourseTable />} />
          <Route path="/instancetable" element={<InstanceTable />} />
          <Route path="/addinstance" element={<AddInstance />} />
        </Routes>
        <ToastContainer /> {/* Toast container for displaying toasts */}
      </div>
    </Router>
  );
}

export default App;
