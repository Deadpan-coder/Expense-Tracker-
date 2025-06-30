// src/components/ExpenseInsights.jsx
import React from 'react';
import useGlobalContext from '../context/useGlobalContext';

const ExpenseInsights = () => {
  const { expenses } = useGlobalContext();

  const currentMonth = new Date().getMonth();

  const currentMonthExpenses = expenses.filter(
    exp => new Date(exp.date).getMonth() === currentMonth
  );

  // Group totals by category
  const categoryTotals = {};
  currentMonthExpenses.forEach(exp => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const totalThisMonth = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const topCategory = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])[0]; // Highest spend

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-sm mt-4">
      <h3 className="text-md font-bold mb-2 text-red-700">💡 Expense Insight</h3>
      {topCategory ? (
        <p>
          You spent the most on{' '}
          <span className="font-semibold text-indigo-700">{topCategory[0]}</span>, 
          which is{' '}
          <span className="font-semibold">
            {((topCategory[1] / totalThisMonth) * 100).toFixed(1)}%
          </span>{' '}
          of your total expenses this month.
        </p>
      ) : (
        <p>No expenses recorded for this month.</p>
      )}
    </div>
  );
};

export default ExpenseInsights;
