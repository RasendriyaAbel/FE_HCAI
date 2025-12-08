// Auto-fill data untuk testing/prototype
// Data akan otomatis terisi ketika user klik pada input/textarea

export const autoFillData = {
  // Personal Information
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+62 812-3456-7890',
  address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10220',
  location: 'Jakarta, Indonesia',
  
  // Professional Information
  linkedin: 'https://linkedin.com/in/johndoe',
  portfolio: 'https://johndoe-portfolio.com',
  summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about creating innovative solutions and leading cross-functional teams. Strong background in React, Node.js, and cloud technologies.',
  
  // Cover Letter / Application Letter
  coverLetter: `Dear Hiring Manager,

I am writing to express my strong interest in the position at your company. With over 5 years of experience in software development and a proven track record of delivering high-quality solutions, I am confident that I would be a valuable addition to your team.

My expertise includes:
- Full-stack development with React, Node.js, and modern JavaScript frameworks
- Cloud architecture and deployment (AWS, Azure)
- Agile methodologies and team leadership
- Problem-solving and innovative thinking

I am particularly drawn to this opportunity because of your company's commitment to innovation and excellence. I am excited about the possibility of contributing to your team and helping drive your mission forward.

Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experience align with your needs.

Best regards,
John Doe`,
  
  // Password (for testing)
  password: 'Test1234!',
  confirmPassword: 'Test1234!',
  
  // Job Application
  expectedSalary: 'Rp 20jt - Rp 25jt',
  
  // Experience
  companyName: 'Tech Solutions Inc.',
  position: 'Senior Software Engineer',
  jobDescription: 'Led development of scalable web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality software solutions.',
  
  // Education
  university: 'Universitas Indonesia',
  degree: 'Bachelor of Computer Science',
  major: 'Computer Science',
  
  // Skills
  skills: 'React, Node.js, JavaScript, TypeScript, Python, AWS, Docker, Git',
};

// Function untuk auto-fill input/textarea dengan React state update
export const createAutoFillHandler = (fieldName, setFormData) => {
  return (e) => {
    const element = e.target;
    const value = autoFillData[fieldName];
    
    // Hanya auto-fill jika field kosong
    if (value && !element.value) {
      // Update React state
      if (setFormData) {
        setFormData(prev => ({
          ...prev,
          [fieldName]: value
        }));
      } else {
        // Fallback: update langsung ke element
        element.value = value;
        const inputEvent = new Event('input', { bubbles: true });
        element.dispatchEvent(inputEvent);
        const changeEvent = new Event('change', { bubbles: true });
        element.dispatchEvent(changeEvent);
      }
    }
  };
};

// Hook untuk auto-fill dengan onClick dan onFocus
export const useAutoFill = (fieldName, setFormData) => {
  const handleAutoFill = createAutoFillHandler(fieldName, setFormData);
  
  return {
    onClick: handleAutoFill,
    onFocus: handleAutoFill,
  };
};

