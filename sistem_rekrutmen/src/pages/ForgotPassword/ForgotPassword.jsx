import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Briefcase } from 'lucide-react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    setError('');
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <div className="logo-section">
            <Briefcase className="logo-icon" />
            <h1 className="logo-text">Job Portal</h1>
          </div>
          <h2 className="forgot-password-title">Forgot Password?</h2>
          <p className="forgot-password-subtitle">
            {isSubmitted
              ? 'Check your email for reset instructions'
              : "Don't worry! Enter your email and we'll send you reset instructions."}
          </p>
        </div>

        {!isSubmitted ? (
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  className={`form-input ${error ? 'error' : ''}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                />
              </div>
              {error && <span className="error-message">{error}</span>}
            </div>

            <button type="submit" className="submit-button">
              Send Reset Link
            </button>

            <Link to="/login" className="back-link">
              <ArrowLeft className="back-icon" />
              Back to Sign In
            </Link>
          </form>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p>We've sent password reset instructions to {email}</p>
            <Link to="/login" className="back-link">
              <ArrowLeft className="back-icon" />
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

