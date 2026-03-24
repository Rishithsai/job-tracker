import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <Briefcase size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">JobTrackr</span>
        </div>

        <div className="card p-8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Create account</h1>
          <p className="text-[#6a708a] text-sm mb-6">Start tracking your job hunt</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="input"
                placeholder="Min. 6 characters"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center mt-2" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6a708a] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}