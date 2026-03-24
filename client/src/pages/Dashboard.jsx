import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import toast from 'react-hot-toast';
import api from '../api';
import JobCard from '../components/JobCard';

const STATUSES = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];
const STATUS_COLORS = {
  Applied: '#4f6ef7', Screening: '#f59e0b',
  Interview: '#a855f7', Offer: '#22c55e', Rejected: '#ef4444',
};
const STAT_CARDS = [
  { key: 'total',     label: 'Total',      color: '#4f6ef7' },
  { key: 'Interview', label: 'Interviews', color: '#a855f7' },
  { key: 'Offer',     label: 'Offers',     color: '#22c55e' },
  { key: 'Rejected',  label: 'Rejected',   color: '#ef4444' },
];

export default function Dashboard() {
  const [jobs, setJobs]           = useState([]);
  const [stats, setStats]         = useState({});
  const [loading, setLoading]     = useState(true);
  const [activeStatus, setActive] = useState('All');
  const [search, setSearch]       = useState('');

  const fetchData = async () => {
    try {
      const [j, s] = await Promise.all([api.get('/jobs'), api.get('/jobs/stats')]);
      setJobs(j.data); setStats(s.data);
    } catch { toast.error('Failed to load data'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job application?')) return;
    try { await api.delete(`/jobs/${id}`); toast.success('Deleted!'); fetchData(); }
    catch { toast.error('Delete failed'); }
  };

  const filtered = jobs.filter((j) => {
    const ms = activeStatus === 'All' || j.status === activeStatus;
    const mq = !search || j.company.toLowerCase().includes(search.toLowerCase())
                       || j.role.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  const chartData = Object.entries(STATUS_COLORS)
    .map(([name, color]) => ({ name, value: stats[name] || 0, color }))
    .filter((d) => d.value > 0);

  return (
    <main className="main">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">
            {stats.total
              ? `You've tracked ${stats.total} application${stats.total !== 1 ? 's' : ''}`
              : 'Start tracking your job applications'}
          </p>
        </div>
        <Link to="/add" className="btn-primary"><Plus size={16} /> Add Job</Link>
      </div>

      <div className="stats-grid">
        {STAT_CARDS.map(({ key, label, color }) => (
          <div key={key} className="stat-card">
            <div className="stat-label">{label}</div>
            <div className="stat-value" style={{ color }}>{loading ? '–' : (stats[key] ?? 0)}</div>
          </div>
        ))}
      </div>

      <div className="middle-row">
        {chartData.length > 0 && (
          <div className="chart-card">
            <div className="chart-title">By Status</div>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={3} dataKey="value">
                  {chartData.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background:'#1a1d27', border:'1px solid #2a2d3d', borderRadius:10, color:'#e2e6f3', fontSize:13 }} />
                <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color:'#a0a6c0', fontSize:12 }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="filter-card" style={{ flex: 1 }}>
          <div className="filter-title"><SlidersHorizontal size={15} /> Filter Applications</div>
          <div className="search-wrap">
            <Search size={15} className="search-icon" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" placeholder="Search company or role..." />
          </div>
          <div className="filter-tabs">
            {STATUSES.map((s) => (
              <button key={s} onClick={() => setActive(s)} className={`filter-tab ${activeStatus === s ? 'active' : ''}`}>
                {s}{s !== 'All' && stats[s] ? <span style={{ marginLeft:5, opacity:0.65, fontSize:11 }}>{stats[s]}</span> : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="jobs-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="job-card" style={{ padding:18 }}>
              <div className="skeleton" style={{ height:16, width:'70%', marginBottom:10 }} />
              <div className="skeleton" style={{ height:12, width:'50%', marginBottom:8 }} />
              <div className="skeleton" style={{ height:12, width:'60%' }} />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">No applications found</div>
          <div className="empty-sub">{jobs.length === 0 ? 'Start by adding your first job application' : 'Try adjusting your filters'}</div>
          {jobs.length === 0 && <Link to="/add" className="btn-primary" style={{ display:'inline-flex' }}><Plus size={16} /> Add Your First Job</Link>}
        </div>
      ) : (
        <>
          <div className="section-label">Showing {filtered.length} application{filtered.length !== 1 ? 's' : ''}</div>
          <div className="jobs-grid">
            {filtered.map((job) => <JobCard key={job._id} job={job} onDelete={handleDelete} />)}
          </div>
        </>
      )}
    </main>
  );
}