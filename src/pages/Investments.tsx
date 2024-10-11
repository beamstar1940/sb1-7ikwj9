import React, { useState } from 'react';
import { PlusCircle, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface Investment {
  id: number;
  name: string;
  type: string;
  amount: number;
  currentValue: number;
  purchaseDate: string;
}

const Investments: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([
    { id: 1, name: 'AAPL', type: 'Stock', amount: 10, currentValue: 1500, purchaseDate: '2023-01-15' },
    { id: 2, name: 'VTSAX', type: 'Mutual Fund', amount: 50, currentValue: 5000, purchaseDate: '2023-02-01' },
  ]);

  const [newInvestment, setNewInvestment] = useState<Omit<Investment, 'id' | 'currentValue'>>({
    name: '',
    type: '',
    amount: 0,
    purchaseDate: '',
  });

  const handleAddInvestment = () => {
    if (newInvestment.name && newInvestment.type && newInvestment.amount > 0 && newInvestment.purchaseDate) {
      setInvestments([...investments, { ...newInvestment, id: Date.now(), currentValue: newInvestment.amount }]);
      setNewInvestment({ name: '', type: '', amount: 0, purchaseDate: '' });
    }
  };

  const handleDeleteInvestment = (id: number) => {
    setInvestments(investments.filter((investment) => investment.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Investment Tracking</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Investment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <input
            type="text"
            placeholder="Investment Name"
            className="p-2 border rounded"
            value={newInvestment.name}
            onChange={(e) => setNewInvestment({ ...newInvestment, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Type (e.g., Stock, Mutual Fund)"
            className="p-2 border rounded"
            value={newInvestment.type}
            onChange={(e) => setNewInvestment({ ...newInvestment, type: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount Invested"
            className="p-2 border rounded"
            value={newInvestment.amount || ''}
            onChange={(e) => setNewInvestment({ ...newInvestment, amount: parseFloat(e.target.value) || 0 })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            value={newInvestment.purchaseDate}
            onChange={(e) => setNewInvestment({ ...newInvestment, purchaseDate: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center"
            onClick={handleAddInvestment}
          >
            <PlusCircle size={24} className="mr-2" />
            Add Investment
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Investment Portfolio</h2>
        <ul className="space-y-4">
          {investments.map((investment) => (
            <li key={investment.id} className="bg-gray-100 p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{investment.name}</span>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteInvestment(investment.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span>Type: {investment.type}</span>
                <span>Purchase Date: {investment.purchaseDate}</span>
                <span>Amount Invested: ${investment.amount.toFixed(2)}</span>
                <span>Current Value: ${investment.currentValue.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center">
                <span className="mr-2">Return:</span>
                {investment.currentValue > investment.amount ? (
                  <span className="text-green-600 flex items-center">
                    <TrendingUp size={16} className="mr-1" />
                    {((investment.currentValue - investment.amount) / investment.amount * 100).toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <TrendingDown size={16} className="mr-1" />
                    {((investment.amount - investment.currentValue) / investment.amount * 100).toFixed(2)}%
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Investments;