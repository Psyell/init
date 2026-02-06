import { Order, OrderStatus } from '@/types';
import { cn } from '@/utils/cn';

interface RecentOrdersProps {
  orders: Order[];
  onViewAll: () => void;
}

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  refunded: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export function RecentOrders({ orders, onViewAll }: RecentOrdersProps) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h3 className="text-white text-sm tracking-[0.2em]">RECENT ORDERS</h3>
        <button
          onClick={onViewAll}
          className="text-white/40 text-xs tracking-[0.1em] hover:text-white transition-colors"
        >
          VIEW ALL
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">ORDER</th>
              <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">CUSTOMER</th>
              <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4 hidden sm:table-cell">DATE</th>
              <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">TOTAL</th>
              <th className="text-left text-white/40 text-xs tracking-[0.1em] font-normal px-6 py-4">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-white text-sm">{order.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-white text-sm">{order.customer.name}</p>
                    <p className="text-white/40 text-xs">{order.customer.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-white/60 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white text-sm">${order.total.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-3 py-1 text-xs tracking-wider rounded-full border capitalize",
                    statusColors[order.status]
                  )}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
