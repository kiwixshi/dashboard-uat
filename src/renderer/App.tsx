/* eslint-disable prettier/prettier */

import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Hello />} /> */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
