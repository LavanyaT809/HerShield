import React, { useState } from 'react';
import './Report.css';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();

  // State for each input
  const [formData, setFormData] = useState({
    incidentType: '',
    incidentDate: '',
    incidentLocation: '',
    description: '',
    evidence: '',
    contactEmail: '',
  });

  const [submitStatus, setSubmitStatus] = useState('');

  // Input change handler
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('Report submitted successfully.');
        // Optionally, reset form or navigate
        setFormData({
          incidentType: '',
          incidentDate: '',
          incidentLocation: '',
          description: '',
          evidence: '',
          contactEmail: '',
        });
        // navigate('/'); // To go back home after submit
      } else {
        setSubmitStatus('Failed to submit report.');
      }
    } catch (error) {
      setSubmitStatus('Error: ' + error.message);
    }
  };

  return (
    <div className="report-page">
      <div className="report-container">
        <div className="report-header">
          <h1>File a <span className="purple">Confidential</span> Incident Report</h1>
          <p>Your safety is our priority. Please provide detailed information below. All fields marked with * are required.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-section">
            <h2>Incident Details</h2>
            <div className="form-group">
              <label>*Type of Incident</label>
              <input
                type="text"
                name="incidentType"
                placeholder="e.g., Sexual Harassment, Abuse, Discrimination"
                value={formData.incidentType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>*Date of Incident</label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>*Location of Incident</label>
              <input
                type="text"
                name="incidentLocation"
                placeholder="e.g., Workplace, Public Transport, Online Platform"
                value={formData.incidentLocation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>*Detailed Description</label>
              <textarea
                rows="5"
                name="description"
                placeholder="Describe what happened, including sequence of events and any witnesses."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Evidence & Contact</h2>
            <div className="form-group">
              <label>Evidence Details (e.g., screenshots, timecodes)</label>
              <textarea
                rows="3"
                name="evidence"
                placeholder="Describe any documents, messages, or recordings you possess."
                value={formData.evidence}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email for Follow-up (Recommended, kept confidential)</label>
              <input
                type="email"
                name="contactEmail"
                placeholder="Your email address"
                value={formData.contactEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="submit-button" type="submit">Submit Confidential Report</button>
        </form>

        {submitStatus && <p style={{ marginTop: '15px' }}>{submitStatus}</p>}
      </div>

      <button className="go-back-button" onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default Report;







// import React from 'react';
// import './Report.css';
// import { useNavigate } from 'react-router-dom';

// const Report = () => {
//     const navigate = useNavigate();

//   return (
//     <div className="report-page">
//         <div className="report-container">
//             <div className="report-header">
//                 <h1>File a <span className="purple">Confidential</span> Incident Report</h1>
//                 <p>Your safety is our priority. Please provide detailed information below. All fields marked with * are required.</p>
//             </div>

//             <div className="form-section">
//                 <h2>Incident Details</h2>
//                 <div className="form-group">
//                     <label>*Type of Incident</label>
//                     <input type="text" placeholder="e.g., Sexual Harassment, Abuse, Discrimination" />
//                 </div>
//                 <div className="form-group">
//                     <label>*Date of Incident</label>
//                     <input type="text" placeholder="dd-mm-yyyy" />
//                 </div>
//                 <div className="form-group">
//                     <label>*Location of Incident</label>
//                     <input type="text" placeholder="e.g., Workplace, Public Transport, Online Platform" />
//                 </div>
//                 <div className="form-group">
//                     <label>*Detailed Description</label>
//                     <textarea rows="5" placeholder="Describe what happened, including sequence of events and any witnesses."></textarea>
//                 </div>
//             </div>

//             <div className="form-section">
//                 <h2>Evidence & Contact</h2>
//                 <div className="form-group">
//                     <label>Evidence Details (e.g., screenshots, timecodes)</label>
//                     <textarea rows="3" placeholder="Describe any documents, messages, or recordings you possess."></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label>Email for Follow-up (Recommended, kept confidential)</label>
//                     <input type="email" placeholder="Your email address" />
//                 </div>
//             </div>

//             <button className="submit-button">Submit Confidential Report</button>
//         </div>
//         <button className="go-back-button" onClick={() => navigate('/')}>Go Back to Home</button>
//     </div>
//   );
// };

// export default Report;
