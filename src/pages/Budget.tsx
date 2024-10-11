import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface BudgetCategory {
  id: number;
  name: string;
  amount: number;
}

const Budget: React.FC = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { id: 1, name: 'Housing', amount: 1000 },
    { id: 2, name: 'Transportation', amount: 300 },
    { id: 3, name: 'Food', amount: 500 },
    { id: 4, name: 'Entertainment', amount: 200 },
  ]);

  const [newCategory, setNewCategory] = useState({ name: '', amount: 0 });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.amount > 0) {
      setCategories([...categories, { ...newCategory, id: Date.now() }]);
      setNewCategory({ name: '', amount: 0 });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Budget</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Budget Categories</h2>
        <ul className="space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="flex justify-between items-center">
              <span>{category.name}</span>
              <span className="font-semibold">${category.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add New Category</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Category Name"
              className="flex-grow p-2 border rounded"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="w-32 p-2 border rounded"
              value={newCategory.amount || ''}
              onChange={(e) => setNewCategory({ ...newCategory, amount: parseFloat(e.target.value) || 0 })}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddCategory}
            >
              <PlusCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;