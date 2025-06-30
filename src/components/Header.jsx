import React from 'react';
import useGlobalContext from '../context/useGlobalContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { totalIncome, totalExpense, totalBalance } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      {/* ✅ Logout + Navigation Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        {/* Navigation Links */}
        <div className="flex gap-6 text-sm md:text-base text-gray-700">
          <Link
            to="/dashboard"
            className={`${
              location.pathname === '/dashboard' ? 'font-bold text-blue-600' : 'text-gray-600'
            } hover:text-blue-500 transition`}
          >
            Dashboard
          </Link>
          <Link
            to="/incomes"
            className={`${
              location.pathname === '/incomes' ? 'font-bold text-blue-600' : 'text-gray-600'
            } hover:text-blue-500 transition`}
          >
            Incomes
          </Link>
          <Link
            to="/expenses"
            className={`${
              location.pathname === '/expenses' ? 'font-bold text-blue-600' : 'text-gray-600'
            } hover:text-blue-500 transition`}
          >
            Expenses
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* ✅ Summary Cards (no overlap) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-green-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-green-700">Income</h2>
          <p className="text-2xl font-bold text-green-900">₹{totalIncome()}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-red-700">Expense</h2>
          <p className="text-2xl font-bold text-red-900">₹{totalExpense()}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-700">Balance</h2>
          <p className="text-2xl font-bold text-blue-900">₹{totalBalance()}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
