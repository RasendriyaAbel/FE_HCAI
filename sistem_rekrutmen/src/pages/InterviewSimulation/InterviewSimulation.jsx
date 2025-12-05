import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, X, Shield, Camera } from 'lucide-react';
import './InterviewSimulation.css';

const InterviewSimulation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const [hasStarted, setHasStarted] = useState(false);
  const videoRef = useRef(null);

  const totalQuestions = 10;
  const questionTime = 120; // 2 minutes in seconds

  const questions = [
    'Ceritakan tentang diri Anda dan latar belakang Anda?',
    'Apa yang membuat Anda tertarik dengan posisi ini?',
    'Apa kelebihan dan kekurangan Anda?',
    'Ceritakan pengalaman kerja terbaik Anda?',
    'Bagaimana Anda menangani tekanan di tempat kerja?',
    'Apa yang Anda ketahui tentang perusahaan kami?',
    'Di mana Anda melihat diri Anda dalam 5 tahun ke depan?',
    'Apa yang membuat Anda berbeda dari kandidat lain?',
    'Bagaimana Anda bekerja dalam tim?',
    'Apakah Anda memiliki pertanyaan untuk kami?'
  ];

  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused && hasStarted) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleNextQuestion();
            return questionTime;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused, hasStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setHasStarted(true);
    setIsRecording(true);
    setTimeRemaining(questionTime);
    // In a real app, you would start the camera here
    // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRecording(false);
    setIsPaused(false);
    setTimeRemaining(questionTime);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeRemaining(questionTime);
    } else {
      handleStop();
    }
  };

  const handleCancel = () => {
    if (window.confirm('Apakah Anda yakin ingin membatalkan simulasi?')) {
      setHasStarted(false);
      setIsRecording(false);
      setIsPaused(false);
      setCurrentQuestion(1);
      setTimeRemaining(questionTime);
    }
  };

  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="interview-simulation-page">
      <div className="simulation-header">
        <h1 className="simulation-title">Simulasi Wawancara AI</h1>
        <p className="simulation-instruction">
          {hasStarted
            ? 'Jawab pertanyaan dengan jelas. Anda akan memiliki 2 menit untuk setiap pertanyaan.'
            : "Klik 'Mulai' untuk memulai. Anda akan memiliki 2 menit untuk setiap pertanyaan."}
        </p>
      </div>

      {hasStarted && (
        <div className="progress-section">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="question-counter">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>
      )}

      <div className="simulation-content">
        <div className="video-container">
          <div className="ai-video-frame">
            <div className="recording-badge">
              <div className="recording-dot"></div>
              Merekam...
            </div>
            <div className="ai-avatar">
              <div className="avatar-image">
                <div className="avatar-face">
                  <div className="face-features">
                    <div className="eye left-eye"></div>
                    <div className="eye right-eye"></div>
                    <div className="mouth"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="user-video-frame">
            {hasStarted && (
              <div className="timer-display">{formatTime(timeRemaining)}</div>
            )}
            <div className="user-camera-placeholder">
              {hasStarted ? (
                <div className="camera-active">
                  <Video className="camera-icon" />
                  <p>Kamera Aktif</p>
                </div>
              ) : (
                <Camera className="camera-placeholder-icon" />
              )}
            </div>
          </div>
        </div>

        {!hasStarted ? (
          <div className="start-section">
            <button className="start-button" onClick={handleStart}>
              Mulai Simulasi
            </button>
          </div>
        ) : (
          <>
            <div className="control-buttons">
              <button className="control-btn stop-btn" onClick={handleStop}>
                <Square className="btn-icon" />
              </button>
              <button className="control-btn pause-btn" onClick={handlePause}>
                {isPaused ? (
                  <Play className="btn-icon" />
                ) : (
                  <Pause className="btn-icon" />
                )}
              </button>
              <button className="control-btn cancel-btn" onClick={handleCancel}>
                <X className="btn-icon" />
              </button>
            </div>

            <div className="privacy-notice">
              <Shield className="shield-icon" />
              <p>
                Data video Anda hanya digunakan untuk analisis dan tidak akan
                dibagikan. Lihat{' '}
                <a href="/privacy" className="privacy-link">
                  kebijakan privasi
                </a>{' '}
                kami.
              </p>
            </div>
          </>
        )}

        {hasStarted && (
          <div className="question-section">
            <p className="question-prompt">Berikut pertanyaan Anda...</p>
            <h2 className="question-text">
              {questions[currentQuestion - 1]}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewSimulation;

