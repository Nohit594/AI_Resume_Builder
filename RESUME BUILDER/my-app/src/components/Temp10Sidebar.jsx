import React, { useState } from "react";
import {
  FaDownload,
  FaSave,
  FaPalette,
  FaFilePdf,
  FaBars,
  FaTimes,
  FaFont,
  FaMagic,
} from "react-icons/fa";

/*const Temp10Sidebar = ({ onSave, onDownload, onEnhance }) => {
  return (
    <div className="temp10-sidebar">
      <button onClick={onSave}>💾 Save Resume</button>
      <button onClick={onDownload}>📄 Download PDF</button>
      <button onClick={onEnhance}>✨ Enhance Summary</button>
    </div>
  );
};*/


const Temp10Sidebar = ({
  onDownload,
  onSave,
  onEnhance,
  onColorChange,
  onFontChange,
  currentColor,
  currentFont,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const colorOptions = [
    { name: "Blue", value: "#3498db" },
    { name: "Green", value: "#2ecc71" },
    { name: "Purple", value: "#9b59b6" },
    { name: "Red", value: "#e74c3c" },
    { name: "Orange", value: "#e67e22" },
    { name: "Teal", value: "#1abc9c" },
  ];

  const fontOptions = [
    {
      name: "Segoe UI",
      value: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    { name: "Roboto", value: "'Roboto', sans-serif" },
    { name: "Open Sans", value: "'Open Sans', sans-serif" },
    { name: "Lato", value: "'Lato', sans-serif" },
    { name: "Montserrat", value: "'Montserrat', sans-serif" },
    { name: "Poppins", value: "'Poppins', sans-serif" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className="temp10-sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`temp10-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="temp10-sidebar-header">
          <h3>Resume Builder</h3>
          <p>Template 10 - Customizable</p>
        </div>

        <div className="temp10-sidebar-actions">
          <button className="temp10-sidebar-btn primary" onClick={onDownload}>
            <FaDownload /> Download PDF
          </button>
          <button className="temp10-sidebar-btn secondary" onClick={onSave}>
            <FaSave /> Save Resume
          </button>
          <button className="temp10-sidebar-btn secondary" onClick={onEnhance}>
            <FaMagic /> Enhance Summary
          </button>
        </div>

        <div className="temp10-sidebar-section">
          <h4>Design Options</h4>
          <div className="temp10-design-options">
            <div className="temp10-color-options">
              <h5>
                <FaPalette /> Color Theme
              </h5>
              <div className="temp10-color-grid">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    className={`temp10-color-option ${
                      currentColor === color.value ? "active" : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => onColorChange(color.value)}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="temp10-font-options">
              <h5>
                <FaFont /> Font Family
              </h5>
              <select
                className="temp10-font-select"
                value={currentFont}
                onChange={(e) => onFontChange(e.target.value)}
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="temp10-sidebar-footer">
          <p>Customize your resume with different colors and fonts</p>
        </div>
      </div>
    </>
  );
};

export default Temp10Sidebar;
