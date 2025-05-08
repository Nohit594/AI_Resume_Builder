import { useState, useEffect } from "react";
import { FaPlus, FaDownload, FaHistory, FaBars, FaTimes, FaSave, FaRobot } from "react-icons/fa";

const Sidebar = ({ onAddSection, onSelectSection, downloadPdf, saveResume }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [showAIOptions, setShowAIOptions] = useState(false);

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'courses', label: 'Courses' }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleAddSection = (sectionId) => {
    onAddSection(sectionId);
    setShowSectionMenu(false);
  };

  const handleAIAssistant = async (action) => {
    try {
      const response = await fetch('http://localhost:5000/api/resume/enhanceField', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: action,
          fields: ['summary', 'skills', 'experience', 'education', 'courses', 'projects', 'achievements']
        })
      });

      if (!response.ok) {
        throw new Error('AI enhancement failed');
      }

      const data = await response.json();
      if (data.success) {
        // Handle success
        console.log('AI enhancement successful');
      }
    } catch (error) {
      console.error('AI enhancement error:', error);
    } finally {
      setShowAIOptions(false);
    }
  };

  return (
    <div className="flex">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {showSidebar && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed left-0 top-0 h-full bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        style={{ width: "20rem", minWidth: "20rem" }}
      >
        <button
          className="absolute top-3 right-3 text-white lg:hidden"
          onClick={toggleSidebar}
        >
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col h-full p-4 space-y-3">
          <h2 className="text-lg font-bold mb-4">Resume Tools</h2>
          
          {/* Add Section Button */}
          <div className="relative">
            <button
              className="w-full flex items-center p-3 rounded-lg cursor-pointer transition duration-200 hover:bg-white hover:text-black"
              onClick={() => setShowSectionMenu(!showSectionMenu)}
            >
              <FaPlus className="mr-2" />
              <span>Add Section</span>
            </button>
            
            {/* Section Menu Dropdown */}
            {showSectionMenu && (
              <div className="absolute left-0 mt-1 w-full bg-gray-700 rounded-lg shadow-lg z-50">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className="w-full text-left px-4 py-2 hover:bg-gray-600 transition duration-200"
                    onClick={() => handleAddSection(section.id)}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavItem icon={<FaSave />} label="Save Resume" onClick={saveResume} />
          <NavItem icon={<FaDownload />} label="Download PDF" onClick={downloadPdf} />
          <NavItem icon={<FaRobot />} label="AI Assistant" onClick={() => setShowAIOptions(!showAIOptions)} />
        </div>

        {/* AI Options Dropdown */}
        {showAIOptions && (
          <div className="absolute left-0 w-full bg-gray-800 rounded-lg shadow-lg p-2 z-50">
            <button
              className="w-full p-2 text-left hover:bg-gray-700 rounded"
              onClick={() => handleAIAssistant('enhance_all')}
            >
              Enhance Entire Resume
            </button>
            <button
              className="w-full p-2 text-left hover:bg-gray-700 rounded"
              onClick={() => handleAIAssistant('professional')}
            >
              Make More Professional
            </button>
            <button
              className="w-full p-2 text-left hover:bg-gray-700 rounded"
              onClick={() => handleAIAssistant('concise')}
            >
              Make More Concise
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, onClick }) => {
  return (
    <div
      className="flex items-center p-3 rounded-lg cursor-pointer transition duration-200 hover:bg-white hover:text-black"
      onClick={onClick}
    >
      {icon}
      <span className="ml-2 whitespace-normal">{label}</span>
    </div>
  );
};

export default Sidebar;
