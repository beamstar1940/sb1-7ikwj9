import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

const Expenses: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, description: 'Groceries', amount: 75.50, category: 'Food', date: '2023-04-15' },
    { id: 2, description: 'Gas', amount: 40.00, category: 'Transportation', date: '2023-04-16' },
  ]);

  const [newExpense, setNewExpense] = useState<Omit<Expense, 'id'>>({
    description: '',
    amount: 0,
    category: '',
    date: '',
  });

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount > 0 && newExpense.category && newExpense.date) {
      setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
      setNewExpense({ description: '', amount: 0, category: '', date: '' });
    }
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Expense Tracking</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            placeholder="Description"
            className="p-2 border rounded"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-2 border rounded"
            value={newExpense.amount || ''}
            onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
          />
          <input
            type="text"
            placeholder="Category"
            className="p-2 border rounded"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            onClick={handleAddExpense}
          >
            <PlusCircle size={24} className="mr-2" />
            Add Expense
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Expense List</h2>
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
              <div>
                <span className="font-semibold">{expense.description}</span>
                <span className="text-sm text-gray-600 ml-2">({expense.category})</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">${expense.amount.toFixed(2)}</span>
                <span className="text-sm text-gray-600">{expense.date}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Expenses;