import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, CheckCircle, Mail, Upload, Calendar } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');

  const recommendedJobs = [
    {
      id: 1,
      title: 'UI/UX Designer',
      company: 'Google',
      location: 'Mountain View, CA',
      match: '95%',
      matchColor: 'green'
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      match: '92%',
      matchColor: 'green'
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'Amazon',
      location: 'Seattle, WA',
      match: '88%',
      matchColor: 'blue'
    }
  ];

  const applications = [
    {
      id: 1,
      title: 'Senior Product Designer',
      date: 'Oct 12, 2023',
      status: 'In Review',
      statusColor: 'orange'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      date: 'Oct 10, 2023',
      status: 'In Review',
      statusColor: 'orange'
    }
  ];

  const notifications = [
    {
      id: 1,
      message: 'Your application for Senior Product Designer has been viewed.',
      time: '2 hours ago',
      icon: Eye,
      iconColor: 'green'
    },
    {
      id: 2,
      message: 'You have a new message from a recruiter at Microsoft.',
      time: '1 day ago',
      icon: Mail,
      iconColor: 'blue'
    }
  ];

  const tabs = [
    { id: 'all', label: 'All', count: 4 },
    { id: 'applied', label: 'Applied', count: 1 },
    { id: 'review', label: 'In Review', count: 2 },
    { id: 'interview', label: 'Interview', count: 0 },
    { id: 'rejected', label: 'Rejected', count: 1 }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, John!</h1>
          <p className="dashboard-subtitle">
            Here's your job search summary and recommendations.
          </p>
        </div>

        <section className="recommended-section">
          <h2 className="section-title">Recommended for You</h2>
          <div className="job-cards">
            {recommendedJobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-card-header">
                  <div>
                    <h3 className="job-title">{job.title}</h3>
                    <p className="job-company">
                      {job.company} • {job.location}
                    </p>
                  </div>
                  <span className={`match-badge ${job.matchColor}`}>
                    {job.match} Match
                  </span>
                </div>
                <Link to="/job-detail" className="view-details-btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="applications-section">
          <h2 className="section-title">My Application Status</h2>
          <div className="application-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <div className="applications-list">
            {applications.map((app) => (
              <div key={app.id} className="application-item">
                <div className="application-info">
                  <h3 className="application-title">{app.title}</h3>
                  <p className="application-date">Applied on {app.date}</p>
                </div>
                <span className={`status-tag ${app.statusColor}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="dashboard-sidebar">
        <div className="profile-completion-card">
          <h3 className="card-title">Profile Completion</h3>
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
            <p className="progress-text">75%</p>
          </div>
          <p className="progress-message">You're almost there!</p>
          <Link to="/profile" className="complete-profile-btn">
            Complete My Profile →
          </Link>
        </div>

        <div className="notifications-card">
          <h3 className="card-title">Notifications</h3>
          <div className="notifications-list">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <div key={notif.id} className="notification-item">
                  <Icon className={`notification-icon ${notif.iconColor}`} />
                  <div className="notification-content">
                    <p className="notification-message">{notif.message}</p>
                    <span className="notification-time">{notif.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="next-steps-card">
          <h3 className="card-title">Next Steps</h3>
          <div className="next-steps-list">
            <button className="next-step-item">
              <Upload className="step-icon" />
              <span>Upload New CV</span>
              <span className="arrow">→</span>
            </button>
            <button className="next-step-item">
              <Calendar className="step-icon" />
              <span>Schedule an Interview</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;

