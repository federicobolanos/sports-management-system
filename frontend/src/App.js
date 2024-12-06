import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ReservationsPage from "./pages/ReservationsPage";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
