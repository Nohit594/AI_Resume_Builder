import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/resume';

const api = {
  // Load resume by email
  loadResume: async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/load?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error loading resume:', error);
      throw error;
    }
  },

  // Save resume
  saveResume: async (resumeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, {
        resumeData
      });
      return response.data;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    }
  },

  // Enhance a specific field using AI
  enhanceField: async (resumeId, field) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/enhanceField`, {
        resumeId,
        field
      });
      return response.data;
    } catch (error) {
      console.error('Error enhancing field:', error);
      throw error;
    }
  },

  // Generate and download PDF
  generatePDF: async (resumeData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/generate-pdf`,
        { resumeData },
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }
};

export default api; 