import { cn } from '@/utils/cn';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  prefix?: string;
}

export function StatsCard({ title, value, change, icon, prefix = '' }: StatsCardProps) {
  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
          </svg>
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-xs px-2 py-1 rounded",
            change >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
          )}>
            <svg className={cn("w-3 h-3", change < 0 && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-white/40 text-xs tracking-[0.2em] mb-2">{title}</p>
      <p className="text-white text-2xl sm:text-3xl font-light tracking-wide">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );
}
