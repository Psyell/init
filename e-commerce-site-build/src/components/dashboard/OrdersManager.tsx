import { useState } from 'react';
import { Order, OrderStatus } from '@/types';
import { cn } from '@/utils/cn';

interface OrdersManagerProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  refunded: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

export function OrdersManager({ orders, onUpdateStatus }: OrdersManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-white text-xl tracking-[0.2em] font-light">ORDERS</h2>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-sm">{filteredOrders.length} orders</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/40 rounded"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
        >
          <option value="ALL">All Status</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/30">
                <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">ORDER ID</th>
                <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">CUSTOMER</th>
                <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4 hidden md:table-cell">DATE</th>
                <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">TOTAL</th>
                <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">STATUS</th>
                <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-white text-sm font-mono">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm">{order.customer.name}</p>
                      <p className="text-white/40 text-xs">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-white/60 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white text-sm">${order.total.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded border bg-transparent focus:outline-none cursor-pointer",
                        statusColors[order.status]
                      )}
                    >
                      {statuses.map(status => (
                        <option key={status} value={status} className="bg-zinc-900 text-white">
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-white/40 hover:text-white text-xs tracking-[0.1em] transition-colors"
                    >
                      VIEW
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-lg w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-white text-lg tracking-[0.2em]">ORDER {selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <p className="text-white/40 text-xs tracking-[0.15em] mb-2">CUSTOMER</p>
                <p className="text-white">{selectedOrder.customer.name}</p>
                <p className="text-white/60 text-sm">{selectedOrder.customer.email}</p>
              </div>

              {/* Address */}
              <div>
                <p className="text-white/40 text-xs tracking-[0.15em] mb-2">SHIPPING ADDRESS</p>
                <p className="text-white">
                  {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}
                </p>
              </div>

              {/* Items */}
              <div>
                <p className="text-white/40 text-xs tracking-[0.15em] mb-3">ITEMS</p>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-black/30 p-3 rounded">
                      <div>
                        <p className="text-white text-sm">{item.name}</p>
                        <p className="text-white/40 text-xs">Qty: {item.quantity} | Size: {item.size}</p>
                      </div>
                      <p className="text-white">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-white/60">Total</span>
                <span className="text-white text-xl">${selectedOrder.total.toLocaleString()}</span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-white/60">Status</span>
                <span className={cn(
                  "px-3 py-1 text-xs rounded-full border capitalize",
                  statusColors[selectedOrder.status]
                )}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="p-6 border-t border-white/10">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-white text-black py-3 text-sm tracking-[0.2em] hover:bg-gray-100 transition-colors rounded"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
