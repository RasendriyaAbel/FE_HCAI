import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import JobSearch from './pages/JobSearch/JobSearch';
import JobDetail from './pages/JobDetail/JobDetail';
import ApplyJob from './pages/ApplyJob/ApplyJob';
import Applications from './pages/Applications/Applications';
import ApplicationStatus from './pages/ApplicationStatus/ApplicationStatus';
import InterviewSimulation from './pages/InterviewSimulation/InterviewSimulation';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="job-search" element={<JobSearch />} />
          <Route path="job-detail" element={<JobDetail />} />
          <Route path="apply-job" element={<ApplyJob />} />
          <Route path="applications" element={<Applications />} />
          <Route path="application-status/:id" element={<ApplicationStatus />} />
          <Route path="interview-simulation" element={<InterviewSimulation />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
