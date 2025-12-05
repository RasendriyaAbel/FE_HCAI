import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Briefcase,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, you would make an API call here
      // For demo purposes, we'll auto-login after registration
      const userData = {
        email: formData.email,
        name: formData.fullName,
        phone: formData.phone
      };
      login(userData);
      navigate('/');
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: formData.password.length >= 8 },
    {
      text: 'Contains uppercase letter',
      met: /[A-Z]/.test(formData.password)
    },
    {
      text: 'Contains lowercase letter',
      met: /[a-z]/.test(formData.password)
    },
    { text: 'Contains number', met: /\d/.test(formData.password) }
  ];

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <div className="logo-section">
            <Briefcase className="logo-icon" />
            <h1 className="logo-text">Job Portal</h1>
          </div>
          <h2 className="register-title">Create Your Account</h2>
          <p className="register-subtitle">
            Join us and start your career journey
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="toggle-icon" />
                ) : (
                  <Eye className="toggle-icon" />
                )}
              </button>
            </div>
            {formData.password && (
              <div className="password-requirements">
                {passwordRequirements.map((req, index) => (
                  <div
                    key={index}
                    className={`requirement-item ${req.met ? 'met' : ''}`}
                  >
                    <CheckCircle className="requirement-icon" />
                    <span>{req.text}</span>
                  </div>
                ))}
              </div>
            )}
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${
                  errors.confirmPassword ? 'error' : ''
                }`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="toggle-icon" />
                ) : (
                  <Eye className="toggle-icon" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="form-group">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <span className="error-message">{errors.agreeToTerms}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Create Account
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-button google">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button type="button" className="social-button linkedin">
              <svg className="social-icon" viewBox="0 0 24 24" fill="#0077B5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

