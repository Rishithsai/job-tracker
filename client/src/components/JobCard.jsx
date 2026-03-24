import { Link } from 'react-router-dom';
import { MapPin, Calendar, ExternalLink, Pencil, Trash2, DollarSign } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function JobCard({ job, onDelete }) {
  const dateApplied = new Date(job.appliedDate).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="job-card">
      <div className="job-card-top">
        <div style={{ minWidth: 0 }}>
          <div className="job-role">{job.role}</div>
          <div className="job-company">{job.company}</div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="job-meta">
        {job.location && <span><MapPin size={12} /> {job.location}</span>}
        {job.salary  && <span><DollarSign size={12} /> {job.salary}</span>}
        <span><Calendar size={12} /> {dateApplied}</span>
      </div>

      {job.notes && <p className="job-notes">{job.notes}</p>}

      <div className="job-actions">
        {job.jobUrl && (
          <a href={job.jobUrl} target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--muted)', textDecoration:'none', marginRight:'auto', padding:'4px 8px', borderRadius:7, transition:'all 0.18s' }}
            onMouseEnter={e => e.currentTarget.style.background='var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
          >
            <ExternalLink size={12} /> View Job
          </a>
        )}
        <Link to={`/edit/${job._id}`} className="icon-btn" title="Edit">
          <Pencil size={14} />
        </Link>
        <button onClick={() => onDelete(job._id)} className="icon-btn delete" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}