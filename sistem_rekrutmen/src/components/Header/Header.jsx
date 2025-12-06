import { Search, Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="header">
      <button className="mobile-menu-btn" onClick={onMenuClick}>
        <Menu className="menu-icon" />
      </button>
      
      <div className="header-search">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search for jobs..."
          className="search-input"
        />
      </div>
      
      <div className="header-actions">
        <button className="notification-btn">
          <Bell className="icon" />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="user-avatar">
            <User className="avatar-icon" />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-email">{user?.email || 'user@email.com'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
