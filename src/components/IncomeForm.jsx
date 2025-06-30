import { useState, useEffect } from 'react';
import useGlobalContext from '../context/useGlobalContext';

const IncomeForm = () => {
  const {
    handleAddIncome,
    handleUpdateIncome,
    editingIncome,
    setEditingIncome,
  } = useGlobalContext();
  const [error, setError] = useState('');
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: ''
  });

  const { title, amount, date, category, description } = inputState;

  // Load selected income for editing
  useEffect(() => {
    if (editingIncome) {
      setInputState(editingIncome);
    }
  }, [editingIncome]);

  const handleInput = (e) => {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date || !category || !description) {
      return setError('All fields are required.');
    }

    if (editingIncome) {
      handleUpdateIncome({ ...inputState, id: editingIncome.id });
      setEditingIncome(null); // Clear edit mode
    } else {
      handleAddIncome(inputState);
    }

    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border border-gray-300 rounded-md bg-white shadow-md">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        name="title"
        value={title}
        onChange={handleInput}
        placeholder="Title"
        className="input-style"
      />
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={handleInput}
        placeholder="Amount"
        className="input-style"
      />
      <input
        type="date"
        name="date"
        value={date}
        onChange={handleInput}
        className="input-style"
      />
      <select
        required
        name="category"
        value={category}
        onChange={handleInput}
        className="input-style"
      >
        <option value="" disabled>Select Category</option>
        <option value="salary">Salary</option>
        <option value="freelance">Freelance</option>
        <option value="investments">Investments</option>
        <option value="stocks">Stocks</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="bank">Bank Transfer</option>
        <option value="youtube">Youtube</option>
        <option value="other">Other</option>
      </select>
      <textarea
        name="description"
        value={description}
        onChange={handleInput}
        placeholder="Add a reference"
        rows="3"
        className="input-style"
      ></textarea>
      <button
        type="submit"
        className={`${
          editingIncome ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded transition`}
      >
        {editingIncome ? 'Update Income' : 'Add Income'}
      </button>
    </form>
  );
};

export default IncomeForm;
