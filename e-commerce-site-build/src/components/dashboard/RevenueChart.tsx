import { RevenueData } from '@/types';

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-sm tracking-[0.2em]">REVENUE OVERVIEW</h3>
        <select className="bg-black border border-white/20 text-white text-xs px-3 py-2 rounded focus:outline-none focus:border-white/40">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 30 days</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((item, index) => (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-white/10 hover:bg-white/20 transition-colors rounded-t relative group"
              style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                ${item.revenue.toLocaleString()}
              </div>
              
              {/* Highlight current month */}
              {index === data.length - 1 && (
                <div className="absolute inset-0 bg-white/30 rounded-t"></div>
              )}
            </div>
            <span className="text-white/40 text-xs">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
