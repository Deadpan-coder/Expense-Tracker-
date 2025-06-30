// src/components/TransactionList.jsx
import React from 'react';
import useGlobalContext from '../context/useGlobalContext';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';

const TransactionList = ({ type, onEdit }) => {
  const {
    incomes,
    expenses,
    handleDeleteIncome,
    handleDeleteExpense,
  } = useGlobalContext();

  // Select correct data and delete handler
  const data = type === 'income' ? incomes : expenses;
  const deleteItem = type === 'income' ? handleDeleteIncome : handleDeleteExpense;

  return (
    <div className="w-full mt-6">
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No {type}s found.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-start bg-white shadow-md rounded-lg p-4 border-l-4"
              style={{
                borderColor: type === 'income' ? '#22c55e' : '#ef4444',
              }}
            >
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {item.description}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {format(new Date(item.date), 'dd/MM/yyyy')}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`font-bold ${
                    type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {type === 'income' ? '+' : '-'}₹{item.amount}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(item)} // Safe call
                    className="text-blue-500 hover:text-blue-700 transition"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
