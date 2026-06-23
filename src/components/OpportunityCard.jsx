import React from 'react';

export default function OpportunityCard({ op, onEdit, onDelete, currentUserId }) {
  // Safe validation check matching populate variance vs raw ObjectId string references
  const isOwner = currentUserId === op.owner?._id || currentUserId === op.owner;

  const stageStyles = {
    'New': 'bg-zinc-50 text-zinc-700 border-zinc-200',
    'Contacted': 'bg-orange-50 text-orange-700 border-orange-100',
    'Qualified': 'bg-amber-50 text-amber-700 border-amber-100',
    'Proposal Sent': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'Won': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Lost': 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const priorityStyles = {
    'High': 'text-rose-600 font-medium',
    'Medium': 'text-amber-600 font-medium',
    'Low': 'text-zinc-400 font-medium'
  };

  return (
    <div className="bg-white border border-zinc-200/80 rounded-lg p-5 flex flex-col justify-between hover:border-zinc-300 transition-all duration-150">
      <div>
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="font-semibold text-zinc-900 tracking-tight text-base truncate max-w-[70%]" title={op.customerName}>
            {op.customerName}
          </h3>
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded border tracking-wide uppercase ${stageStyles[op.stage] || 'bg-zinc-100'}`}>
            {op.stage}
          </span>
        </div>
        
        <p className="text-zinc-500 text-xs leading-relaxed mb-5 line-clamp-2 min-h-[2.25rem]">
          {op.requirement}
        </p>

        <div className="space-y-2 text-xs border-t border-zinc-100 pt-4">
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-400 text-[11px]">Estimated Value</span>
            <span className="font-semibold text-zinc-800">${op.estimatedValue?.toLocaleString() || '0'}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-400 text-[11px]">Priority Rating</span>
            <span className={priorityStyles[op.priority] || 'text-zinc-600'}>{op.priority}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-400 text-[11px]">Follow-Up Date</span>
            <span className="text-zinc-600 font-medium">
              {op.nextFollowUpDate ? new Date(op.nextFollowUpDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-dashed border-zinc-100 mt-2">
            <span className="text-zinc-400 text-[11px]">Deal Owner</span>
            <span className="text-zinc-500 font-medium bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded text-[10px] truncate max-w-[130px]">
              {isOwner ? 'Me' : op.owner?.name || 'Team Agent'}
            </span>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="flex gap-2 mt-5 pt-3 border-t border-zinc-100">
          <button 
            onClick={() => onEdit(op)}
            className="flex-1 text-center border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium text-xs py-1.5 rounded transition-colors"
          >
            Modify
          </button>
          <button 
            onClick={() => onDelete(op._id)}
            className="flex-1 text-center border border-transparent hover:bg-rose-50 text-rose-600 font-medium text-xs py-1.5 rounded transition-colors"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}