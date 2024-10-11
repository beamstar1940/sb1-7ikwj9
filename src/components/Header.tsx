import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <DollarSign size={24} />
          <span className="text-xl font-bold">FinanceTracker</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
            <li><Link to="/budget" className="hover:text-blue-200">Budget</Link></li>
            <li><Link to="/expenses" className="hover:text-blue-200">Expenses</Link></li>
            <li><Link to="/income" className="hover:text-blue-200">Income</Link></li>
            <li><Link to="/savings-goals" className="hover:text-blue-200">Savings Goals</Link></li>
            <li><Link to="/investments" className="hover:text-blue-200">Investments</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;