import React, { useState, useRef, useEffect } from "react";
import { FaCog, FaPlus, FaTrash } from "react-icons/fa";
import Sidebar from "./Temp5Sidebar";
import "./Temp5.css";

const Temp5 = () => {
  const [resume, setResume] = useState({
    name: "ESTELLE DARCY",
    title: "PROCESS ENGINEER",
    contact: {
      address: "123 Anywhere St., Any City",
      email: "hello@reallygreatsite.com",
      website: "www.reallygreatsite.com",
    },
    summary:
      "Practical Engineer with Significant Experience in Process Design, I have worked with some organizations, ensuring a grounded approach to my profession, leveraging my expertise to optimize processes and deliver innovative solutions that meet business objectives.",
    experience: [
      {
        position: "Instrument Tech",
        organization: "Morcelle Program",
        responsibilities: [
          "Led development of an advanced automation system, achieving a 15% increase in operational efficiency.",
          "Streamlined manufacturing processes, reducing production costs by 10%.",
          "Implemented preventive maintenance strategies, resulting in a 20% decrease in equipment downtime.",
        ],
      },
      {
        position: "Internship",
        organization: "XarrowAI Industries",
        responsibilities: [
          "Designed and optimised a robotic control system, realizing a 12% performance improvement.",
          "Coordinated testing and validation, ensuring compliance with industry standards.",
          "Provided technical expertise, contributing to a 15% reduction in system failures.",
        ],
      },
    ],
    projects: [
      {
        title: "Industrial Basics and General Application",
        organization: "University of Engineering Process Cohort",
        details: [
          "Automotive Technology.",
          "Technological Advancements within the current Chemical & Process Industry.",
          "Other relevant information.",
        ],
      },
    ],
    skills: [
      { category: "Prototyping Tools", items: ["User Research"] },
      { category: "Interaction Design", items: ["Visual Design"] },
      { category: "Accessibility", items: ["Responsive Design"] },
    ],
    education: [
      {
        degree: "Bachelor of Design in Process Engineering",
        institution: "Engineering University",
        details: [
          "Relevant coursework in Process Design and Project Management.",
        ],
      },
    ],
    additionalInfo: {
      languages: ["English", "French", "Mandarin"],
      certifications: [
        "Professional Design Engineer (PDE) License",
        "Project Management Tech (PMT)",
        "Structural Process Design (SPD)",
      ],
      awards: [
        "Most Innovative Intern of the Year (2022)",
        "Overall Best Intern, Division Two (2022)",
        "Onboarding Project Lead (2024)",
      ],
    },
  });

  const [activeSection, setActiveSection] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [visibleFields, setVisibleFields] = useState({
    name: true,
    title: true,
    contact: true,
    summary: true,
    experience: true,
    projects: true,
    skills: true,
    education: true,
    additionalInfo: true,
  });
  const settingsRef = useRef(null);

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

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...resume.projects];
    updatedProjects[index][field] = value;
    setResume((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const handleProjectDetailChange = (projIndex, detailIndex, value) => {
    const updatedProjects = [...resume.projects];
    updatedProjects[projIndex].details[detailIndex] = value;
    setResume((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const handleSkillCategoryChange = (index, value) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[index].category = value;
    setResume((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleSkillItemChange = (catIndex, skillIndex, value) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[catIndex].items[skillIndex] = value;
    setResume((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...resume.education];
    updatedEducation[index][field] = value;
    setResume((prev) => ({ ...prev, education: updatedEducation }));
  };

  const handleEducationDetailChange = (eduIndex, detailIndex, value) => {
    const updatedEducation = [...resume.education];
    updatedEducation[eduIndex].details[detailIndex] = value;
    setResume((prev) => ({ ...prev, education: updatedEducation }));
  };

  const handleAdditionalInfoChange = (field, index, value) => {
    const updatedAdditionalInfo = { ...resume.additionalInfo };
    updatedAdditionalInfo[field][index] = value;
    setResume((prev) => ({ ...prev, additionalInfo: updatedAdditionalInfo }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          position: "New Position",
          organization: "Organization Name",
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

  const addResponsibility = (expIndex) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[expIndex].responsibilities.push("New responsibility");
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const removeResponsibility = (expIndex, respIndex) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[expIndex].responsibilities.splice(respIndex, 1);
    setResume((prev) => ({ ...prev, experience: updatedExperience }));
  };

  const addProject = () => {
    setResume((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "New Project",
          organization: "Organization",
          details: ["Project detail"],
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

  const addProjectDetail = (projIndex) => {
    const updatedProjects = [...resume.projects];
    updatedProjects[projIndex].details.push("New project detail");
    setResume((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const removeProjectDetail = (projIndex, detailIndex) => {
    const updatedProjects = [...resume.projects];
    updatedProjects[projIndex].details.splice(detailIndex, 1);
    setResume((prev) => ({ ...prev, projects: updatedProjects }));
  };

  const addSkillCategory = () => {
    setResume((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { category: "New Category", items: ["New Skill"] },
      ],
    }));
  };

  const removeSkillCategory = (index) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addSkillItem = (catIndex) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[catIndex].items.push("New Skill");
    setResume((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const removeSkillItem = (catIndex, skillIndex) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[catIndex].items.splice(skillIndex, 1);
    setResume((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "New Degree",
          institution: "Institution Name",
          details: ["Detail about education"],
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

  const addEducationDetail = (eduIndex) => {
    const updatedEducation = [...resume.education];
    updatedEducation[eduIndex].details.push("New education detail");
    setResume((prev) => ({ ...prev, education: updatedEducation }));
  };

  const removeEducationDetail = (eduIndex, detailIndex) => {
    const updatedEducation = [...resume.education];
    updatedEducation[eduIndex].details.splice(detailIndex, 1);
    setResume((prev) => ({ ...prev, education: updatedEducation }));
  };

  const addAdditionalInfoItem = (field) => {
    const updatedAdditionalInfo = { ...resume.additionalInfo };
    updatedAdditionalInfo[field].push(`New ${field} item`);
    setResume((prev) => ({ ...prev, additionalInfo: updatedAdditionalInfo }));
  };

  const removeAdditionalInfoItem = (field, index) => {
    const updatedAdditionalInfo = { ...resume.additionalInfo };
    updatedAdditionalInfo[field].splice(index, 1);
    setResume((prev) => ({ ...prev, additionalInfo: updatedAdditionalInfo }));
  };

  return (
    <div className="temp5-container">
      <Sidebar
        onDownload={() => console.log("Download PDF")}
        onSave={() => console.log("Save Resume")}
      />

      <div className="temp5-resume">
        {/* Header Section */}
        <header
          className="temp5-header"
          onClick={() => setActiveSection("header")}
        >
          {activeSection === "header" && (
            <FaCog
              className="temp5-settings-icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowSettings(!showSettings);
              }}
            />
          )}

          {showSettings && activeSection === "header" && (
            <div ref={settingsRef} className="temp5-settings-panel">
              {["name", "title", "contact"].map((field) => (
                <div key={field} className="temp5-setting-item">
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
              className="temp5-name"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("name", e.target.textContent)}
            >
              {resume.name}
            </h1>
          )}

          {visibleFields.title && (
            <h2
              className="temp5-title"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleFieldChange("title", e.target.textContent)}
            >
              {resume.title}
            </h2>
          )}

          {visibleFields.contact && (
            <div className="temp5-contact-info">
              <div
                className="temp5-contact-item"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleContactChange("address", e.target.textContent)
                }
              >
                {resume.contact.address}
              </div>
              <div
                className="temp5-contact-item"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleContactChange("email", e.target.textContent)
                }
              >
                {resume.contact.email}
              </div>
              <div
                className="temp5-contact-item"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleContactChange("website", e.target.textContent)
                }
              >
                {resume.contact.website}
              </div>
            </div>
          )}
        </header>

        <hr className="temp5-divider" />

        {/* Summary Section */}
        {visibleFields.summary && (
          <section
            className="temp5-section"
            onClick={() => setActiveSection("summary")}
          >
            <h3 className="temp5-section-title">SUMMARY</h3>
            <p
              className="temp5-summary-text"
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
            className="temp5-section"
            onClick={() => setActiveSection("experience")}
          >
            <h3 className="temp5-section-title">PROFESSIONAL EXPERIENCE</h3>
            {resume.experience.map((exp, expIndex) => (
              <div key={expIndex} className="temp5-experience-item">
                <div className="temp5-experience-header">
                  <span
                    className="temp5-position"
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
                      className="temp5-organization"
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
                <ul className="temp5-responsibilities">
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
                          className="temp5-remove-resp-btn"
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
                  <div className="temp5-actions">
                    <button
                      className="temp5-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addExperience();
                      }}
                    >
                      <FaPlus /> Add Experience
                    </button>
                    <button
                      className="temp5-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addResponsibility(expIndex);
                      }}
                    >
                      <FaPlus /> Add Responsibility
                    </button>
                    {resume.experience.length > 1 && (
                      <button
                        className="temp5-remove-btn"
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

        {/* Projects Section */}
        {visibleFields.projects && (
          <section
            className="temp5-section"
            onClick={() => setActiveSection("projects")}
          >
            <h3 className="temp5-section-title">PROJECTS</h3>
            {resume.projects.map((proj, projIndex) => (
              <div key={projIndex} className="temp5-project-item">
                <div className="temp5-project-header">
                  <span
                    className="temp5-project-title"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={(e) =>
                      handleProjectChange(
                        projIndex,
                        "title",
                        e.target.textContent
                      )
                    }
                  >
                    {proj.title}
                  </span>
                  {proj.organization && (
                    <span
                      className="temp5-project-org"
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleProjectChange(
                          projIndex,
                          "organization",
                          e.target.textContent
                        )
                      }
                    >
                      {proj.organization}
                    </span>
                  )}
                </div>
                <ul className="temp5-project-details">
                  {proj.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleProjectDetailChange(
                            projIndex,
                            detailIndex,
                            e.target.textContent
                          )
                        }
                      >
                        {detail}
                      </span>
                      {activeSection === "projects" && (
                        <button
                          className="temp5-remove-detail-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeProjectDetail(projIndex, detailIndex);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                {activeSection === "projects" && (
                  <div className="temp5-actions">
                    <button
                      className="temp5-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addProject();
                      }}
                    >
                      <FaPlus /> Add Project
                    </button>
                    <button
                      className="temp5-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addProjectDetail(projIndex);
                      }}
                    >
                      <FaPlus /> Add Detail
                    </button>
                    {resume.projects.length > 1 && (
                      <button
                        className="temp5-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProject(projIndex);
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
            className="temp5-section"
            onClick={() => setActiveSection("skills")}
          >
            <h3 className="temp5-section-title">SKILLS</h3>
            <div className="temp5-skills-table">
              <table>
                <tbody>
                  <tr>
                    {resume.skills.map((skillCategory, catIndex) => (
                      <td key={catIndex} className="temp5-skill-column">
                        <div
                          className="temp5-skill-category"
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) =>
                            handleSkillCategoryChange(
                              catIndex,
                              e.target.textContent
                            )
                          }
                        >
                          {skillCategory.category}
                        </div>
                        <ul className="temp5-skill-items">
                          {skillCategory.items.map((skill, skillIndex) => (
                            <li key={skillIndex}>
                              <span
                                contentEditable
                                suppressContentEditableWarning
                                onBlur={(e) =>
                                  handleSkillItemChange(
                                    catIndex,
                                    skillIndex,
                                    e.target.textContent
                                  )
                                }
                              >
                                {skill}
                              </span>
                              {activeSection === "skills" && (
                                <button
                                  className="temp5-remove-skill-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeSkillItem(catIndex, skillIndex);
                                  }}
                                >
                                  <FaTrash />
                                </button>
                              )}
                            </li>
                          ))}
                        </ul>
                        {activeSection === "skills" && (
                          <button
                            className="temp5-add-skill-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              addSkillItem(catIndex);
                            }}
                          >
                            <FaPlus /> Add Skill
                          </button>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            {activeSection === "skills" && (
              <button
                className="temp5-add-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addSkillCategory();
                }}
              >
                <FaPlus /> Add Skill Category
              </button>
            )}
          </section>
        )}

        {/* Education Section */}
        {visibleFields.education && (
          <section
            className="temp5-section"
            onClick={() => setActiveSection("education")}
          >
            <h3 className="temp5-section-title">EDUCATION</h3>
            {resume.education.map((edu, eduIndex) => (
              <div key={eduIndex} className="temp5-education-item">
                <div className="temp5-education-header">
                  <span
                    className="temp5-degree"
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
                    className="temp5-institution"
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
                    {edu.institution}
                  </span>
                </div>
                <ul className="temp5-education-details">
                  {edu.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleEducationDetailChange(
                            eduIndex,
                            detailIndex,
                            e.target.textContent
                          )
                        }
                      >
                        {detail}
                      </span>
                      {activeSection === "education" && (
                        <button
                          className="temp5-remove-detail-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeEducationDetail(eduIndex, detailIndex);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                {activeSection === "education" && (
                  <div className="temp5-actions">
                    <button
                      className="temp5-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addEducation();
                      }}
                    >
                      <FaPlus /> Add Education
                    </button>
                    <button
                      className="temp5-add-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addEducationDetail(eduIndex);
                      }}
                    >
                      <FaPlus /> Add Detail
                    </button>
                    {resume.education.length > 1 && (
                      <button
                        className="temp5-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeEducation(eduIndex);
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

        {/* Additional Information Section */}
        {visibleFields.additionalInfo && (
          <section
            className="temp5-section"
            onClick={() => setActiveSection("additionalInfo")}
          >
            <h3 className="temp5-section-title">ADDITIONAL INFORMATION</h3>
            <div className="temp5-additional-info">
              <div className="temp5-info-category">
                <h4 className="temp5-info-category-title">Languages:</h4>
                <ul className="temp5-info-items">
                  {resume.additionalInfo.languages.map((lang, index) => (
                    <li key={index}>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleAdditionalInfoChange(
                            "languages",
                            index,
                            e.target.textContent
                          )
                        }
                      >
                        {lang}
                      </span>
                      {activeSection === "additionalInfo" && (
                        <button
                          className="temp5-remove-info-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAdditionalInfoItem("languages", index);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {activeSection === "additionalInfo" && (
                  <button
                    className="temp5-add-info-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addAdditionalInfoItem("languages");
                    }}
                  >
                    <FaPlus /> Add Language
                  </button>
                )}
              </div>

              <div className="temp5-info-category">
                <h4 className="temp5-info-category-title">Certifications:</h4>
                <ul className="temp5-info-items">
                  {resume.additionalInfo.certifications.map((cert, index) => (
                    <li key={index}>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleAdditionalInfoChange(
                            "certifications",
                            index,
                            e.target.textContent
                          )
                        }
                      >
                        {cert}
                      </span>
                      {activeSection === "additionalInfo" && (
                        <button
                          className="temp5-remove-info-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAdditionalInfoItem("certifications", index);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {activeSection === "additionalInfo" && (
                  <button
                    className="temp5-add-info-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addAdditionalInfoItem("certifications");
                    }}
                  >
                    <FaPlus /> Add Certification
                  </button>
                )}
              </div>

              <div className="temp5-info-category">
                <h4 className="temp5-info-category-title">
                  Awards/Activities:
                </h4>
                <ul className="temp5-info-items">
                  {resume.additionalInfo.awards.map((award, index) => (
                    <li key={index}>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) =>
                          handleAdditionalInfoChange(
                            "awards",
                            index,
                            e.target.textContent
                          )
                        }
                      >
                        {award}
                      </span>
                      {activeSection === "additionalInfo" && (
                        <button
                          className="temp5-remove-info-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAdditionalInfoItem("awards", index);
                          }}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                {activeSection === "additionalInfo" && (
                  <button
                    className="temp5-add-info-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      addAdditionalInfoItem("awards");
                    }}
                  >
                    <FaPlus /> Add Award/Activity
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Temp5;
