import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LayoutDashboard, Plus } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <Briefcase size={16} color="#fff" />
          </div>
          <span className="logo-text">JobTrackr</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            <LayoutDashboard size={15} /> Dashboard
          </Link>
          <Link to="/add" className={`nav-link ${isActive('/add') ? 'active' : ''}`}>
            <Plus size={15} /> Add Job
          </Link>
        </div>
      </div>
    </nav>
  );
}