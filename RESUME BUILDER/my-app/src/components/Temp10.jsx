import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaPlus, FaTrash, FaDownload, FaSave } from "react-icons/fa";
import Temp10Sidebar from "./Temp10Sidebar";
import "./Temp10.css";
import "./Temp10Sidebar.css";
import axios from 'axios';

const Temp10 = () => {
  const [resume, setResume] = useState({
    name: "JOHN DOE",
    title: "SOFTWARE ENGINEER",
    contact: {
      phone: "(123) 456-7890",
      email: "john.doe@example.com",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
    },
    summary:
      "Results-driven software engineer with 5+ years of experience in full-stack development. Specialized in JavaScript frameworks and cloud technologies. Passionate about creating efficient, scalable solutions that drive business growth.",
    experience: [
      {
        position: "Senior Software Engineer",
        organization: "Tech Solutions Inc.",
        duration: "2019 - Present",
        location: "San Francisco, CA",
        responsibilities: [
          "Led a team of 5 developers to deliver a SaaS product with 50,000+ active users",
          "Reduced API response time by 40% through optimization techniques",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
        ],
      },
      {
        position: "Software Developer",
        organization: "Digital Innovations LLC",
        duration: "2016 - 2019",
        location: "Austin, TX",
        responsibilities: [
          "Developed responsive web applications using React and Node.js",
          "Collaborated with UX team to improve customer satisfaction by 35%",
          "Mentored junior developers in best practices and code reviews",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Stanford University",
        duration: "2014 - 2016",
        gpa: "3.8/4.0",
      },
      {
        degree: "Bachelor of Science in Computer Engineering",
        institution: "University of Texas",
        duration: "2010 - 2014",
        gpa: "3.6/4.0",
      },
    ],
    skills: [
      "JavaScript (ES6+)",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "SQL/NoSQL",
      "Git",
      "Agile Methodologies",
      "RESTful APIs",
    ],
    certifications: [
      "AWS Certified Solutions Architect - Associate",
      "Google Cloud Professional Developer",
      "Scrum Master Certification",
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment integration",
        technologies: "React, Node.js, MongoDB, Stripe API",
      },
      {
        name: "Task Management App",
        description:
          "Collaborative project management tool with real-time updates",
        technologies: "Vue.js, Firebase, WebSockets",
      },
    ],
  });

  const [designOptions, setDesignOptions] = useState({
    color: "#3498db",
    font: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  });

  const [activeSection, setActiveSection] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    title: true,
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
    projects: true,
  });
  const settingsRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--primary-color",
      designOptions.color
    );
    document.documentElement.style.setProperty(
      "--primary-color-light",
      `${designOptions.color}80`
    );
    document.documentElement.style.setProperty(
      "--font-family",
      designOptions.font
    );
  }, [designOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler functions
  const handleColorChange = (color) => {
    setDesignOptions((prev) => ({ ...prev, color }));
  };

  const handleFontChange = (font) => {
    setDesignOptions((prev) => ({ ...prev, font }));
  };

  const handleFieldChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[index][field] = value;
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[expIndex].responsibilities[respIndex] = value;
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          position: "New Position",
          organization: "Company Name",
          duration: "YYYY - YYYY",
          location: "City, State",
          responsibilities: ["Responsibility description"],
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, "New Skill"],
    }));
  };

  const removeSkill = (index) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index, value) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "New Degree",
          institution: "Institution Name",
          duration: "YYYY - YYYY",
          gpa: "GPA",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const addCertification = () => {
    setResume((prev) => ({
      ...prev,
      certifications: [...prev.certifications, "New Certification"],
    }));
  };

  const removeCertification = (index) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleCertificationChange = (index, value) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? value : cert
      ),
    }));
  };

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: "New Project",
          description: "Project description",
          technologies: "Technologies used",
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((project, i) =>
        i === index ? { ...project, [field]: value } : project
      ),
    }));
  };

  // Save resume to backend
  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/resume/save", {
        resumeData: {
          name: resume.name,
          role: resume.title, // mapping title to role
          email: resume.contact.email,
          phone: resume.contact.phone,
          linkedin: resume.contact.linkedin,
          summary: resume.summary,
          experience: resume.experience.map(exp => ({
            title: exp.position,
            companyName: exp.organization,
            Startdate: exp.duration.split('-')[0].trim(),
            end_data: exp.duration.split('-')[1]?.trim() || 'Present',
            companyLocation: exp.location,
            description: exp.responsibilities.join('\n'),
          })),
          education: resume.education.map(edu => ({
            degree: edu.degree,
            institution: edu.institution,
            duration: edu.duration,
            grade: edu.gpa
          })),
          skills: resume.skills,
          projects: resume.projects.map(proj => ({
            title: proj.name,
            description: proj.description,
            duration: '', // Add duration if available in your data
          })),
          certifications: resume.certifications.map(cert => ({
            certificates: cert,
            link: '', // Add link if available in your data
            issueDate: '', // Add dates if available in your data
            expiryDate: ''
          }))
        }
      });
      alert("✅ Resume saved successfully!");
    } catch (err) {
      console.error("Error saving resume:", err);
      alert("❌ Failed to save resume.");
    }
  };

  // Generate PDF
  const downloadPDF = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/api/resume/generate-pdf',
        data: { 
          resumeData: resume,
          designOptions: {
            color: designOptions.color,
            font: designOptions.font
          }
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${resume.name.replace(/\s+/g, '_')}_resume.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF. Please try again.');
    }
  };

  // Enhance a specific field with AI
  const enhanceField = async (fieldName, content) => {
    try {
      const response = await axios.post("http://localhost:5000/api/resume/enhanceField", {
        field: fieldName,
        content: content
      });
      
      if (response.data && response.data.data) {
        // Update the specific field in the resume state
        setResume(prev => ({
          ...prev,
          [fieldName]: response.data.data
        }));
        alert("✨ Content enhanced successfully!");
      }
    } catch (err) {
      console.error("Error enhancing field:", err);
      alert("❌ Failed to enhance content.");
    }
  };

  return (
    <div className="temp10-container">
      <Temp10Sidebar
        onDownload={downloadPDF}
        onSave={handleSave}
        onEnhance={() => enhanceField("summary", resume.summary)}
        onColorChange={handleColorChange}
        onFontChange={handleFontChange}
        currentColor={designOptions.color}
        currentFont={designOptions.font}
      />

      <div className="temp10-resume">
        {/* Header Section */}
        <header
          className="temp10-header"
          onClick={() => setActiveSection("header")}
        >
          {activeSection === "header" && (
            <FaCog
              className="temp10-settings-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
            />
          )}

          {showSettings && activeSection === "header" && (
            <div ref={settingsRef} className="temp10-settings-panel">
              {Object.keys(visibleFields).map((field) => (
                <div key={field} className="temp10-setting-item">
                  <label>
                    <input
                      type="checkbox"
                      checked={visibleFields[field]}
                      onChange={() =>
                        setVisibleFields((prev) => ({
                          ...prev,
                          [field]: !prev[field],
                        }))
                      }
                    />
                    Show {field}
                  </label>
                </div>
              ))}
            </div>
          )}

          {visibleFields.name && (
            <h1
              className="temp10-name"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("name", e.target.textContent)}
            >
              {resume.name}
            </h1>
          )}

          {visibleFields.title && (
            <h2
              className="temp10-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("title", e.target.textContent)}
            >
              {resume.title}
            </h2>
          )}

          {visibleFields.contact && (
            <div className="temp10-contact-info">
              {Object.entries(resume.contact).map(([key, value]) => (
                <div
                  key={key}
                  className="temp10-contact-item"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleContactChange(key, e.target.textContent)}
                >
                  {value}
                </div>
              ))}
            </div>
          )}
        </header>

        <hr className="temp10-divider" />

        {/* Summary Section */}
        {visibleFields.summary && (
          <section
            className="temp10-section"
            onClick={() => setActiveSection("summary")}
          >
            <h3 className="temp10-section-title">PROFESSIONAL SUMMARY</h3>
            <p
              className="temp10-summary-text"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("summary", e.target.textContent)}
            >
              {resume.summary}
            </p>
          </section>
        )}

        {/* Professional Experience Section */}
        {visibleFields.experience && (
          <section
            className="temp10-section"
            onClick={() => setActiveSection("experience")}
          >
            <h3 className="temp10-section-title">PROFESSIONAL EXPERIENCE</h3>
            {resume.experience.map((exp, expIndex) => (
              <div key={expIndex} className="temp10-experience-item">
                <div className="temp10-experience-header">
                  <div>
                    <span
                      className="temp10-position"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleExperienceChange(
                          expIndex,
                          "position",
                          e.target.textContent
                        )
                      }
                    >
                      {exp.position}
                    </span>
                    {exp.organization && (
                      <span
                        className="temp10-organization"
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleExperienceChange(
                            expIndex,
                            "organization",
                            e.target.textContent
                          )
                        }
                      >
                        , {exp.organization}
                      </span>
                    )}
                  </div>
                  <div className="temp10-experience-meta">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleExperienceChange(
                          expIndex,
                          "duration",
                          e.target.textContent
                        )
                      }
                    >
                      {exp.duration}
                    </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleExperienceChange(
                          expIndex,
                          "location",
                          e.target.textContent
                        )
                      }
                    >
                      {exp.location}
                    </span>
                  </div>
                </div>
                <ul className="temp10-responsibilities">
                  {exp.responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleResponsibilityChange(
                            expIndex,
                            respIndex,
                            e.target.textContent
                          )
                        }
                      >
                        {resp}
                      </span>
                      {activeSection === "experience" && (
                        <button
                          className="temp10-remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeExperience(expIndex);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {activeSection === "experience" && (
                  <div className="temp10-actions">
                    <button
                      className="temp10-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addExperience();
                      }}
                    >
                      <FaPlus /> Add Experience
                    </button>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education Section */}
        {visibleFields.education && (
          <section
            className="temp10-section"
            onClick={() => setActiveSection("education")}
          >
            <h3 className="temp10-section-title">EDUCATION</h3>
            {resume.education.map((edu, eduIndex) => (
              <div key={eduIndex} className="temp10-education-item">
                <div className="temp10-education-header">
                  <div>
                    <span
                      className="temp10-degree"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleEducationChange(
                          eduIndex,
                          "degree",
                          e.target.textContent
                        )
                      }
                    >
                      {edu.degree}
                    </span>
                    <span
                      className="temp10-institution"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleEducationChange(
                          eduIndex,
                          "institution",
                          e.target.textContent
                        )
                      }
                    >
                      , {edu.institution}
                    </span>
                  </div>
                  <div className="temp10-education-meta">
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleEducationChange(
                          eduIndex,
                          "duration",
                          e.target.textContent
                        )
                      }
                    >
                      {edu.duration}
                    </span>
                    {edu.gpa && (
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleEducationChange(
                            eduIndex,
                            "gpa",
                            e.target.textContent
                          )
                        }
                      >
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
                {activeSection === "education" && (
                  <div className="temp10-actions">
                    <button
                      className="temp10-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeEducation(eduIndex);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {activeSection === "education" && (
              <div className="temp10-actions">
                <button
                  className="temp10-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addEducation();
                  }}
                >
                  <FaPlus /> Add Education
                </button>
              </div>
            )}
          </section>
        )}

        {/* Skills Section */}
        {visibleFields.skills && (
          <section
            className="temp10-section"
            onClick={() => setActiveSection("skills")}
          >
            <h3 className="temp10-section-title">TECHNICAL SKILLS</h3>
            <div className="temp10-skills">
              {resume.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="temp10-skill-tag"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleSkillChange(skillIndex, e.target.textContent)
                  }
                >
                  {skill}
                  {activeSection === "skills" && (
                    <button
                      className="temp10-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkill(skillIndex);
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {activeSection === "skills" && (
              <div className="temp10-actions">
                <button
                  className="temp10-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addSkill();
                  }}
                >
                  <FaPlus /> Add Skill
                </button>
              </div>
            )}
          </section>
        )}

        {/* Certifications Section */}
        {visibleFields.certifications && (
          <section
            className="temp10-section"
            onClick={() => setActiveSection("certifications")}
          >
            <h3 className="temp10-section-title">CERTIFICATIONS</h3>
            <ul className="temp10-certifications">
              {resume.certifications.map((cert, certIndex) => (
                <li key={certIndex}>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleCertificationChange(certIndex, e.target.textContent)
                    }
                  >
                    {cert}
                  </span>
                  {activeSection === "certifications" && (
                    <button
                      className="temp10-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCertification(certIndex);
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {activeSection === "certifications" && (
              <div className="temp10-actions">
                <button
                  className="temp10-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addCertification();
                  }}
                >
                  <FaPlus /> Add Certification
                </button>
              </div>
            )}
          </section>
        )}

        {/* Projects Section */}
        {visibleFields.projects && (
          <section
            className="temp10-section"
            onClick={() => setActiveSection("projects")}
          >
            <h3 className="temp10-section-title">PROJECTS</h3>
            {resume.projects.map((project, projIndex) => (
              <div key={projIndex} className="temp10-project-item">
                <h4
                  className="temp10-project-name"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleProjectChange(projIndex, "name", e.target.textContent)
                  }
                >
                  {project.name}
                </h4>
                <p
                  className="temp10-project-description"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleProjectChange(
                      projIndex,
                      "description",
                      e.target.textContent
                    )
                  }
                >
                  {project.description}
                </p>
                <p
                  className="temp10-project-tech"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleProjectChange(
                      projIndex,
                      "technologies",
                      e.target.textContent
                    )
                  }
                >
                  <strong>Technologies:</strong> {project.technologies}
                </p>
                {activeSection === "projects" && (
                  <div className="temp10-actions">
                    <button
                      className="temp10-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProject(projIndex);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
            {activeSection === "projects" && (
              <div className="temp10-actions">
                <button
                  className="temp10-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addProject();
                  }}
                >
                  <FaPlus /> Add Project
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Temp10;
