import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Building2 } from 'lucide-react';
import './JobDetail.css';

const JobDetail = () => {
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();

  const tabs = [
    { id: 'description', label: 'Deskripsi Pekerjaan' },
    { id: 'qualifications', label: 'Kualifikasi' },
    { id: 'company', label: 'Tentang Perusahaan' }
  ];

  const handleApply = () => {
    const jobData = {
      title: 'Senior UI/UX Designer',
      company: 'Tech Solutions Inc.',
      location: 'Jakarta, Indonesia',
      salary: 'Rp 15jt - Rp 25jt'
    };
    navigate('/apply-job', { state: { jobData } });
  };

  return (
    <div className="job-detail-page">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/job-search">Cari Lowongan</Link>
        <span>/</span>
        <span>Detail Lowongan</span>
      </div>

      <div className="job-detail-content">
        <div className="job-detail-main">
          <div className="job-header">
            <h1 className="job-title">Senior UI/UX Designer</h1>
            <p className="job-company-location">
              Tech Solutions Inc. - Jakarta, Indonesia
            </p>
            <div className="job-tags">
              <span className="job-tag blue">Full-time</span>
              <span className="job-tag gray">Senior Level</span>
              <span className="job-tag gray">Design</span>
            </div>
          </div>

          <div className="job-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`job-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="job-tab-content">
            {activeTab === 'description' && (
              <div>
                <section className="content-section">
                  <h2 className="section-heading">Deskripsi Pekerjaan</h2>
                  <p className="section-text">
                    Kami sedang mencari seorang Senior UI/UX Designer yang
                    berbakat untuk bergabung dengan tim kami. Kandidat yang
                    ideal akan memiliki passion yang kuat terhadap user-centered
                    design dan kemampuan untuk menciptakan pengalaman pengguna
                    yang luar biasa. Kami mencari seseorang yang memiliki
                    perhatian terhadap detail dan kemampuan untuk menerjemahkan
                    requirement yang kompleks menjadi interface yang intuitif.
                  </p>
                </section>

                <section className="content-section">
                  <h2 className="section-heading">Tanggung Jawab Utama</h2>
                  <ul className="responsibilities-list">
                    <li>
                      Berkolaborasi dengan product managers dan engineers untuk
                      mendefinisikan dan mengimplementasikan solusi inovatif
                    </li>
                    <li>
                      Menjalankan semua tahap visual design dari konsep hingga
                      final handover
                    </li>
                    <li>
                      Membuat wireframes, storyboards, user flows, process flows,
                      dan sitemaps
                    </li>
                    <li>
                      Melakukan user research dan mengevaluasi feedback
                    </li>
                    <li>
                      Membangun dan mempromosikan design guidelines, best
                      practices, dan standards
                    </li>
                  </ul>
                </section>

                <section className="content-section">
                  <h2 className="section-heading">Manfaat</h2>
                  <p className="section-text">
                    Kami menawarkan kompensasi yang kompetitif, asuransi
                    kesehatan, jam kerja yang fleksibel, dan kesempatan
                    pengembangan profesional. Bergabunglah dengan tim yang
                    dinamis dan inovatif yang berkomitmen untuk menciptakan
                    produk yang luar biasa.
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'qualifications' && (
              <div>
                <h2 className="section-heading">Kualifikasi</h2>
                <p className="section-text">Kualifikasi akan ditampilkan di sini...</p>
              </div>
            )}

            {activeTab === 'company' && (
              <div>
                <h2 className="section-heading">Tentang Perusahaan</h2>
                <p className="section-text">Informasi perusahaan akan ditampilkan di sini...</p>
              </div>
            )}
          </div>
        </div>

        <aside className="job-detail-sidebar">
          <div className="action-buttons">
            <button className="apply-btn" onClick={handleApply}>
              Lamar Sekarang
            </button>
            <button className="save-job-btn">Simpan Lowongan</button>
          </div>

          <div className="company-card">
            <div className="company-logo">
              <Building2 className="logo-icon" />
              <span className="logo-text">TECH</span>
            </div>
            <h3 className="company-name">Tech Solutions Inc.</h3>
            <p className="company-industry">Teknologi Informasi</p>
            <Link to="/company" className="company-profile-link">
              Lihat Profil Perusahaan
            </Link>
          </div>

          <div className="job-details-card">
            <h3 className="card-title">Detail Lowongan</h3>
            <div className="detail-item">
              <span className="detail-label">Rentang Gaji:</span>
              <span className="detail-value">Rp 15jt - Rp 25jt</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tingkat Pengalaman:</span>
              <span className="detail-value">Senior</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tanggal Diposting:</span>
              <span className="detail-value">12 Agu 2024</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Industri:</span>
              <span className="detail-value">Perangkat Lunak</span>
            </div>
          </div>

          <div className="share-card">
            <h3 className="card-title">Bagikan Lowongan Ini</h3>
            <div className="share-buttons">
              <button className="share-btn">
                <Facebook className="share-icon" />
              </button>
              <button className="share-btn">
                <Twitter className="share-icon" />
              </button>
              <button className="share-btn">
                <Linkedin className="share-icon" />
              </button>
              <button className="share-btn">
                <LinkIcon className="share-icon" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetail;

