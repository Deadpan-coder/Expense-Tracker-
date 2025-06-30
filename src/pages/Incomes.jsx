// src/pages/Incomes.jsx

import React from 'react';
import IncomeChart from '../components/IncomeChart'; 
import IncomeForm from '../components/IncomeForm';
import TransactionList from '../components/TransactionList';
import useGlobalContext from '../context/useGlobalContext';

const Incomes = () => {
  const { handleEditIncome } = useGlobalContext();

  return (
  <div className="w-full px-4 py-6 max-w-5xl mx-auto">
    <h1 className="text-2xl font-bold text-green-700 mb-4">Income Page</h1>

   
    <IncomeChart />

    
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <IncomeForm />
    </div>

    
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-green-600">Income History</h2>
      <TransactionList type="income" onEdit={handleEditIncome} />
    </div>
  </div>
);

};

export default Incomes;
