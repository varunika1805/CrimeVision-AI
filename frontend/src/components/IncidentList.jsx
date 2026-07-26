import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  UserCheck, 
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function IncidentList({ incidents = [], onSelectIncident, onOpenNewModal }) {
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = incidents.filter((inc) => {
    if (filterSeverity !== 'All' && inc.severity !== filterSeverity) return false;
    if (filterStatus !== 'All' && inc.status !== filterStatus) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        inc.title.toLowerCase().includes(s) ||
        inc.type.toLowerCase().includes(s) ||
        inc.location.toLowerCase().includes(s) ||
        inc.id.toLowerCase().includes(s)
      );
    }
    return true;
  });

  return (
    <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-100 flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>REAL-TIME INCIDENT LOG DISPATCH FEED</span>
          </h3>
          <p className="text-xs text-slate-400">Live telemetry from precinct officers, 911 calls & acoustic sensor networks</p>
        </div>

        <button
          onClick={onOpenNewModal}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Incident Dispatch</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search incident ID, type or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 text-xs text-slate-100 placeholder-slate-500 rounded-lg pl-8 pr-3 py-1.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          className="bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-slate-950 text-xs text-slate-200 border border-slate-800 rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Investigating">Investigating</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Incident Cards Grid / List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            No incidents found matching the selected filters.
          </div>
        ) : (
          filtered.map((inc) => (
            <div
              key={inc.id}
              onClick={() => onSelectIncident && onSelectIncident(inc)}
              className="p-4 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-3 group"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                    {inc.id}
                  </span>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      inc.severity === 'Critical'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/30'
                        : inc.severity === 'High'
                        ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-950 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {inc.severity.toUpperCase()}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      inc.status === 'Active'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    STATUS: {inc.status.toUpperCase()}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition">
                  {inc.title}
                </h4>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{inc.location} ({inc.district})</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{inc.time_elapsed}</span>
                  </span>
                </div>
              </div>

              {/* Right status info */}
              <div className="flex items-center space-x-4 self-end md:self-center shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">AI RISK SCORE</div>
                  <div className="text-sm font-mono font-bold text-cyan-400">{inc.risk_score}/100</div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-mono">ASSIGNED</div>
                  <div className="text-xs font-mono text-slate-300">{inc.assigned_unit}</div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
