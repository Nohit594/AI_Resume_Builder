import React, { useState, useEffect } from "react";
import {
  FaDownload,
  FaRobot,
  FaPalette,
  FaFileExport,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Temp5Sidebar.css";

const Sidebar = ({ onDownload, onAIAssist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(true); // Always open on desktop
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile && (
        <button className="temp5-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div
        className={`temp5-sidebar ${isOpen ? "open" : ""} ${
          !isMobile ? "desktop" : ""
        }`}
      >
        <div className="temp5-sidebar-header">
          <h3>Resume Tools</h3>
          <div className="temp5-sidebar-divider"></div>
        </div>

        <div className="temp5-sidebar-actions">
          <button className="temp5-sidebar-btn primary" onClick={onDownload}>
            <FaDownload className="temp5-sidebar-icon" />
            <span>Download PDF</span>
          </button>

          <button className="temp5-sidebar-btn ai" onClick={onAIAssist}>
            <FaRobot className="temp5-sidebar-icon" />
            <span>AI Assistant</span>
          </button>

          <button className="temp5-sidebar-btn">
            <FaFileExport className="temp5-sidebar-icon" />
            <span>Save Resume</span>
          </button>
        </div>

        <div className="temp5-sidebar-footer">
          <div className="temp5-progress-container">
            <div className="temp5-progress-label">Resume Strength</div>
            <div className="temp5-progress-bar">
              <div
                className="temp5-progress-fill"
                style={{ width: "89%" }}
              ></div>
            </div>
            <div className="temp5-progress-value">89%</div>
          </div>
          <div className="temp5-tip">
            <strong>Pro Tip:</strong> Use the AI Assistant to optimize for ATS
            compatibility.
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
