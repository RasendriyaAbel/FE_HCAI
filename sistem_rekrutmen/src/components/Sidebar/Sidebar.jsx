import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  User, 
  Settings, 
  LogOut,
  Briefcase,
  Video
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/job-search', icon: Search, label: 'Job Search' },
    { path: '/applications', icon: FileText, label: 'My Applications' },
    { path: '/interview-simulation', icon: Video, label: 'Simulation' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Briefcase className="logo-icon" />
          <span className="logo-text">Job Portal</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

