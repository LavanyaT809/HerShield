import React from 'react';
import './Report.css';
import { useNavigate } from 'react-router-dom';

const Report = () => {
    const navigate = useNavigate();

  return (
    <div className="report-page">
        <div className="report-container">
            <div className="report-header">
                <h1>File a <span className="purple">Confidential</span> Incident Report</h1>
                <p>Your safety is our priority. Please provide detailed information below. All fields marked with * are required.</p>
            </div>

            <div className="form-section">
                <h2>Incident Details</h2>
                <div className="form-group">
                    <label>*Type of Incident</label>
                    <input type="text" placeholder="e.g., Sexual Harassment, Abuse, Discrimination" />
                </div>
                <div className="form-group">
                    <label>*Date of Incident</label>
                    <input type="text" placeholder="dd-mm-yyyy" />
                </div>
                <div className="form-group">
                    <label>*Location of Incident</label>
                    <input type="text" placeholder="e.g., Workplace, Public Transport, Online Platform" />
                </div>
                <div className="form-group">
                    <label>*Detailed Description</label>
                    <textarea rows="5" placeholder="Describe what happened, including sequence of events and any witnesses."></textarea>
                </div>
            </div>

            <div className="form-section">
                <h2>Evidence & Contact</h2>
                <div className="form-group">
                    <label>Evidence Details (e.g., screenshots, timecodes)</label>
                    <textarea rows="3" placeholder="Describe any documents, messages, or recordings you possess."></textarea>
                </div>
                <div className="form-group">
                    <label>Email for Follow-up (Recommended, kept confidential)</label>
                    <input type="email" placeholder="Your email address" />
                </div>
            </div>

            <button className="submit-button">Submit Confidential Report</button>
        </div>
        <button className="go-back-button" onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};

export default Report;
