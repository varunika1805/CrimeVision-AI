import React from 'react';
import { AlertOctagon, BellRing, ShieldAlert, Check, Radio, Volume2 } from 'lucide-react';

export default function EmergencyAlerts({ alerts = [], onDismissAlert }) {
  return (
    <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/30 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-rose-950 text-rose-400 border border-rose-500/40 animate-pulse">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-mono">EMERGENCY PRIORITY BROADCAST FEED</h3>
            <p className="text-xs text-slate-400">Automated acoustic sensors, SCADA telemetry & predictive surge warnings</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-rose-400 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-500/30">
          <Volume2 className="w-3.5 h-3.5 animate-bounce text-rose-400" />
          <span>AUDIO BEACON ACTIVE</span>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500 font-mono">
            No active emergency alerts. All clear on primary dispatch frequencies.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-950 border border-rose-500/40 space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono font-bold bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40">
                    {alert.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{alert.timestamp}</span>
                </div>

                <span className="text-[10px] font-mono font-bold text-rose-400 px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30">
                  {alert.severity}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-100">{alert.title}</h4>
              <p className="text-xs text-rose-200">{alert.message}</p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Location: {alert.location}</span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onDismissAlert && onDismissAlert(alert.id)}
                    className="flex items-center space-x-1 bg-rose-600 hover:bg-rose-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-lg transition cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Acknowledge</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
