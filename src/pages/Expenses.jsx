// src/pages/Expenses.jsx

import React from 'react';
import ExpenseChart from '../components/ExpenseChart'; 
import ExpenseForm from '../components/ExpenseForm';
import TransactionList from '../components/TransactionList';
import useGlobalContext from '../context/useGlobalContext';

const Expenses = () => {
  const { handleEditExpense } = useGlobalContext();

   return (
    <div className="w-full px-4 py-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-red-700 mb-4">Expense Page</h1>
      <ExpenseChart />

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <ExpenseForm />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Expense History</h2>
        <TransactionList type="expense" onEdit={handleEditExpense} />
      </div>
    </div>
  );
};

export default Expenses;
