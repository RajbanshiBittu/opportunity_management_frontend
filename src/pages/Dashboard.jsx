import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../hooks/useAuth.js';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityForm from '../components/OpportunityForm';

export default function Dashboard() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOps, setFilteredOps] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOp, setSelectedOp] = useState(null);
  
  const [stageFilter, setStageFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const getPipelineData = async () => {
    try {
      const { data } = await API.get('/opportunities');
      setOpportunities(data);
      setFilteredOps(data);
    } catch (err) {
      console.error("Critical routing breakdown during pipeline validation cycle", err);
    }
  };

  useEffect(() => { getPipelineData(); }, []);

  useEffect(() => {
    let dataset = [...opportunities];
    if (stageFilter !== 'All') dataset = dataset.filter(o => o.stage === stageFilter);
    if (priorityFilter !== 'All') dataset = dataset.filter(o => o.priority === priorityFilter);
    setFilteredOps(dataset);
  }, [stageFilter, priorityFilter, opportunities]);

  const commitFormChanges = async (formData) => {
    try {
      if (selectedOp) {
        await API.put(`/opportunities/${selectedOp._id}`, formData);
      } else {
        await API.post('/opportunities', formData);
      }
      setModalOpen(false);
      setSelectedOp(null);
      getPipelineData();
    } catch (err) {
      alert(err.response?.data?.message || 'Transaction context block rejected action mutations');
    }
  };

  const executePurge = async (id) => {
    if (!window.confirm("Purge selected lead document from active pipeline permanently?")) return;
    try {
      await API.delete(`/opportunities/${id}`);
      getPipelineData();
    } catch (err) {
      alert(err.response?.data?.message || 'Access authorization sequence validation failed');
    }
  };

  const grossMetrics = {
    totalValue: opportunities.reduce((acc, o) => acc + (o.estimatedValue || 0), 0),
    wonValue: opportunities.filter(o => o.stage === 'Won').reduce((acc, o) => acc + (o.estimatedValue || 0), 0),
    openHighPriority: opportunities.filter(o => o.priority === 'High' && o.stage !== 'Won' && o.stage !== 'Lost').length
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8 animate-fadeIn">
      {/* Premium Minimalist Metric Panel Displays */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-zinc-200/60 p-5 rounded-lg shadow-2xs">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Gross Pipeline Horizon</p>
          <p className="text-xl font-semibold text-zinc-900 mt-1">${grossMetrics.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-zinc-200/60 p-5 rounded-lg shadow-2xs">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Closed Converted Capitulation</p>
          <p className="text-xl font-semibold text-emerald-600 mt-1">${grossMetrics.wonValue.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-zinc-200/60 p-5 rounded-lg shadow-2xs">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Escalated Risks</p>
          <p className="text-xl font-semibold text-rose-600 mt-1">{grossMetrics.openHighPriority} High-Tier</p>
        </div>
      </div>

      {/* Control Configuration Filtering Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-5 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="border border-zinc-200 text-xs rounded p-1.5 bg-white font-medium text-zinc-700 outline-none">
              <option value="All">All Pipeline Stages</option>
              {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="border border-zinc-200 text-xs rounded p-1.5 bg-white font-medium text-zinc-700 outline-none">
              <option value="All">All Priorities</option>
              {['Low', 'Medium', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <button 
          onClick={() => { setSelectedOp(null); setModalOpen(true); }}
          className="bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs px-4 py-2 rounded shadow-2xs transition-all"
        >
          Add Opportunity Entry
        </button>
      </div>

      {/* Primary Display Layout Deck */}
      {filteredOps.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-lg border-zinc-200 text-zinc-400 text-xs font-medium">
          No records captured matching parameter combinations.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOps.map(op => (
            <OpportunityCard 
              key={op._id} 
              op={op} 
              currentUserId={user?._id}
              onEdit={(target) => { setSelectedOp(target); setModalOpen(true); }}
              onDelete={executePurge}
            />
          ))}
        </div>
      )}

      {/* Modal Rendering Hook */}
      {modalOpen && (
        <OpportunityForm 
          initialData={selectedOp} 
          onSubmit={commitFormChanges} 
          onClose={() => { setModalOpen(false); setSelectedOp(null); }} 
        />
      )}
    </div>
  );
}