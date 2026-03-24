import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api';
import JobForm from '../components/JobForm';

export default function EditJob() {
  const [job, setJob]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/jobs')
      .then(({ data }) => {
        const found = data.find((j) => j._id === id);
        if (!found) { toast.error('Job not found'); navigate('/'); return; }
        setJob(found);
      })
      .catch(() => { toast.error('Failed to load job'); navigate('/'); })
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await api.put(`/jobs/${id}`, formData);
      toast.success('Job updated!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="form-page">
        <div className="form-card">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: 46, borderRadius: 10, marginBottom: 16 }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to Dashboard</Link>
      <div style={{ marginBottom: 20 }}>
        <h1 className="page-title">Edit Job</h1>
        <p className="page-sub">Update your application details</p>
      </div>
      <div className="form-card">
        {job && <JobForm initialData={job} onSubmit={handleSubmit} loading={loading} />}
      </div>
    </div>
  );
}