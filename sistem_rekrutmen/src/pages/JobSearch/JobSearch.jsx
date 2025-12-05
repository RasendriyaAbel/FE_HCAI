import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Save, MapPin, Clock, Sparkles, Award } from 'lucide-react';
import './JobSearch.css';

const JobSearch = () => {
  const [salaryRange, setSalaryRange] = useState([50, 150]);

  const jobs = [
    {
      id: 1,
      title: 'Senior Product Designer',
      company: 'Spotify',
      location: 'New York, USA',
      skills: ['UI/UX Design', 'Figma', 'Prototyping'],
      posted: '2 days ago',
      badge: { text: 'AI Recommended', color: 'green' }
    },
    {
      id: 2,
      title: 'Software Engineer, Backend',
      company: 'Google',
      location: 'Remote',
      skills: ['Python', 'Go', 'Distributed Systems'],
      posted: '5 days ago',
      badge: { text: 'Top Match', color: 'blue' }
    },
    {
      id: 3,
      title: 'Marketing Manager',
      company: 'Amazon',
      location: 'Seattle, WA',
      skills: ['Marketing', 'Analytics', 'Strategy'],
      posted: '1 week ago',
      badge: null
    }
  ];

  return (
    <div className="job-search-page">
      <div className="job-search-sidebar">
        <h2 className="sidebar-title">Filter Lowongan</h2>
        
        <div className="filter-section">
          <div className="filter-item">
            <Filter className="filter-icon" />
            <span>Tipe Pekerjaan</span>
          </div>
          <div className="filter-item">
            <MapPin className="filter-icon" />
            <span>Lokasi</span>
          </div>
          <div className="filter-item">
            <Award className="filter-icon" />
            <span>Tingkat Pengalaman</span>
          </div>
          <div className="filter-item">
            <Filter className="filter-icon" />
            <span>Industri</span>
          </div>
          <div className="filter-item">
            <span>Rentang Gaji</span>
            <div className="salary-filter">
              <div className="salary-range">
                <span>${salaryRange[0]}k</span>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={salaryRange[0]}
                  onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
                  className="range-input"
                />
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={salaryRange[1]}
                  onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                  className="range-input"
                />
                <span>${salaryRange[1]}k</span>
              </div>
            </div>
          </div>
        </div>

        <button className="apply-filter-btn">Terapkan Filter</button>
      </div>

      <div className="job-search-main">
        <div className="job-search-header">
          <div>
            <h1 className="page-title">Lowongan untuk Anda</h1>
            <p className="page-subtitle">
              Berdasarkan profil dan preferensi Anda.
            </p>
          </div>
        </div>

        <div className="search-controls">
          <div className="search-bar-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Cari berdasarkan kata kunci, perusahaan, atau lokasi"
              className="search-bar"
            />
          </div>
          
          <div className="sort-controls">
            <select className="sort-select">
              <option>Sort by: Relevansi</option>
              <option>Tanggal Diposting</option>
              <option>Gaji</option>
            </select>
          </div>
        </div>

        <div className="job-listings">
          {jobs.map((job) => (
            <div key={job.id} className="job-listing-card">
              <div className="job-listing-header">
                <div className="job-listing-info">
                  <h3 className="job-listing-title">{job.title}</h3>
                  <p className="job-listing-company">
                    {job.company} • {job.location}
                  </p>
                  <div className="job-skills">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="job-meta">
                    <Clock className="meta-icon" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
                {job.badge && (
                  <span className={`job-badge ${job.badge.color}`}>
                    {job.badge.text}
                  </span>
                )}
              </div>
              <div className="job-listing-actions">
                <button className="save-btn">
                  <Save className="btn-icon" />
                  Simpan
                </button>
                <Link to="/job-detail" className="view-detail-btn">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;

