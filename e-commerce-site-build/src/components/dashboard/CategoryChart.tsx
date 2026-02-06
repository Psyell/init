import { CategoryData } from '@/types';

interface CategoryChartProps {
  data: CategoryData[];
}

export function CategoryChart({ data }: CategoryChartProps) {
  const total = data.reduce((sum: number, item: CategoryData) => sum + item.value, 0);

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6">
      <h3 className="text-white text-sm tracking-[0.2em] mb-6">SALES BY CATEGORY</h3>

      {/* Donut representation with bars */}
      <div className="space-y-4">
        {data.map((item: CategoryData) => (
          <div key={item.name}>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/70">{item.name}</span>
              <span className="text-white">{item.value}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${total > 0 ? (item.value / total) * 100 : 0}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs tracking-[0.15em]">TOTAL PRODUCTS</span>
          <span className="text-white text-lg">{data.reduce((sum, d) => sum + d.value, 0)}</span>
        </div>
      </div>
    </div>
  );
}
