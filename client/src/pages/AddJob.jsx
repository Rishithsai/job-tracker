import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';
import JobForm from '../components/JobForm';

export default function AddJob() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.post('/jobs', formData);
      toast.success('Job added successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to Dashboard</Link>
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title">Add New Job</h1>
        <p className="page-sub">Track a new job application</p>
      </div>
      <div className="form-card">
        <JobForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}