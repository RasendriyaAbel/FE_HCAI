import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import './Applications.css';

const Applications = () => {
  const applications = [
    {
      id: 1,
      title: 'UI/UX Designer',
      company: 'PT Inovasi Digital',
      date: '15 Agu 2023',
      status: 'in-review',
      statusLabel: 'In Review'
    },
    {
      id: 2,
      title: 'Senior Product Designer',
      company: 'Tech Solutions Inc.',
      date: '12 Okt 2023',
      status: 'in-review',
      statusLabel: 'In Review'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Digital Agency',
      date: '10 Okt 2023',
      status: 'applied',
      statusLabel: 'Applied'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-review':
        return Clock;
      case 'accepted':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-review':
        return 'orange';
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1 className="page-title">My Applications</h1>
        <p className="page-subtitle">
          Track the status of your job applications
        </p>
      </div>

      <div className="applications-list">
        {applications.map((app) => {
          const StatusIcon = getStatusIcon(app.status);
          const statusColor = getStatusColor(app.status);

          return (
            <div key={app.id} className="application-card">
              <div className="application-info">
                <h3 className="application-title">{app.title}</h3>
                <p className="application-company">{app.company}</p>
                <p className="application-date">Applied on {app.date}</p>
              </div>
              <div className="application-actions">
                <span className={`status-badge ${statusColor}`}>
                  <StatusIcon className="status-icon" />
                  {app.statusLabel}
                </span>
                <Link
                  to={`/application-status/${app.id}`}
                  className="view-status-btn"
                >
                  View Status
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Applications;

