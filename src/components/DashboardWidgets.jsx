
import React from 'react';
import useGlobalContext from '../context/useGlobalContext';

const DashboardWidgets = () => {
  const { incomes, expenses } = useGlobalContext();

  // === Budget Progress Bar ===
  const savingsGoal = 100000; // Example goal
  const totalIncome = incomes.reduce((sum, inc) => sum + inc.amount, 0);
  const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const currentBalance = totalIncome - totalExpense;
  const progress = Math.min((currentBalance / savingsGoal) * 100, 100);

  // === Recent Activity Feed ===
  const recentActivities = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Budget Progress Bar */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">Savings Goal</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          ₹{currentBalance.toLocaleString()} of ₹{savingsGoal.toLocaleString()} saved
        </p>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-semibold text-purple-700 mb-2">Recent Activity</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          {recentActivities.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-1">
              <span>{item.title} ({item.category})</span>
              <span className={item.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                ₹{item.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardWidgets;
