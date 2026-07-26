import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  TrendingUp, 
  Bot, 
  AlertOctagon, 
  FileText, 
  Radio,
  Navigation,
  Calendar,
  HeartHandshake,
  Cpu,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, activeAlertsCount }) {
  const primaryMenuItems = [
    { id: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'map', label: 'Tactical GIS Map', icon: Map, badge: 'Live' },
    { id: 'analytics', label: 'Analytics & Trends', icon: TrendingUp, badge: null },
    { id: 'copilot', label: 'AI Copilot Engine', icon: Bot, badge: 'AI-v2' },
    { id: 'alerts', label: 'Emergency Alerts', icon: AlertOctagon, badge: activeAlertsCount },
    { id: 'reports', label: 'Executive Reports', icon: FileText, badge: null },
  ];

  const decisionSupportItems = [
    { id: 'patrol_routes', label: 'Patrol Route Optimizer', icon: Navigation, badge: 'KSP-AI' },
    { id: 'festival_events', label: 'Event Risk Predictor', icon: Calendar, badge: 'Crowd' },
    { id: 'women_safety', label: 'Women Safety Index', icon: HeartHandshake, badge: '112-Live' },
    { id: 'resource_alloc', label: 'Resource Allocation', icon: Cpu, badge: 'Matrix' },
    { id: 'action_timeline', label: 'Officer 6h Timeline', icon: Clock, badge: 'Shift' },
  ];

  return (
    <aside className="w-64 bg-slate-950/90 border-r border-slate-800/80 flex flex-col justify-between hidden md:flex shrink-0 min-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Navigation Links */}
      <div className="p-3 space-y-5">
        <div>
          <p className="px-3 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-2">
            Command Operations
          </p>
          <nav className="space-y-1">
            {primaryMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/50'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 transition ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                        item.badge === 'Live'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                          : item.badge === 'AI-v2'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                          : 'bg-rose-950 text-rose-400 border border-rose-500/30 animate-pulse'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* KSP Decision Support Sub-modules */}
        <div>
          <p className="px-3 text-[10px] font-mono font-bold tracking-widest text-cyan-500 uppercase mb-2">
            KSP Decision-Support
          </p>
          <nav className="space-y-1">
            {decisionSupportItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/50'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 transition ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-500 group-hover:text-cyan-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-900 text-cyan-400 border border-cyan-500/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tactical Status Card */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center space-x-1 font-mono text-[10px] font-semibold text-cyan-400">
              <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
              <span>KSP 112 GRID ONLINE</span>
            </span>
            <span className="text-[9px] bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded font-mono">99.9%</span>
          </div>

          <p className="text-[10px] text-slate-400 leading-tight">
            Karnataka State Police telemetry streaming real-time data from 142 precinct Hoysala cruisers.
          </p>
        </div>
      </div>

      {/* Footer System Version */}
      <div className="p-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
          <span>KSP v2.4 High-Sec</span>
        </div>
        <span className="text-emerald-400">● Encrypted</span>
      </div>
    </aside>
  );
}
