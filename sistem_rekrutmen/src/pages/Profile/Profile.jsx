import { useState } from 'react';
import { User, Briefcase, GraduationCap, Target, FileText, Upload, Edit } from 'lucide-react';
import { createAutoFillHandler } from '../../utils/autoFill';
import './Profile.css';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1234567890',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/yourprofile',
    summary: ''
  });

  const sections = [
    { id: 'personal', icon: User, label: 'Personal Info' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'skills', icon: Target, label: 'Skills' },
    { id: 'documents', icon: FileText, label: 'Documents' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Auto-fill handlers untuk testing/prototype
  const autoFillFullName = createAutoFillHandler('fullName', setFormData);
  const autoFillEmail = createAutoFillHandler('email', setFormData);
  const autoFillPhone = createAutoFillHandler('phone', setFormData);
  const autoFillLocation = createAutoFillHandler('location', setFormData);
  const autoFillLinkedin = createAutoFillHandler('linkedin', setFormData);
  const autoFillSummary = createAutoFillHandler('summary', setFormData);

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
                  name="fullName"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  onClick={isEditing ? autoFillFullName : undefined}
                  onFocus={isEditing ? autoFillFullName : undefined}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  onClick={isEditing ? autoFillEmail : undefined}
                  onFocus={isEditing ? autoFillEmail : undefined}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  onClick={isEditing ? autoFillPhone : undefined}
                  onFocus={isEditing ? autoFillPhone : undefined}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  onClick={isEditing ? autoFillLocation : undefined}
                  onFocus={isEditing ? autoFillLocation : undefined}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Linkedin Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  className="form-input"
                  value={formData.linkedin}
                  onChange={handleChange}
                  disabled={!isEditing}
                  onClick={isEditing ? autoFillLinkedin : undefined}
                  onFocus={isEditing ? autoFillLinkedin : undefined}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Summary</label>
                <textarea
                  name="summary"
                  className="form-textarea"
                  placeholder="Write a short professional summary about yourself..."
                  value={formData.summary}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={5}
                  onClick={isEditing ? autoFillSummary : undefined}
                  onFocus={isEditing ? autoFillSummary : undefined}
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

