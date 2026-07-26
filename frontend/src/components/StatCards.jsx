import React from 'react';
import {
  ShieldAlert,
  FolderCheck,
  MapPin,
  Cpu,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Activity
} from 'lucide-react';

export default function StatCards({ stats }) {
  if (!stats) return null;

  const cardData = [
    {
      id: 'total_crimes',
      title: 'Total Crimes Recorded',
      value: stats.total_crimes?.toLocaleString() || '1,428',
      change: stats.crimes_change_pct,
      changeText: 'vs last 30 days',
      isGood: stats.crimes_change_pct <= 0,
      icon: ShieldAlert,
      gradient: 'from-cyan-500/20 to-blue-600/10',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
      shadow: 'shadow-cyan-500/10'
    },
    {
      id: 'active_cases',
      title: 'Active Police Cases',
      value: stats.active_cases || '87',
      change: stats.active_cases_change_pct,
      changeText: 'under active investigation',
      isGood: false,
      icon: Activity,
      gradient: 'from-amber-500/20 to-orange-600/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      shadow: 'shadow-amber-500/10'
    },
    {
      id: 'hotspots',
      title: 'High-Risk Spatial Hotspots',
      value: stats.hotspots_count || '14',
      change: stats.hotspots_change_pct,
      changeText: 'monitored sectors',
      isGood: stats.hotspots_change_pct <= 0,
      icon: MapPin,
      gradient: 'from-rose-500/20 to-pink-600/10',
      borderColor: 'border-rose-500/30',
      iconColor: 'text-rose-400',
      shadow: 'shadow-rose-500/10'
    },
    {
      id: 'ai_alerts',
      title: 'AI Alerts Triggered',
      value: stats.ai_alerts_count || '9',
      change: stats.ai_alerts_change_pct,
      changeText: 'predictive anomalies',
      isGood: false,
      icon: Cpu,
      gradient: 'from-purple-500/20 to-indigo-600/10',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      shadow: 'shadow-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cardData.map((card) => {
        const Icon = card.icon;
        const isUp = card.change > 0;
        return (
          <div
            key={card.id}
            className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${card.gradient} border ${card.borderColor} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${card.shadow}`}
          >
            {/* Header row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 ${card.iconColor}`}>
                <Icon className="w-5 h-5 stroke-[2]" />
              </div>
            </div>

            {/* Metric Value */}
            <div className="mt-3 flex items-baseline justify-between">
              <h2 className="text-3xl font-extrabold font-mono tracking-tight text-slate-100">
                {card.value}
              </h2>

              <div
                className={`flex items-center space-x-1 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${card.isGood
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                  }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3 text-rose-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-emerald-400" />
                )}
                <span>{isUp ? `+${card.change}%` : `${card.change}%`}</span>
              </div>
            </div>

            {/* Description note */}
            <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>{card.changeText}</span>
              <span className="text-[10px] text-slate-500 font-mono">LIVE SYNC</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
