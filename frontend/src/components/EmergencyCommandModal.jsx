import React from 'react';
import { ShieldAlert, X, PhoneCall, Building, Ambulance, Signpost, Radio, AlertOctagon, CheckCircle } from 'lucide-react';

export default function EmergencyCommandModal({ incident = null, isOpen, onClose }) {
  if (!isOpen || !incident) return null;

  const policeStations = incident.nearest_ps || [
    { name: "Cubbon Park Police Station", distance: "0.8 km", contact: "080-22942526" },
    { name: "Commercial Street PS", distance: "1.1 km", contact: "080-22942527" },
    { name: "High Grounds PS", distance: "2.3 km", contact: "080-22942528" }
  ];

  const hospitals = incident.nearest_hospitals || [
    { name: "Bowring & Lady Curzon Hospital", distance: "1.1 km", beds: "14 ICU Emergency" },
    { name: "Mallya Hospital", distance: "1.8 km", beds: "8 Trauma Units" }
  ];

  const diversion = incident.diversion_routes || "Divert inbound traffic from Kamaraj Road towards MG Road via Infantry Road. Establish KSP Barricade at Brigade Road junction.";

  return (
    <div className="fixed inset-0 z-[1100] bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-slate-950 border-2 border-rose-500 rounded-3xl max-w-3xl w-full p-6 shadow-2xl space-y-5 font-sans text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Emergency HUD Bar */}
        <div className="flex items-center justify-between border-b border-rose-500/40 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-rose-950 text-rose-400 border border-rose-500/60 animate-ping">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-extrabold bg-rose-950 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded">
                  EMERGENCY COMMAND MODE
                </span>
                <span className="text-xs font-mono text-slate-400 font-bold">INCIDENT ID: {incident.id}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-100 mt-0.5">{incident.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Incident Summary Card */}
        <div className="bg-gradient-to-r from-rose-950/50 via-slate-900 to-slate-950 p-4 rounded-2xl border border-rose-500/40 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-slate-300">Location: <strong className="text-slate-100">{incident.location} ({incident.district})</strong></span>
            <span className="text-rose-400 font-bold">CRITICAL SEVERITY • RISK SCORE: {incident.risk_score}/100</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {incident.description}
          </p>
        </div>

        {/* 3-Column Tactical Command Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Nearest Police Stations */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center space-x-1.5 border-b border-slate-800 pb-2">
              <Building className="w-4 h-4 text-cyan-400" />
              <span>NEAREST POLICE STATIONS</span>
            </span>

            <div className="space-y-2.5">
              {policeStations.map((ps, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{ps.name}</span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-1.5 py-0.5 rounded">{ps.distance}</span>
                  </div>
                  <a
                    href={`tel:${ps.contact}`}
                    className="inline-flex items-center space-x-1 text-[11px] font-mono text-emerald-400 hover:underline"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>{ps.contact}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Nearest Emergency Hospitals */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center space-x-1.5 border-b border-slate-800 pb-2">
              <Ambulance className="w-4 h-4 text-rose-400" />
              <span>EMERGENCY HOSPITALS</span>
            </span>

            <div className="space-y-2.5">
              {hospitals.map((hosp, idx) => (
                <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{hosp.name}</span>
                    <span className="text-[10px] font-mono text-rose-300 bg-rose-950 px-1.5 py-0.5 rounded">{hosp.distance}</span>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 block">{hosp.beds}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Traffic Diversion Routes */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center space-x-1.5 border-b border-slate-800 pb-2">
              <Signpost className="w-4 h-4 text-amber-400" />
              <span>TRAFFIC DIVERSION PLAN</span>
            </span>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2 font-mono">
              <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                {diversion}
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center space-x-1 text-[10px] text-amber-400">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>KSP Traffic Radio Frequency Broadcast Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Emergency Actions */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-rose-400">
            <Radio className="w-4 h-4 animate-bounce text-rose-500" />
            <span>GARUDA COUNTER-TERROR & HOYSALA 112 UNITS NOTIFIED</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
            >
              Close Emergency Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
