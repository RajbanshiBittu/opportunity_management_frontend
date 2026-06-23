import React, { useState, useEffect } from 'react';

export default function OpportunityForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState({
    customerName: '', contactName: '', contactEmail: '', contactPhone: '',
    requirement: '', estimatedValue: 0, stage: 'New', priority: 'Medium',
    nextFollowUpDate: '', notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        nextFollowUpDate: initialData.nextFollowUpDate ? initialData.nextFollowUpDate.split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-xs flex justify-center items-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 border border-zinc-100">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-semibold text-zinc-900 tracking-tight">
            {initialData ? 'Modify Opportunity Parameters' : 'Log New Pipeline Deal'}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 text-sm">✕</button>
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Company / Customer Name *</label>
            <input type="text" name="customerName" required value={form.customerName} onChange={handleChange} className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none transition-colors" placeholder="Acme Corp" />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Contact Name</label>
              <input type="text" name="contactName" value={form.contactName} onChange={handleChange} className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Deal Valuation ($) *</label>
              <input type="number" min="0" name="estimatedValue" required value={form.estimatedValue} onChange={handleChange} className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Core Requirement *</label>
            <textarea name="requirement" required value={form.requirement} onChange={handleChange} rows="3" className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none transition-colors resize-none" placeholder="Detail custom software design requirements..."></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Pipeline Status</label>
              <select name="stage" value={form.stage} onChange={handleChange} className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none bg-white transition-colors">
                {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Priority Metric</label>
              <select name="priority" value={form.priority} onChange={handleChange} className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none bg-white transition-colors">
                {['Low', 'Medium', 'High'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Target Follow-Up Milestone</label>
            <input type="date" name="nextFollowUpDate" value={form.nextFollowUpDate} onChange={handleChange} className="w-full border border-zinc-200 rounded p-2 text-xs focus:border-zinc-900 outline-none transition-colors" />
          </div>

          <div className="flex gap-2 justify-end pt-3 border-t border-zinc-100">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-zinc-200 rounded text-xs font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-xs font-medium transition-colors">Save Opportunity</button>
          </div>
        </form>
      </div>
    </div>
  );
}