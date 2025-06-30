// src/utils/api.js
import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';

// Income APIs
export const getIncomes = () => axios.get(`${BASE_URL}/incomes/all`);
export const addIncome = (income) => axios.post(`${BASE_URL}/incomes/add`, income);
export const deleteIncome = (id) => axios.delete(`${BASE_URL}/incomes/delete/${id}`);
export const updateIncome = (id,data) => axios.put(`${BASE_URL}/incomes/update/${id}`, data);

// Expense APIs
export const getExpenses = () => axios.get(`${BASE_URL}/expenses/all`);
export const addExpense = (expense) => axios.post(`${BASE_URL}/expenses/add`, expense);
export const deleteExpense = (id) => axios.delete(`${BASE_URL}/expenses/delete/${id}`);
export const updateExpense = (id, data) => axios.put(`${BASE_URL}/expenses/update/${id}`, data);


