import React, { useState } from 'react';
import { X, ShieldAlert, Plus, MapPin, AlertTriangle, Send } from 'lucide-react';

export default function NewIncidentModal({ isOpen, onClose, onSubmitIncident }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Armed Robbery',
    location: '',
    district: 'Downtown Commercial',
    latitude: 40.7128,
    longitude: -74.0060,
    severity: 'High',
    status: 'Active',
    assigned_unit: 'Unit Alpha-14',
    risk_score: 85.0,
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location) return;
    onSubmitIncident(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 font-sans text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono text-slate-100">DISPATCH NEW INCIDENT ENTRY</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Incident Title / Brief</label>
            <input
              type="text"
              required
              placeholder="e.g. Armed Robbery at Bank Vault 4"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Incident Category</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Armed Robbery">Armed Robbery</option>
                <option value="Cyber Crime">Cyber Crime</option>
                <option value="Narcotics">Narcotics</option>
                <option value="Vehicle Theft">Vehicle Theft</option>
                <option value="Gang Activity">Gang Activity</option>
                <option value="Assault">Assault</option>
                <option value="Burglary">Burglary</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">District Zone</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Downtown Commercial">Downtown Commercial</option>
                <option value="Tech Hub East">Tech Hub East</option>
                <option value="Harbor Industrial">Harbor Industrial</option>
                <option value="South District">South District</option>
                <option value="Metro Transit">Metro Transit</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Location Address / Coordinates</label>
            <input
              type="text"
              required
              placeholder="e.g. 14th Street Alleyway, Sector 2"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Severity Level</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Assigned Patrol Unit</label>
              <input
                type="text"
                value={formData.assigned_unit}
                onChange={(e) => setFormData({ ...formData, assigned_unit: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Detailed Description & Tactical Notes</label>
            <textarea
              rows={3}
              placeholder="Enter suspect description, weapon status, officer notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              Broadcast Dispatch Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
