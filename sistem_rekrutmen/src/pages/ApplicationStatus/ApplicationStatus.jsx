import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import './ApplicationStatus.css';

const ApplicationStatus = () => {
  const [expandedFeedback, setExpandedFeedback] = useState('admin');

  const stages = [
    {
      id: 'received',
      label: 'Lamaran Diterima',
      status: 'completed',
      date: '15 Agu 2023',
      icon: CheckCircle
    },
    {
      id: 'admin',
      label: 'Seleksi Administrasi',
      status: 'completed',
      date: '17 Agu 2023',
      icon: CheckCircle
    },
    {
      id: 'test',
      label: 'Tes Online',
      status: 'in-progress',
      date: 'Sedang Berlangsung',
      icon: Clock
    },
    {
      id: 'hr-interview',
      label: 'Wawancara HR',
      status: 'pending',
      date: 'Menunggu',
      icon: Lock
    },
    {
      id: 'user-interview',
      label: 'Wawancara User',
      status: 'pending',
      date: 'Menunggu',
      icon: Lock
    }
  ];

  const feedbacks = [
    {
      id: 'received',
      title: 'Feedback: Lamaran Diterima',
      content: 'Lamaran Anda telah diterima dan sedang dalam proses review.',
      isExpanded: expandedFeedback === 'received'
    },
    {
      id: 'admin',
      title: 'Feedback: Seleksi Administrasi',
      content:
        'Selamat Anda telah lolos tahap seleksi administrasi! Kami terkesan dengan pengalaman Anda. Langkah selanjutnya adalah Tes Online yang akan kami kirimkan ke email Anda dalam 2x24 jam. Mohon persiapkan diri Anda.',
      isExpanded: expandedFeedback === 'admin'
    }
  ];

  const toggleFeedback = (id) => {
    setExpandedFeedback(expandedFeedback === id ? null : id);
  };

  return (
    <div className="application-status-page">
      <div className="status-header">
        <Link to="/applications" className="back-link">
          ← Kembali ke Daftar Lamaran Saya
        </Link>
        <div className="status-job-info">
          <h1 className="status-title">Status Lamaran: UI/UX Designer</h1>
          <p className="status-company">PT Inovasi Digital</p>
        </div>
      </div>

      <div className="status-content">
        <div className="timeline-section">
          <div className="timeline">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isLast = index === stages.length - 1;

              return (
                <div key={stage.id} className="timeline-item">
                  <div className="timeline-marker">
                    <div
                      className={`marker-icon ${
                        stage.status === 'completed'
                          ? 'completed'
                          : stage.status === 'in-progress'
                          ? 'in-progress'
                          : 'pending'
                      }`}
                    >
                      <Icon className="icon" />
                    </div>
                    {!isLast && (
                      <div
                        className={`timeline-line ${
                          stage.status === 'completed' ? 'completed' : ''
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="timeline-content">
                    <h3 className="timeline-label">{stage.label}</h3>
                    <p
                      className={`timeline-date ${
                        stage.status === 'completed'
                          ? 'completed'
                          : stage.status === 'in-progress'
                          ? 'in-progress'
                          : 'pending'
                      }`}
                    >
                      {stage.status === 'completed'
                        ? `Selesai: ${stage.date}`
                        : stage.status === 'in-progress'
                        ? stage.date
                        : stage.date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="feedback-section">
          <h2 className="feedback-title">Feedback & Updates</h2>
          <div className="feedback-list">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <button
                  className="feedback-header"
                  onClick={() => toggleFeedback(feedback.id)}
                >
                  <h3 className="feedback-card-title">{feedback.title}</h3>
                  {expandedFeedback === feedback.id ? (
                    <ChevronUp className="chevron-icon" />
                  ) : (
                    <ChevronDown className="chevron-icon" />
                  )}
                </button>
                {expandedFeedback === feedback.id && (
                  <div className="feedback-content">
                    <p>{feedback.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;

