import React, { useState } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { BarChart3, TrendingUp, Clock, ShieldAlert, PieChart as PieIcon } from 'lucide-react';

export default function AnalyticsSection({ trends = [] }) {
  const [activeMetric, setActiveMetric] = useState('total');

  // Hourly mock breakdown
  const hourlyData = [
    { hour: '00:00', risk: 85, incidents: 24 },
    { hour: '03:00', risk: 42, incidents: 10 },
    { hour: '06:00', risk: 25, incidents: 8 },
    { hour: '09:00', risk: 38, incidents: 15 },
    { hour: '12:00', risk: 55, incidents: 20 },
    { hour: '15:00', risk: 65, incidents: 28 },
    { hour: '18:00', risk: 78, incidents: 35 },
    { hour: '21:00', risk: 96, incidents: 45 },
  ];

  // Category summary for current month
  const categoryData = [
    { name: 'Cyber Crime', count: 140, color: '#06b6d4' },
    { name: 'Assault', count: 105, color: '#3b82f6' },
    { name: 'Narcotics', count: 78, color: '#f59e0b' },
    { name: 'Armed Robbery', count: 62, color: '#f43f5e' },
    { name: 'Vehicle Theft', count: 58, color: '#a855f7' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-xs font-mono">
          <p className="text-slate-300 font-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: <span className="font-extrabold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>CRIME TELEMETRY & PREDICTIVE ANALYTICS</span>
          </h2>
          <p className="text-xs text-slate-400">
            Multi-vector analysis across districts, incident classifications, and temporal frequency cycles.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveMetric('total')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeMetric === 'total' 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            Total Incident Curve
          </button>
          <button
            onClick={() => setActiveMetric('categories')}
            className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
              activeMetric === 'categories' 
                ? 'bg-cyan-500 text-slate-950 font-bold shadow' 
                : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            Category Comparison
          </button>
        </div>
      </div>

      {/* Grid 2 Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Incident Curve */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-200">Monthly Crime Progression Trend</h3>
            </div>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
              YTD 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {activeMetric === 'total' ? (
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="total" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              ) : (
                <BarChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="cyber" name="Cyber" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="robbery" name="Robbery" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="narcotics" name="Narcotics" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Breakdown Bar */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-slate-200">Incident Distribution by Type</h3>
            </div>
            <span className="text-[10px] font-mono bg-purple-950 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
              JULY 2026
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={categoryData} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                <YAxis type="category" dataKey="name" stroke="#cbd5e1" fontSize={11} width={100} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hourly Risk Distribution Line Chart */}
      <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-slate-200">24-Hour Temporal Crime Density & Predictive Risk Index</h3>
              <p className="text-xs text-slate-400">Peak high-threat window identified between 20:00 and 02:00 UTC</p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2.5 py-1 rounded border border-amber-500/30 font-bold">
            PEAK: 21:00 UTC (96% Risk Index)
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="natural" dataKey="risk" name="AI Predictive Risk Index" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, fill: '#f43f5e' }} />
              <Line type="natural" dataKey="incidents" name="Recorded Incidents" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
