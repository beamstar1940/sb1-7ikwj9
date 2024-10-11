import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Income {
  id: number;
  source: string;
  amount: number;
  date: string;
}

const Income: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    { id: 1, source: 'Salary', amount: 5000, date: '2023-04-01' },
    { id: 2, source: 'Freelance Work', amount: 1000, date: '2023-04-15' },
  ]);

  const [newIncome, setNewIncome] = useState<Omit<Income, 'id'>>({
    source: '',
    amount: 0,
    date: '',
  });

  const handleAddIncome = () => {
    if (newIncome.source && newIncome.amount > 0 && newIncome.date) {
      setIncomes([...incomes, { ...newIncome, id: Date.now() }]);
      setNewIncome({ source: '', amount: 0, date: '' });
    }
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Income Tracking</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Income</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Income Source"
            className="p-2 border rounded"
            value={newIncome.source}
            onChange={(e) => setNewIncome({ ...newIncome, source: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="p-2 border rounded"
            value={newIncome.amount || ''}
            onChange={(e) => setNewIncome({ ...newIncome, amount: parseFloat(e.target.value) || 0 })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newIncome.date}
            onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center"
            onClick={handleAddIncome}
          >
            <PlusCircle size={24} className="mr-2" />
            Add Income
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Income List</h2>
        <ul className="space-y-4">
          {incomes.map((income) => (
            <li key={income.id} className="flex justify-between items-center bg-gray-100 p-4 rounded">
              <div>
                <span className="font-semibold">{income.source}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-green-600">${income.amount.toFixed(2)}</span>
                <span className="text-sm text-gray-600">{income.date}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteIncome(income.id)}
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

export default Income;