import { useState, useEffect } from 'react';
import useGlobalContext from '../context/useGlobalContext';

const ExpenseForm = () => {
  const {
    handleAddExpense,
    handleUpdateExpense,
    editingExpense,
    setEditingExpense,
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

  // Prefill form for editing
  useEffect(() => {
    if (editingExpense) {
      setInputState(editingExpense);
    }
  }, [editingExpense]);

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

    if (editingExpense) {
      handleUpdateExpense({ ...inputState, id: editingExpense.id });
      setEditingExpense(null); // Exit edit mode
    } else {
      handleAddExpense(inputState);
    }

    // Reset form
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
        <option value="education">Education</option>
        <option value="groceries">Groceries</option>
        <option value="health">Health</option>
        <option value="subscriptions">Subscriptions</option>
        <option value="takeaways">Takeaways</option>
        <option value="clothing">Clothing</option>
        <option value="travelling">Travelling</option>
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
          editingExpense ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white px-4 py-2 rounded transition`}
      >
        {editingExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;
