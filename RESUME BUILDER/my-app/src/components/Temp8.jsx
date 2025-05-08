// Temp8.js
import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaPlus, FaTrash, FaMagic } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Notification from "./Notification";
import "./Temp8.css";
import html2pdf from 'html2pdf.js';

const Temp8 = () => {
  const defaultResume = {
    name: "THOMAS BEASLEY",
    title: "ENTRY-LEVEL RESUME",
    contact: {
      phone: "(206) 555-1234",
      address: "3665 McLaughlin Street, Seattle, WA 98039",
      email: "your-name@email.com",
    },
    summary:
      "Passionate Technology Assistant skilled at troubleshooting and repairing digital devices. Excellent people skills from managing the tech support desk at Seattle Community Center. Looking to secure an entry-level position in retail where I can utilize my strong customer service skills and technical knowledge to enhance the customer experience and contribute positively to the team at [Company Name].",
    education: [
      {
        degree: "Bachelor's Degree in Business Administration",
        date: "May 20XX",
        institution: "Spokane University",
        location: "Spokane, WA",
        gpa: "3.7/4.0",
        coursework: "Implementation of Contemporary Business Practices",
        dissertation:
          "Federal & State Business Law & Regulations, Introduction to HR Theory & Practices, Company Diversity and Inclusion, Introduction to Employer Contract Law",
      },
    ],
    experience: [
      {
        position: "Volunteer Technology Assistant",
        date: "May 20XX",
        organization: "Seattle Community Center",
        location: "Seattle, WA",
        responsibilities: [
          "Set up and repair technology devices for community members",
          "Manage service queues, ensuring community members receive timely updates on service status",
          "Engage with diverse clients to understand technology issues",
          "Document detailed notes and estimate completion times",
          "Collaborate closely with team members to maintain workflow and enhance service delivery",
        ],
      },
    ],
    skills: [
      "Customer service",
      "Team collaboration",
      "Troubleshooting",
      "Multitasking",
      "Organizing and scheduling",
      "Time management",
      "Verbal communication",
    ],
    hobbies: [
      "Coding: Recently completed a Python bootcamp",
      "Digital art: Create unique illustrations using Adobe Fresco",
      "Soccer: Play for a local team",
    ],
  };

  const [resume, setResume] = useState(defaultResume);

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    title: true,
    contact: true,
    summary: true,
    education: true,
    experience: true,
    skills: true,
    hobbies: true,
  });
  const settingsRef = useRef(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const saveResume = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resume));
      showNotification("Resume saved locally!", "success");
    } catch (error) {
      console.error("Save error:", error);
      showNotification("Failed to save resume locally", "error");
    }
  };

  // Update the downloadPdf function in Temp8.jsx
const downloadPdf = async () => {
  try {
    setIsLoading(true);
    const element = document.getElementById('resume-content');
    if (!element) {
      throw new Error('Resume content not found');
    }

    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove any action buttons from the clone
    const actionButtons = clone.querySelectorAll('.temp8-actions, .temp8-remove-resp-btn, .temp8-remove-skill-btn, .temp8-remove-hobby-btn, .temp8-settings-icon');
    actionButtons.forEach(button => button.remove());
    
    // Create a temporary wrapper with appropriate sizing
    const wrapper = document.createElement('div');
    wrapper.style.width = '8.5in';
    wrapper.style.margin = '0';
    wrapper.style.padding = '0.5in';
    wrapper.style.boxSizing = 'border-box';
    
    // Style the clone for printing
    clone.style.width = '100%';
    clone.style.padding = '0';
    clone.style.margin = '0';
    clone.style.maxWidth = 'none';
    clone.style.boxShadow = 'none';
    
    // Add the clone to the wrapper
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    
    // Configure PDF options for better text handling
    const options = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait',
        compress: true
      },
      fontFaces: [
        {
          family: 'Arial',
          style: 'normal'
        }
      ],
      enableLinks: true,
      pagebreak: { mode: 'avoid-all' }
    };

    // Generate the PDF
    await html2pdf().from(wrapper).set(options).save();
    
    // Clean up
    document.body.removeChild(wrapper);
    showNotification("PDF downloaded successfully!", "success");
  } catch (error) {
    console.error('Error generating PDF:', error);
    showNotification("Failed to generate PDF. Please try again.", "error");
  } finally {
    setIsLoading(false);
  }
};

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

  const handleFieldChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
    saveResume();
  };

  const handleContactChange = (field, value) => {
    setResume((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
    saveResume();
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resume.education];
    updatedEducation[index][field] = value;
    setResume((prev) => ({ ...prev, education: updatedEducation }));
    saveResume();
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[index][field] = value;
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
    saveResume();
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[expIndex].responsibilities[respIndex] = value;
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
    saveResume();
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[index] = value;
    setResume((prev) => ({ ...prev, skills: updatedSkills }));
    saveResume();
  };

  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...resume.hobbies];
    updatedHobbies[index] = value;
    setResume((prev) => ({ ...prev, hobbies: updatedHobbies }));
    saveResume();
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "New Degree",
          date: "Month Year",
          institution: "Institution Name",
          location: "Location",
          gpa: "GPA",
          coursework: "Relevant Coursework",
          dissertation: "Dissertation Title",
        },
      ],
    }));
    saveResume();
  };

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    saveResume();
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          position: "New Position",
          date: "Month Year",
          organization: "Organization Name",
          location: "Location",
          responsibilities: ["Responsibility description"],
        },
      ],
    }));
    saveResume();
  };

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
    saveResume();
  };

  const addResponsibility = (expIndex) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[expIndex].responsibilities.push("New responsibility");
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
    saveResume();
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[expIndex].responsibilities.splice(respIndex, 1);
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
    saveResume();
  };

  const addSkill = () => {
    setResume((prev) => ({ ...prev, skills: [...prev.skills, "New Skill"] }));
    saveResume();
  };

  const removeSkill = (index) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
    saveResume();
  };

  const addHobby = () => {
    setResume((prev) => ({ ...prev, hobbies: [...prev.hobbies, "New Hobby"] }));
    saveResume();
  };

  const removeHobby = (index) => {
    setResume((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index),
    }));
    saveResume();
  };

  return (
    <div className="temp8-container">
      <Sidebar
        onAddSection={() => {}}
        onSelectSection={() => {}}
        downloadPdf={downloadPdf}
        saveResume={saveResume}
      />

      <div className="temp8-resume" id="resume-content">
        {/* Header Section */}
        <header
          className="temp8-header"
          onClick={() => setActiveSection("header")}
        >
          {activeSection === "header" && (
            <FaCog
              className="temp8-settings-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
            />
          )}

          {showSettings && activeSection === "header" && (
            <div ref={settingsRef} className="temp8-settings-panel">
              {["name", "title", "contact"].map((field) => (
                <div key={field} className="temp8-setting-item">
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
              className="temp8-name"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("name", e.target.textContent)}
            >
              {resume.name}
            </h1>
          )}

          {visibleFields.title && (
            <h2
              className="temp8-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("title", e.target.textContent)}
            >
              {resume.title}
            </h2>
          )}

          {visibleFields.contact && (
            <div className="temp8-contact-info">
              <div className="temp8-contact-item">
                <span className="temp8-icon">PHONE •</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleContactChange("phone", e.target.textContent)
                  }
                >
                  {resume.contact.phone}
                </span>
              </div>
              <div className="temp8-contact-item">
                <span className="temp8-icon">ADDRESS •</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleContactChange("address", e.target.textContent)
                  }
                >
                  {resume.contact.address}
                </span>
              </div>
              <div className="temp8-contact-item">
                <span className="temp8-icon">EMAIL •</span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleContactChange("email", e.target.textContent)
                  }
                >
                  {resume.contact.email}
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Summary Section */}
        {visibleFields.summary && (
          <section
            className="temp8-section"
            onClick={() => setActiveSection("summary")}
          >
            <h3 className="temp8-section-title">SUMMARY</h3>
            <p
              className="temp8-summary-text"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("summary", e.target.textContent)}
            >
              {resume.summary}
            </p>
          </section>
        )}

        {/* Education Section */}
        {visibleFields.education && (
          <section
            className="temp8-section"
            onClick={() => setActiveSection("education")}
          >
            <h3 className="temp8-section-title">EDUCATION</h3>
            {resume.education && resume.education.map((edu, index) => (
              <div key={index} className="temp8-education-item">
                <div className="temp8-education-header">
                  <span
                    className="temp8-degree"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleEducationChange(
                        index,
                        "degree",
                        e.target.textContent
                      )
                    }
                  >
                    {edu.degree}
                  </span>
                  <span
                    className="temp8-date"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleEducationChange(index, "date", e.target.textContent)
                    }
                  >
                    {edu.date}
                  </span>
                </div>
                <div
                  className="temp8-institution"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleEducationChange(
                      index,
                      "institution",
                      e.target.textContent
                    )
                  }
                >
                  {edu.institution} |{" "}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleEducationChange(
                        index,
                        "location",
                        e.target.textContent
                      )
                    }
                  >
                    {edu.location}
                  </span>
                </div>
                <div
                  className="temp8-gpa"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleEducationChange(index, "gpa", e.target.textContent)
                  }
                >
                  GPA: {edu.gpa}
                </div>
                <div className="temp8-coursework">
                  <strong>Relevant Coursework:</strong>{" "}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleEducationChange(
                        index,
                        "coursework",
                        e.target.textContent
                      )
                    }
                  >
                    {edu.coursework}
                  </span>
                </div>
                <div className="temp8-dissertation">
                  <strong>Dissertation Title:</strong>{" "}
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleEducationChange(
                        index,
                        "dissertation",
                        e.target.textContent
                      )
                    }
                  >
                    {edu.dissertation}
                  </span>
                </div>

                {activeSection === "education" && (
                  <div className="temp8-actions">
                    <button
                      className="temp8-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addEducation();
                      }}
                    >
                      <FaPlus /> Add Education
                    </button>
                    {resume.education.length > 1 && (
                      <button
                        className="temp8-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEducation(index);
                        }}
                      >
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Experience Section */}
        {visibleFields.experience && (
          <section
            className="temp8-section"
            onClick={() => setActiveSection("experience")}
          >
            <h3 className="temp8-section-title">RELEVANT EXPERIENCE</h3>
            {resume.experience && resume.experience.map((exp, expIndex) => (
              <div key={expIndex} className="temp8-experience-item">
                <div className="temp8-experience-header">
                  <span
                    className="temp8-position"
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
                  <span
                    className="temp8-date"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleExperienceChange(
                        expIndex,
                        "date",
                        e.target.textContent
                      )
                    }
                  >
                    {exp.date}
                  </span>
                </div>
                <div
                  className="temp8-organization"
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
                  {exp.organization} |{" "}
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
                <ul className="temp8-responsibilities">
                  {Array.isArray(exp.responsibilities) && exp.responsibilities.map((resp, respIndex) => (
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
                          className="temp8-remove-resp-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeResponsibility(expIndex, respIndex);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                {activeSection === "experience" && (
                  <div className="temp8-actions">
                    <button
                      className="temp8-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addExperience();
                      }}
                    >
                      <FaPlus /> Add Experience
                    </button>
                    <button
                      className="temp8-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addResponsibility(expIndex);
                      }}
                    >
                      <FaPlus /> Add Responsibility
                    </button>
                    {resume.experience.length > 1 && (
                      <button
                        className="temp8-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeExperience(expIndex);
                        }}
                      >
                        <FaTrash /> Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {visibleFields.skills && (
          <section
            className="temp8-section"
            onClick={() => setActiveSection("skills")}
          >
            <h3 className="temp8-section-title">KEY SKILLS</h3>
            <div className="temp8-skills-container">
              {resume.skills && resume.skills.map((skill, index) => (
                <span key={index} className="temp8-skill-item">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleSkillChange(index, e.target.textContent)
                    }
                  >
                    {skill}
                  </span>
                  {activeSection === "skills" && (
                    <button
                      className="temp8-remove-skill-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSkill(index);
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {activeSection === "skills" && (
              <button
                className="temp8-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addSkill();
                }}
              >
                <FaPlus /> Add Skill
              </button>
            )}
          </section>
        )}

        {/* Hobbies Section */}
        {visibleFields.hobbies && (
          <section
            className="temp8-section"
            onClick={() => setActiveSection("hobbies")}
          >
            <h3 className="temp8-section-title">HOBBIES & INTERESTS</h3>
            <ul className="temp8-hobbies-list">
              {resume.hobbies && resume.hobbies.map((hobby, index) => (
                <li key={index}>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleHobbyChange(index, e.target.textContent)
                    }
                  >
                    {hobby}
                  </span>
                  {activeSection === "hobbies" && (
                    <button
                      className="temp8-remove-hobby-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHobby(index);
                      }}
                    >
                      <FaTrash />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            {activeSection === "hobbies" && (
              <button
                className="temp8-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addHobby();
                }}
              >
                <FaPlus /> Add Hobby
              </button>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Temp8;