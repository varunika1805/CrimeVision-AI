import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatCards from './components/StatCards';
import CrimeMap from './components/CrimeMap';
import AnalyticsSection from './components/AnalyticsSection';
import AICopilotPanel from './components/AICopilotPanel';
import IncidentList from './components/IncidentList';
import EmergencyAlerts from './components/EmergencyAlerts';
import NewIncidentModal from './components/NewIncidentModal';
import IncidentDetailModal from './components/IncidentDetailModal';
import ReportGeneratorModal from './components/ReportGeneratorModal';

// KSP Decision-Support Components
import PatrolRouteOptimizer from './components/PatrolRouteOptimizer';
import FestivalEventPredictor from './components/FestivalEventPredictor';
import WomenSafetyIndex from './components/WomenSafetyIndex';
import ResourceAllocationPanel from './components/ResourceAllocationPanel';
import ExplainableAIPanel from './components/ExplainableAIPanel';
import OfficerActionTimeline from './components/OfficerActionTimeline';
import EmergencyCommandModal from './components/EmergencyCommandModal';
import ExecutiveBriefModal from './components/ExecutiveBriefModal';

import { api } from './services/api';
import { Shield, Layers, FileText, AlertOctagon } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Core Data states
  const [stats, setStats] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [trends, setTrends] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // KSP Decision-Support Data states
  const [patrolRoutes, setPatrolRoutes] = useState([]);
  const [festivalRisks, setFestivalRisks] = useState([]);
  const [womenSafetyAreas, setWomenSafetyAreas] = useState([]);
  const [explainableAIFactors, setExplainableAIFactors] = useState(null);
  const [actionTimeline, setActionTimeline] = useState([]);
  const [executiveBrief, setExecutiveBrief] = useState(null);

  const [loading, setLoading] = useState(true);

  // Modal states
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isExecutiveBriefOpen, setIsExecutiveBriefOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  const [selectedIncident, setSelectedIncident] = useState(null);
  const [emergencyIncident, setEmergencyIncident] = useState(null);

  // Initial load from FastAPI backend
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        sData, aData, iData, tData, hData, rData,
        pRoutes, fRisks, wSafety, xaiFactors, aTimeline, eBrief
      ] = await Promise.all([
        api.getStats(),
        api.getAlerts(),
        api.getIncidents({ district: selectedDistrict, search: searchQuery }),
        api.getTrends(),
        api.getHotspots(),
        api.getRecommendations(),
        api.getPatrolRoutes(),
        api.getFestivalRisks(),
        api.getWomenSafetyIndex(),
        api.getExplainableAIFactors(),
        api.getOfficerActionTimeline(),
        api.getExecutiveBrief()
      ]);

      setStats(sData);
      setAlerts(aData);
      setIncidents(iData);
      setTrends(tData);
      setHotspots(hData);
      setRecommendations(rData);

      setPatrolRoutes(pRoutes);
      setFestivalRisks(fRisks);
      setWomenSafetyAreas(wSafety);
      setExplainableAIFactors(xaiFactors);
      setActionTimeline(aTimeline);
      setExecutiveBrief(eBrief);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [selectedDistrict]);

  // Handle new incident dispatch creation
  const handleCreateIncident = async (newIncidentData) => {
    const created = await api.createIncident(newIncidentData);
    setIncidents((prev) => [created, ...prev]);
    setStats((prev) => (prev ? { ...prev, active_cases: prev.active_cases + 1 } : null));
  };

  // Update incident status
  const handleUpdateStatus = (id, newStatus) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status: newStatus } : inc))
    );
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Dismiss emergency alert
  const handleDismissAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    setStats((prev) => (prev ? { ...prev, ai_alerts_count: Math.max(0, prev.ai_alerts_count - 1) } : null));
  };

  // Trigger Emergency Command Mode for an incident
  const handleTriggerEmergencyCommand = (inc) => {
    const targetIncident = inc || incidents.find((i) => i.severity === 'Critical') || incidents[0];
    setEmergencyIncident(targetIncident);
    setIsEmergencyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Tactical Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        onOpenNewIncidentModal={() => setIsNewModalOpen(true)}
        onToggleAlertsDrawer={() => setActiveTab('alerts')}
        onOpenEmergencyCommand={() => handleTriggerEmergencyCommand(null)}
        onOpenExecutiveBrief={() => setIsExecutiveBriefOpen(true)}
        activeAlertsCount={alerts.length}
        threatLevel={stats?.threat_level}
        defconStatus={stats?.defcon_status}
      />

      {/* Main Body Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeAlertsCount={alerts.length}
        />

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-grid-pattern">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 space-y-4 font-mono">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-cyan-400 text-sm font-bold animate-pulse">
                CONNECTING TO KARNATAKA STATE POLICE AI BACKEND...
              </p>
            </div>
          ) : (
            <>
              {/* Tab 1: COMMAND DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* KPI Stat Cards */}
                  <StatCards stats={stats} />

                  {/* Main Grid: Interactive GIS Map (left) + Emergency Alerts & Control Timeline (right) */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <CrimeMap
                        incidents={incidents}
                        hotspots={hotspots}
                        womenSafetyAreas={womenSafetyAreas}
                        onSelectIncident={setSelectedIncident}
                        onOpenEmergencyMode={handleTriggerEmergencyCommand}
                      />
                    </div>

                    <div className="space-y-6">
                      <EmergencyAlerts
                        alerts={alerts}
                        onDismissAlert={handleDismissAlert}
                      />
                    </div>
                  </div>

                  {/* 6-Hour Officer Action Timeline */}
                  <OfficerActionTimeline timelineItems={actionTimeline} />

                  {/* Explainable AI Risk Reasoning Panel */}
                  <ExplainableAIPanel factorsData={explainableAIFactors} />

                  {/* Crime Telemetry Trends Section */}
                  <AnalyticsSection trends={trends} />

                  {/* Incidents Table / Cards Feed */}
                  <IncidentList
                    incidents={incidents}
                    onSelectIncident={setSelectedIncident}
                    onOpenNewModal={() => setIsNewModalOpen(true)}
                  />
                </div>
              )}

              {/* Tab 2: TACTICAL CRIME MAP */}
              {activeTab === 'map' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <h2 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                        <Layers className="w-5 h-5 text-cyan-400" />
                        <span>FULLSCREEN KARNATAKA GIS TACTICAL MAP</span>
                      </h2>
                      <p className="text-xs text-slate-400">
                        Spatial precinct intelligence, hotspot density & Women Safety Heat overlays
                      </p>
                    </div>
                    <button
                      onClick={() => setIsNewModalOpen(true)}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition cursor-pointer"
                    >
                      + Log New Map Marker
                    </button>
                  </div>

                  <CrimeMap
                    incidents={incidents}
                    hotspots={hotspots}
                    womenSafetyAreas={womenSafetyAreas}
                    onSelectIncident={setSelectedIncident}
                    onOpenEmergencyMode={handleTriggerEmergencyCommand}
                  />

                  <IncidentList
                    incidents={incidents}
                    onSelectIncident={setSelectedIncident}
                    onOpenNewModal={() => setIsNewModalOpen(true)}
                  />
                </div>
              )}

              {/* Tab 3: ANALYTICS & TRENDS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <AnalyticsSection trends={trends} />
                  <ExplainableAIPanel factorsData={explainableAIFactors} />
                </div>
              )}

              {/* Tab 4: AI COPILOT ENGINE */}
              {activeTab === 'copilot' && (
                <div className="space-y-6">
                  <AICopilotPanel
                    recommendations={recommendations}
                    selectedDistrict={selectedDistrict}
                  />
                  <ExplainableAIPanel factorsData={explainableAIFactors} />
                </div>
              )}

              {/* Tab 5: EMERGENCY ALERTS */}
              {activeTab === 'alerts' && (
                <div className="space-y-6">
                  <EmergencyAlerts
                    alerts={alerts}
                    onDismissAlert={handleDismissAlert}
                  />
                  <IncidentList
                    incidents={incidents}
                    onSelectIncident={setSelectedIncident}
                    onOpenNewModal={() => setIsNewModalOpen(true)}
                  />
                </div>
              )}

              {/* Tab 6: EXECUTIVE REPORTS */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-950 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/30">
                      <Shield className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-100">
                      Karnataka State Police Senior Command Reports
                    </h2>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Generate executive briefs, precinct statistics, and predictive deployment summaries for DGP and CP review.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setIsExecutiveBriefOpen(true)}
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-6 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Generate One-Click Executive Brief</span>
                      </button>

                      <button
                        onClick={() => setIsReportModalOpen(true)}
                        className="bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm px-6 py-2.5 rounded-xl border border-slate-800 transition cursor-pointer"
                      >
                        Standard Analytics PDF Report
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- NEW KARNATAKA STATE POLICE DECISION-SUPPORT TABS --- */}

              {/* Tab 7: AI PATROL ROUTE OPTIMIZER */}
              {activeTab === 'patrol_routes' && (
                <div className="space-y-6">
                  <PatrolRouteOptimizer routes={patrolRoutes} />
                </div>
              )}

              {/* Tab 8: FESTIVAL & EVENT RISK PREDICTOR */}
              {activeTab === 'festival_events' && (
                <div className="space-y-6">
                  <FestivalEventPredictor events={festivalRisks} />
                </div>
              )}

              {/* Tab 9: WOMEN SAFETY HEAT INDEX */}
              {activeTab === 'women_safety' && (
                <div className="space-y-6">
                  <WomenSafetyIndex safetyAreas={womenSafetyAreas} />
                </div>
              )}

              {/* Tab 10: AI RESOURCE ALLOCATION */}
              {activeTab === 'resource_alloc' && (
                <div className="space-y-6">
                  <ResourceAllocationPanel hotspots={hotspots} />
                </div>
              )}

              {/* Tab 11: OFFICER 6H ACTION TIMELINE */}
              {activeTab === 'action_timeline' && (
                <div className="space-y-6">
                  <OfficerActionTimeline timelineItems={actionTimeline} />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals & Overlays */}
      <NewIncidentModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmitIncident={handleCreateIncident}
      />

      <IncidentDetailModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        stats={stats}
        incidents={incidents}
      />

      <EmergencyCommandModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        incident={emergencyIncident}
      />

      <ExecutiveBriefModal
        isOpen={isExecutiveBriefOpen}
        onClose={() => setIsExecutiveBriefOpen(false)}
        briefData={executiveBrief}
      />
    </div>
  );
}
