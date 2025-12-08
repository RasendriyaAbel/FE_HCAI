import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  X,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { createAutoFillHandler } from '../../utils/autoFill';
import './ApplyJob.css';

const ApplyJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  // Get job data from location state or use default
  const jobData = location.state?.jobData || {
    title: 'Senior UI/UX Designer',
    company: 'Tech Solutions Inc.',
    location: 'Jakarta, Indonesia',
    salary: 'Rp 15jt - Rp 25jt'
  };

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    coverLetter: '',
    resume: null,
    resumeName: '',
    linkedin: '',
    portfolio: '',
    expectedSalary: '',
    availability: 'immediate'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Auto-fill handlers untuk testing/prototype
  const autoFillFullName = createAutoFillHandler('fullName', setFormData);
  const autoFillEmail = createAutoFillHandler('email', setFormData);
  const autoFillPhone = createAutoFillHandler('phone', setFormData);
  const autoFillAddress = createAutoFillHandler('address', setFormData);
  const autoFillCoverLetter = createAutoFillHandler('coverLetter', setFormData);
  const autoFillLinkedin = createAutoFillHandler('linkedin', setFormData);
  const autoFillPortfolio = createAutoFillHandler('portfolio', setFormData);
  const autoFillExpectedSalary = createAutoFillHandler('expectedSalary', setFormData);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          resume: 'File size must be less than 5MB'
        }));
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          resume: 'Only PDF and DOC files are allowed'
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        resume: file,
        resumeName: file.name
      }));
      if (errors.resume) {
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const removeResume = () => {
    setFormData(prev => ({
      ...prev,
      resume: null,
      resumeName: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = 'Cover letter must be at least 50 characters';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume/CV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <div className="apply-job-page">
        <div className="success-container">
          <div className="success-icon-wrapper">
            <CheckCircle className="success-icon" />
          </div>
          <h1 className="success-title">Application Submitted!</h1>
          <p className="success-message">
            Your application for <strong>{jobData.title}</strong> at{' '}
            <strong>{jobData.company}</strong> has been successfully submitted.
          </p>
          <p className="success-submessage">
            We will review your application and get back to you soon.
          </p>
          <div className="success-actions">
            <Link to="/applications" className="view-applications-btn">
              View My Applications
            </Link>
            <Link to="/job-search" className="browse-jobs-btn">
              Browse More Jobs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="apply-job-page">
      <div className="apply-job-container">
        <div className="apply-job-header">
          <Link to="/job-detail" className="back-link">
            <ArrowLeft className="back-icon" />
            Back to Job Details
          </Link>
          <h1 className="page-title">Apply for Position</h1>
        </div>

        <div className="apply-job-content">
          <div className="job-summary-card">
            <div className="job-summary-header">
              <Briefcase className="job-icon" />
              <div>
                <h2 className="job-title">{jobData.title}</h2>
                <p className="job-company">{jobData.company}</p>
              </div>
            </div>
            <div className="job-summary-details">
              <div className="job-detail-item">
                <MapPin className="detail-icon" />
                <span>{jobData.location}</span>
              </div>
              <div className="job-detail-item">
                <span className="detail-label">Salary:</span>
                <span>{jobData.salary}</span>
              </div>
            </div>
          </div>

          <form className="apply-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    <User className="label-icon" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    onClick={autoFillFullName}
                    onFocus={autoFillFullName}
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <Mail className="label-icon" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    onClick={autoFillEmail}
                    onFocus={autoFillEmail}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <Phone className="label-icon" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    onClick={autoFillPhone}
                    onFocus={autoFillPhone}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address" className="form-label">
                    <MapPin className="label-icon" />
                    Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className={`form-input ${errors.address ? 'error' : ''}`}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                    onClick={autoFillAddress}
                    onFocus={autoFillAddress}
                  />
                  {errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Resume / CV</h3>
              <div className="form-group">
                <label htmlFor="resume" className="form-label">
                  <FileText className="label-icon" />
                  Upload Resume/CV * (PDF, DOC, DOCX - Max 5MB)
                </label>
                {!formData.resume ? (
                  <div className="file-upload-area">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    <label htmlFor="resume" className="file-upload-label">
                      <Upload className="upload-icon" />
                      <span>Click to upload or drag and drop</span>
                      <span className="file-hint">PDF, DOC, DOCX (Max 5MB)</span>
                    </label>
                  </div>
                ) : (
                  <div className="file-preview">
                    <FileText className="file-icon" />
                    <span className="file-name">{formData.resumeName}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={removeResume}
                    >
                      <X className="remove-icon" />
                    </button>
                  </div>
                )}
                {errors.resume && (
                  <span className="error-message">{errors.resume}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Cover Letter</h3>
              <div className="form-group">
                <label htmlFor="coverLetter" className="form-label">
                  Why are you interested in this position? *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  className={`form-textarea ${errors.coverLetter ? 'error' : ''}`}
                  placeholder="Tell us why you're the perfect fit for this role. Include your relevant experience, skills, and what excites you about this opportunity..."
                  rows={8}
                  value={formData.coverLetter}
                  onChange={handleChange}
                  onClick={autoFillCoverLetter}
                  onFocus={autoFillCoverLetter}
                />
                <div className="char-count">
                  {formData.coverLetter.length} characters
                  {formData.coverLetter.length < 50 && (
                    <span className="char-warning">
                      {' '}
                      (Minimum 50 characters)
                    </span>
                  )}
                </div>
                {errors.coverLetter && (
                  <span className="error-message">{errors.coverLetter}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Additional Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="linkedin" className="form-label">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    className="form-input"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={handleChange}
                    onClick={autoFillLinkedin}
                    onFocus={autoFillLinkedin}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="portfolio" className="form-label">
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    className="form-input"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio}
                    onChange={handleChange}
                    onClick={autoFillPortfolio}
                    onFocus={autoFillPortfolio}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="expectedSalary" className="form-label">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    id="expectedSalary"
                    name="expectedSalary"
                    className="form-input"
                    placeholder="e.g., Rp 20jt - Rp 25jt"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                    onClick={autoFillExpectedSalary}
                    onFocus={autoFillExpectedSalary}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="availability" className="form-label">
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    className="form-select"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <option value="immediate">Immediate</option>
                    <option value="1week">1 Week</option>
                    <option value="2weeks">2 Weeks</option>
                    <option value="1month">1 Month</option>
                    <option value="2months">2 Months</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Link to="/job-detail" className="cancel-btn">
                Cancel
              </Link>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;

