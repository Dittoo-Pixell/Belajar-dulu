// src/pages/Menu-transaction/TransactionPage.tsx

import { Search, Plus, ChevronDown, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { allTransactions } from '../../data/mockData';
import { getCategoryColor } from '../../utils/formatting';


const typeColors: Record<string, string> = {
  'Expense': '#EF4444',
  'Income': '#10B981',
  'Transfer': '#6366F1',
};

export default function TransactionPage() {
  const { openTransactionModal, openDeleteModal } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = allTransactions.filter((tx) =>
    tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleAddTransaction = () => {
    openTransactionModal('add');
  };

  const handleEditTransaction = (tx: typeof allTransactions[0]) => {
    openTransactionModal('edit', tx);
  };

  const handleDeleteTransaction = (tx: typeof allTransactions[0]) => {
    openDeleteModal('transaction', tx);
  };

  return (
    <div className="min-h-screen bg-bg-secondary p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Transactions</h1>
          <p className="text-sm text-text-secondary">Manage and track your organization's financial flow</p>
        </div>
        <button
          onClick={handleAddTransaction}
          className="bg-accent-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-accent-secondary transition flex items-center gap-2"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className="bg-bg-primary border border-border-light rounded-lg p-6 mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase">
              Date Range
            </label>
            <button className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary hover:border-accent-primary transition flex items-center justify-between">
              <span>Last 30 Days</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase">Type</label>
            <button className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary hover:border-accent-primary transition flex items-center justify-between">
              <span>All Types</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase">
              Category
            </label>
            <button className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-text-primary hover:border-accent-primary transition flex items-center justify-between">
              <span>All Categories</span>
              <ChevronDown size={16} />
            </button>
          </div>

          {/* More Filters */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2 uppercase">&nbsp;</label>
            <button className="w-full px-4 py-2 bg-bg-secondary border border-border-light rounded-lg text-sm text-accent-primary hover:bg-accent-light transition">
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-3 top-3 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full pl-10 pr-4 py-2 bg-bg-primary border border-border-light rounded-lg text-sm focus:outline-none focus:border-accent-primary transition"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-bg-primary border border-border-light rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-light bg-bg-secondary">
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">Type</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-text-secondary uppercase">
                Amount
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-text-secondary uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border-light hover:bg-bg-secondary transition">
                <td className="px-6 py-4 text-sm text-text-primary">{tx.date}</td>
                <td className="px-6 py-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getCategoryColor(tx.category) }}
                  >
                    {tx.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">{tx.description}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: typeColors[tx.type as keyof typeof typeColors] }}
                    ></div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: typeColors[tx.type as keyof typeof typeColors] }}
                    >
                      {tx.type === 'expense' ? 'Expense' : tx.type === 'income' ? 'Income' : 'Transfer'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold" style={{ color: typeColors[tx.type as keyof typeof typeColors] }}>
                  {tx.type === 'expense' ? '-' : '+'}IDR {tx.amount.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditTransaction(tx)}
                      className="p-2 hover:bg-bg-tertiary rounded transition text-text-secondary hover:text-accent-primary"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteTransaction(tx)}
                      className="p-2 hover:bg-bg-tertiary rounded transition text-text-secondary hover:text-danger"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-4 bg-bg-secondary border-t border-border-light flex items-center justify-between text-sm text-text-secondary">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}{' '}
            entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-border-light rounded text-text-primary hover:bg-bg-primary transition disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded transition ${
                  page === currentPage
                    ? 'bg-accent-primary text-white'
                    : 'border border-border-light text-text-primary hover:bg-bg-primary'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-border-light rounded text-text-primary hover:bg-bg-primary transition disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}