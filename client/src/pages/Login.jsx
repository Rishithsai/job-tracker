import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
            <Briefcase size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-2xl text-white">JobTrackr</span>
        </div>

        <div className="card p-8">
          <h1 className="font-display font-bold text-2xl text-white mb-1">Welcome back</h1>
          <p className="text-[#6a708a] text-sm mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center mt-2" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6a708a] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}