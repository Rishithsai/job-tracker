import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}