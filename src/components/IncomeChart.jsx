// src/components/IncomeChart.jsx
import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useGlobalContext from '../context/useGlobalContext';
import dayjs from 'dayjs';

const IncomeChart = () => {
  const { incomes } = useGlobalContext();

  const [selectedMonth, setSelectedMonth] = useState(dayjs().month());

  const filteredIncomes = incomes.filter(
    (income) => dayjs(income.date).month() === selectedMonth
  );

  const incomeData = filteredIncomes.map((income) => ({
    name: income.title,
    amount: parseFloat(income.amount),
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">Income Chart</h2>
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

      {incomeData.length === 0 ? (
        <p className="text-gray-500 text-center">No income for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeChart;
