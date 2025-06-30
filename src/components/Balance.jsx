// src/components/Balance.jsx
import React from 'react';
import useGlobalContext from '../context/useGlobalContext';
const Balance = () => {
  const { totalIncome, totalExpense } = useGlobalContext();

  const balance = totalIncome() - totalExpense();

  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Your Balance</h2>
      <p className="text-2xl font-semibold text-green-600">₹ {balance.toFixed(2)}</p>
      <div className="flex justify-between mt-4">
        <div className="text-center">
          <h3 className="text-gray-600 font-medium">Income</h3>
          <p className="text-green-500 font-bold">+ ₹ {totalIncome().toFixed(2)}</p>
        </div>
        <div className="text-center">
          <h3 className="text-gray-600 font-medium">Expenses</h3>
          <p className="text-red-500 font-bold">- ₹ {totalExpense().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Balance;
