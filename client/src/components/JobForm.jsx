import { useState } from 'react';

const STATUSES = ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'];

export default function JobForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    company: '', role: '', location: 'Remote', status: 'Applied',
    salary: '', jobUrl: '', notes: '',
    appliedDate: new Date().toISOString().split('T')[0],
    ...initialData,
    appliedDate: initialData.appliedDate
      ? new Date(initialData.appliedDate).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
  });

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => { e.preventDefault(); onSubmit(form); };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label className="form-label">Company *</label>
          <input name="company" value={form.company} onChange={handleChange}
            className="form-input" placeholder="e.g. Google" required />
        </div>
        <div>
          <label className="form-label">Role *</label>
          <input name="role" value={form.role} onChange={handleChange}
            className="form-input" placeholder="e.g. Frontend Engineer" required />
        </div>
      </div>

      <div className="form-row">
        <div>
          <label className="form-label">Location</label>
          <input name="location" value={form.location} onChange={handleChange}
            className="form-input" placeholder="e.g. Hyderabad / Remote" />
        </div>
        <div>
          <label className="form-label">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className="form-select">
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div>
          <label className="form-label">Salary / Package</label>
          <input name="salary" value={form.salary} onChange={handleChange}
            className="form-input" placeholder="e.g. ₹12 LPA" />
        </div>
        <div>
          <label className="form-label">Date Applied</label>
          <input type="date" name="appliedDate" value={form.appliedDate}
            onChange={handleChange} className="form-input" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Job URL</label>
        <input name="jobUrl" value={form.jobUrl} onChange={handleChange}
          className="form-input" placeholder="https://..." type="url" />
      </div>

      <div className="form-group">
        <label className="form-label">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange}
          className="form-textarea" rows={4}
          placeholder="Interview rounds, contact person, skills needed..." />
      </div>

      <button type="submit" className="btn-primary" disabled={loading}
        style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
        {loading ? 'Saving...' : 'Save Job'}
      </button>
    </form>
  );
}