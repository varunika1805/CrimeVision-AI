import React, { useState, useEffect } from 'react';
import { Shield, Search, Bell, AlertTriangle, Plus, Clock, AlertOctagon, FileText } from 'lucide-react';

export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  selectedDistrict, 
  setSelectedDistrict, 
  onOpenNewIncidentModal,
  onToggleAlertsDrawer,
  onOpenEmergencyCommand,
  onOpenExecutiveBrief,
  activeAlertsCount,
  threatLevel = "ELEVATED",
  defconStatus = "KSP DEFCON 3"
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toISOString().replace('T', ' ').substring(0, 19) + ' IST';

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 flex items-center justify-between shadow-lg">
      {/* Brand & System Status */}
      <div className="flex items-center space-x-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-800 shadow-lg shadow-cyan-500/20 text-slate-950">
          <Shield className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-lg md:text-xl tracking-wider text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-cyan-200 to-cyan-400">
              KSP-CRIMEVISION<span className="text-cyan-400 font-mono text-xs ml-1 bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 px-1.5 py-0.5 rounded">AI-v2</span>
            </h1>
          </div>
          <p className="text-[10px] text-cyan-400 font-mono hidden sm:block tracking-widest uppercase">
            Karnataka State Police Decision-Support Platform
          </p>
        </div>

        {/* Threat Level Badge */}
        <div className="hidden lg:flex items-center space-x-2 ml-4 px-3 py-1 rounded-full bg-rose-950/50 border border-rose-600/40 text-rose-300 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-semibold tracking-wide">{defconStatus}</span>
          <span className="text-rose-500">•</span>
          <span className="text-rose-200 text-[11px] font-sans">{threatLevel} THREAT</span>
        </div>
      </div>

      {/* Center Search & District Selector */}
      <div className="hidden md:flex items-center space-x-3 flex-1 max-w-md mx-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search KSP incidents, Hoysala units, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 text-xs text-slate-100 placeholder-slate-500 rounded-lg pl-9 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition font-sans"
          />
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-slate-900 text-xs text-cyan-300 border border-slate-800 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
        >
          <option value="All">All Districts</option>
          <option value="Bengaluru Central">Bengaluru Central</option>
          <option value="Bengaluru East">Bengaluru East</option>
          <option value="Bengaluru West">Bengaluru West</option>
          <option value="Bengaluru South">Bengaluru South</option>
          <option value="Mysuru City">Mysuru City</option>
        </select>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        {/* IST Clock */}
        <div className="hidden xl:flex items-center space-x-1.5 text-xs text-slate-400 font-mono bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{formattedTime}</span>
        </div>

        {/* Emergency Command Mode Trigger */}
        <button
          onClick={onOpenEmergencyCommand}
          className="hidden sm:flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-500 text-slate-950 font-extrabold text-xs px-3 py-2 rounded-lg transition shadow-md shadow-rose-600/30 active:scale-95 cursor-pointer animate-pulse"
          title="Emergency Command Mode"
        >
          <AlertOctagon className="w-4 h-4 stroke-[2.5]" />
          <span>Emergency HUD</span>
        </button>

        {/* Executive Brief Button */}
        <button
          onClick={onOpenExecutiveBrief}
          className="hidden md:flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-bold px-3 py-2 rounded-lg transition cursor-pointer"
          title="Executive Brief Generator"
        >
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>DGP Brief</span>
        </button>

        {/* Log Incident Button */}
        <button
          onClick={onOpenNewIncidentModal}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg transition shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span className="hidden sm:inline">Dispatch Log</span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={onToggleAlertsDrawer}
          className="relative p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
          title="Emergency Alerts"
        >
          <Bell className="w-4 h-4 text-cyan-400" />
          {activeAlertsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {activeAlertsCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold shadow-inner">
            KSP
          </div>
          <div className="hidden lg:block text-left text-xs">
            <p className="font-semibold text-slate-200 leading-tight">ACP S. Vance</p>
            <p className="text-[10px] text-cyan-400 font-mono">KSP Control Room</p>
          </div>
        </div>
      </div>
    </header>
  );
}
