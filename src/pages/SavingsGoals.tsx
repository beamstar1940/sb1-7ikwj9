import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

const SavingsGoals: React.FC = () => {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    { id: 1, name: 'Emergency Fund', targetAmount: 10000, currentAmount: 5000, targetDate: '2023-12-31' },
    { id: 2, name: 'Vacation', targetAmount: 5000, currentAmount: 2000, targetDate: '2023-08-15' },
  ]);

  const [newGoal, setNewGoal] = useState<Omit<SavingsGoal, 'id' | 'currentAmount'>>({
    name: '',
    targetAmount: 0,
    targetDate: '',
  });

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount > 0 && newGoal.targetDate) {
      setGoals([...goals, { ...newGoal, id: Date.now(), currentAmount: 0 }]);
      setNewGoal({ name: '', targetAmount: 0, targetDate: '' });
    }
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Savings Goals</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Savings Goal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="Goal Name"
            className="p-2 border rounded"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Target Amount"
            className="p-2 border rounded"
            value={newGoal.targetAmount || ''}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) || 0 })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newGoal.targetDate}
            onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
          />
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center justify-center"
            onClick={handleAddGoal}
          >
            <PlusCircle size={24} className="mr-2" />
            Add Goal
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Savings Goals</h2>
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal.id} className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{goal.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>Target: ${goal.targetAmount.toFixed(2)}</span>
                <span>Current: ${goal.currentAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Target Date: {goal.targetDate}</span>
                <span className="text-sm text-gray-600">
                  {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}% complete
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavingsGoals;