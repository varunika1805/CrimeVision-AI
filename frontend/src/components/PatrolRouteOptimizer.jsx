import React, { useState } from 'react';
import { Navigation, Compass, Shield, Car, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function PatrolRouteOptimizer({ routes = [], onDispatchRoute }) {
  const [activeRouteId, setActiveRouteId] = useState(routes[0]?.id || 'ROUTE-01');
  const [dispatchedRoutes, setDispatchedRoutes] = useState({});

  const handleDispatch = (routeId) => {
    setDispatchedRoutes((prev) => ({ ...prev, [routeId]: true }));
    if (onDispatchRoute) onDispatchRoute(routeId);
  };

  const activeRoute = routes.find((r) => r.id === activeRouteId) || routes[0];

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
      {/* Panel Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-950">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center space-x-2">
              <span>AI PATROL ROUTE OPTIMIZER</span>
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40 px-2 py-0.5 rounded">
                KSP HOYSALA DYNAMIC GPS
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Real-time route calculation based on predicted hotspot clusters, live traffic, and available police cruisers.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span>Active Hoysalas: 142 Units</span>
        </div>
      </div>

      {/* Main Grid: Route List (left) + Selected Route Intelligence (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Route Selector Column */}
        <div className="space-y-3">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Optimized Patrol Corridors ({routes.length})
          </p>
          {routes.map((route) => {
            const isSelected = route.id === activeRouteId;
            const isDispatched = dispatchedRoutes[route.id];

            return (
              <div
                key={route.id}
                onClick={() => setActiveRouteId(route.id)}
                className={`p-3.5 rounded-xl border transition cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                    {route.unit_id}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      route.safety_impact === 'CRITICAL'
                        ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {route.safety_impact} IMPACT
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{route.route_name}</h4>
                <p className="text-xs text-slate-400 font-mono">{route.district}</p>

                <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono pt-1">
                  <span>{route.total_distance} • {route.est_duration}</span>
                  {isDispatched ? (
                    <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>DISPATCHED</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 underline">View Plan →</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Route Breakdown */}
        {activeRoute && (
          <div className="lg:col-span-2 bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  ROUTE CODE: {activeRoute.id} | UNIT: {activeRoute.unit_id}
                </span>
                <h3 className="text-lg font-extrabold text-slate-100">{activeRoute.route_name}</h3>
              </div>

              <button
                onClick={() => handleDispatch(activeRoute.id)}
                disabled={dispatchedRoutes[activeRoute.id]}
                className={`flex items-center space-x-2 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer ${
                  dispatchedRoutes[activeRoute.id]
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 active:scale-95'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>{dispatchedRoutes[activeRoute.id] ? 'PATROL DISPATCH ACTIVE' : 'DISPATCH THIS PATROL ROUTE'}</span>
              </button>
            </div>

            {/* Waypoints Sequence Timeline */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase">
                Optimized Waypoint Routing Sequence
              </label>
              <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                {activeRoute.waypoints.map((wp, idx) => (
                  <React.Fragment key={idx}>
                    <span className="bg-slate-900 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center space-x-1">
                      <span className="text-cyan-400 font-bold">#{idx + 1}</span>
                      <span>{wp}</span>
                    </span>
                    {idx < activeRoute.waypoints.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Key Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">TRAFFIC CONDITION</span>
                <span className="font-bold text-amber-400">{activeRoute.traffic_condition}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">TOTAL DISTANCE</span>
                <span className="font-bold text-slate-200">{activeRoute.total_distance}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">ESTIMATED TIME</span>
                <span className="font-bold text-cyan-400">{activeRoute.est_duration}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500 block text-[10px]">RISK MITIGATION</span>
                <span className="font-bold text-emerald-400">{activeRoute.coverage_risk_reduction}</span>
              </div>
            </div>

            {/* Hotspots Covered & Officers Assigned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-slate-400 text-[11px] block">PREDICTED HOTSPOTS COVERED</span>
                <ul className="space-y-1 font-mono text-slate-300">
                  {activeRoute.predicted_hotspots.map((hs, i) => (
                    <li key={i} className="flex items-center space-x-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      <span>{hs}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="font-mono text-slate-400 text-[11px] block">CREW & VEHICLE SPECIFICATIONS</span>
                <p className="text-slate-300 font-mono">
                  Assigned Officers: <strong className="text-cyan-300">{activeRoute.assigned_officers} Officers</strong>
                </p>
                <p className="text-slate-400 text-[11px] italic">
                  Equipped with ANPR camera, Namma 112 radio link, and first-responder medical kit.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
