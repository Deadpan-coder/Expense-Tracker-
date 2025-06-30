// src/context/GlobalContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import {
  getIncomes,
  addIncome,
  updateIncome,
  deleteIncome,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} from '../utils/api';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  // ===================== INCOMES =====================
  const fetchIncomes = async () => {
    try {
      const res = await getIncomes();
      setIncomes(res.data);
    } catch (err) {
      console.error('Failed to fetch incomes:', err);
    }
  };

  const handleAddIncome = async (income) => {
    try {
      await addIncome(income);
      fetchIncomes();
    } catch (err) {
      console.error('Failed to add income:', err);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      fetchIncomes();
    } catch (err) {
      console.error('Failed to delete income:', err);
    }
  };

  const handleEditIncome = (income) => {
    setEditingIncome(income);
  };

  const handleUpdateIncome = async (updatedIncome) => {
    try {
      await updateIncome(updatedIncome.id, updatedIncome);
      fetchIncomes();
    } catch (err) {
      console.error('Failed to update income:', err);
    }
  };

  const totalIncome = () => {
    return incomes.reduce((acc, item) => acc + item.amount, 0);
  };

  // ===================== EXPENSES =====================
  const fetchExpenses = async () => {
    try {
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await addExpense(expense);
      fetchExpenses();
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      await updateExpense(updatedExpense.id, updatedExpense);
      fetchExpenses();
    } catch (err) {
      console.error('Failed to update expense:', err);
    }
  };

  const totalExpense = () => {
    return expenses.reduce((acc, item) => acc + item.amount, 0);
  };

  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  useEffect(() => {
    fetchIncomes();
    fetchExpenses();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        handleAddIncome,
        handleDeleteIncome,
        handleEditIncome,
        handleUpdateIncome,
        editingIncome,
        setEditingIncome,
        handleAddExpense,
        handleDeleteExpense,
        handleEditExpense,
        handleUpdateExpense,
        editingExpense,
        setEditingExpense,
        totalIncome,
        totalExpense,
        totalBalance,
        transactionHistory
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
