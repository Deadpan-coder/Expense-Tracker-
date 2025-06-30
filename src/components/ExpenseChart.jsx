// src/components/ExpenseChart.jsx
import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useGlobalContext from '../context/useGlobalContext';
import dayjs from 'dayjs';

const ExpenseChart = () => {
  const { expenses } = useGlobalContext();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  const filteredExpenses = expenses.filter(
    (expense) => dayjs(expense.date).month() === selectedMonth
  );

  const expenseData = filteredExpenses.map((expense) => ({
    name: expense.title,
    amount: parseFloat(expense.amount),
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-red-700">Expense Chart</h2>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1"
        >
          {Array.from({ length: 12 }).map((_, idx) => (
            <option key={idx} value={idx}>
              {dayjs().month(idx).format('MMMM')}
            </option>
          ))}
        </select>
      </div>

      {expenseData.length === 0 ? (
        <p className="text-gray-500 text-center">No expenses for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseChart;
