import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import SavingsGoals from './pages/SavingsGoals';
import Investments from './pages/Investments';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/income" element={<Income />} />
            <Route path="/savings-goals" element={<SavingsGoals />} />
            <Route path="/investments" element={<Investments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;