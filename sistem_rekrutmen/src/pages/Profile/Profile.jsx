import { useState } from 'react';
import { User, Briefcase, GraduationCap, Target, FileText, Upload, Edit } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const sections = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Target, label: 'Skills' },
    { id: 'documents', icon: FileText, label: 'Documents' }
  ];

  return (
    <div className="profile-page">
      <div className="profile-sidebar">
        <div className="profile-summary">
          <div className="profile-avatar">
            <User className="avatar-icon" />
          </div>
          <h3 className="profile-name">John Doe</h3>
          <p className="profile-email">john.doe@email.com</p>
        </div>

        <nav className="profile-nav">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                className={`profile-nav-item ${
                  activeSection === section.id ? 'active' : ''
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon className="nav-icon" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="profile-completion">
          <div className="completion-header">
            <span className="completion-label">Profile Completion</span>
            <span className="completion-percentage">40%</span>
          </div>
          <div className="completion-bar">
            <div
              className="completion-fill"
              style={{ width: '40%' }}
            ></div>
          </div>
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-header">
          <div>
            <h1 className="profile-title">Build Your Universal Profile</h1>
            <p className="profile-subtitle">
              Complete your profile to apply for jobs with a single click.
            </p>
          </div>
        </div>

        <div className="auto-fill-section">
          <div className="auto-fill-content">
            <h3 className="auto-fill-title">Save time with Auto-Fill.</h3>
            <p className="auto-fill-description">
              Upload your resume or import from LinkedIn to automatically fill
              in your profile details.
            </p>
          </div>
          <button className="auto-fill-btn">
            <Upload className="btn-icon" />
            Auto-Fill with Resume/CV
          </button>
        </div>

        {activeSection === 'personal' && (
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Personal Information</h2>
              <button
                className="edit-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="edit-icon" />
                Edit
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  defaultValue="John Doe"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  defaultValue="john.doe@email.com"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-input"
                  defaultValue="+1234567890"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  defaultValue="San Francisco, CA"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Linkedin Profile</label>
                <input
                  type="url"
                  className="form-input"
                  defaultValue="https://linkedin.com/in/yourprofile"
                  disabled={!isEditing}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Summary</label>
                <textarea
                  className="form-textarea"
                  placeholder="Write a short professional summary about yourself..."
                  disabled={!isEditing}
                  rows={5}
                ></textarea>
              </div>
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="cancel-btn">Cancel</button>
                <button className="save-btn">Save Changes</button>
              </div>
            )}
          </div>
        )}

        {activeSection === 'experience' && (
          <div className="profile-section">
            <h2 className="section-title">Experience</h2>
            <p className="section-placeholder">Experience section content...</p>
          </div>
        )}

        {activeSection === 'education' && (
          <div className="profile-section">
            <h2 className="section-title">Education</h2>
            <p className="section-placeholder">Education section content...</p>
          </div>
        )}

        {activeSection === 'skills' && (
          <div className="profile-section">
            <h2 className="section-title">Skills</h2>
            <p className="section-placeholder">Skills section content...</p>
          </div>
        )}

        {activeSection === 'documents' && (
          <div className="profile-section">
            <h2 className="section-title">Documents</h2>
            <p className="section-placeholder">Documents section content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

