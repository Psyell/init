import { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
  status: 'active' | 'inactive';
}

const mockCustomers: Customer[] = [
  { id: 1, name: 'Alexander Chen', email: 'alex.chen@email.com', orders: 12, spent: 15890, lastOrder: '2024-01-15', status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria.s@email.com', orders: 8, spent: 9450, lastOrder: '2024-01-14', status: 'active' },
  { id: 3, name: 'James Wilson', email: 'j.wilson@email.com', orders: 5, spent: 6780, lastOrder: '2024-01-13', status: 'active' },
  { id: 4, name: 'Sophie Laurent', email: 'sophie.l@email.com', orders: 3, spent: 4200, lastOrder: '2024-01-10', status: 'active' },
  { id: 5, name: 'Yuki Tanaka', email: 'yuki.t@email.com', orders: 15, spent: 22340, lastOrder: '2024-01-14', status: 'active' },
  { id: 6, name: 'Emma Brown', email: 'emma.b@email.com', orders: 2, spent: 1890, lastOrder: '2024-01-05', status: 'inactive' },
  { id: 7, name: 'Lucas Kim', email: 'lucas.k@email.com', orders: 7, spent: 8900, lastOrder: '2024-01-12', status: 'active' },
  { id: 8, name: 'Olivia Johnson', email: 'olivia.j@email.com', orders: 4, spent: 5670, lastOrder: '2024-01-08', status: 'active' },
];

export function CustomersView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = mockCustomers.length;
  const activeCustomers = mockCustomers.filter(c => c.status === 'active').length;
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.spent, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-white text-xl tracking-[0.2em] font-light">CUSTOMERS</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-1">TOTAL CUSTOMERS</p>
          <p className="text-white text-2xl">{totalCustomers}</p>
        </div>
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-1">ACTIVE</p>
          <p className="text-white text-2xl">{activeCustomers}</p>
        </div>
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-4">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-1">TOTAL REVENUE</p>
          <p className="text-white text-2xl">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 bg-black border border-white/20 text-white px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 rounded"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-white text-lg">{customer.name.charAt(0)}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded ${
                customer.status === 'active' 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-gray-500/10 text-gray-400'
              }`}>
                {customer.status}
              </span>
            </div>

            <h3 className="text-white text-sm mb-1">{customer.name}</h3>
            <p className="text-white/40 text-xs mb-4">{customer.email}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-white/40 text-xs mb-1">Orders</p>
                <p className="text-white">{customer.orders}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Spent</p>
                <p className="text-white">${customer.spent.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/30 text-xs">Last order: {customer.lastOrder}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
