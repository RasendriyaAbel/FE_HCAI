import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
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

