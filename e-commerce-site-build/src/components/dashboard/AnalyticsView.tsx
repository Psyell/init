import { useState, useEffect } from 'react';
import { RevenueData, CategoryData } from '@/types';
import { dashboardApi } from '@/services/api';

interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: number;
}

export function AnalyticsView() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revenue, category, products] = await Promise.all([
          dashboardApi.getRevenueData(),
          dashboardApi.getCategoryData(),
          dashboardApi.getTopProducts(),
        ]);
        setRevenueData(revenue.data);
        setCategoryData(category.data);
        setTopProducts(products.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const maxRevenue = Math.max(...revenueData.map((d: RevenueData) => d.revenue), 1);
  const totalRevenue = revenueData.reduce((sum: number, d: RevenueData) => sum + d.revenue, 0);
  const avgRevenue = revenueData.length > 0 ? totalRevenue / revenueData.length : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white/40">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-white text-xl tracking-[0.2em] font-light">ANALYTICS</h2>
        <select className="bg-black border border-white/20 text-white px-4 py-2 text-sm focus:outline-none focus:border-white/40 rounded">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 30 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-2">TOTAL REVENUE</p>
          <p className="text-white text-2xl mb-2">${totalRevenue.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            18.2% vs last year
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-2">AVERAGE MONTHLY</p>
          <p className="text-white text-2xl mb-2">${Math.round(avgRevenue).toLocaleString()}</p>
          <p className="text-white/30 text-xs">Based on 12 months</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-2">CONVERSION RATE</p>
          <p className="text-white text-2xl mb-2">3.2%</p>
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            0.5% vs last month
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <p className="text-white/40 text-xs tracking-[0.15em] mb-2">AVG ORDER VALUE</p>
          <p className="text-white text-2xl mb-2">$453</p>
          <div className="flex items-center gap-1 text-red-400 text-xs">
            <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            2.1% vs last month
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <h3 className="text-white text-sm tracking-[0.2em] mb-6">MONTHLY REVENUE</h3>
          <div className="h-72 flex items-end justify-between gap-2">
            {revenueData.map((item: RevenueData, index: number) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 transition-colors rounded-t relative group"
                  style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${item.revenue.toLocaleString()}
                  </div>
                  {index === revenueData.length - 1 && (
                    <div className="absolute inset-0 bg-white/20 rounded-t"></div>
                  )}
                </div>
                <span className="text-white/40 text-xs">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
          <h3 className="text-white text-sm tracking-[0.2em] mb-6">CATEGORY DISTRIBUTION</h3>
          <div className="space-y-4">
            {categoryData.map((item: CategoryData) => (
              <div key={item.name}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/70">{item.name}</span>
                  <span className="text-white">{item.value}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="mt-6 bg-zinc-900/50 border border-white/10 rounded-lg p-6">
        <h3 className="text-white text-sm tracking-[0.2em] mb-6">TOP SELLING PRODUCTS</h3>
        <div className="space-y-4">
          {topProducts.map((product: TopProduct, index: number) => (
            <div key={product.id} className="flex items-center gap-4">
              <span className="text-white/30 text-sm w-6">{index + 1}</span>
              <div className="flex-1">
                <p className="text-white text-sm">{product.name}</p>
                <p className="text-white/40 text-xs">{product.sales} sales</p>
              </div>
              <p className="text-white">${product.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
