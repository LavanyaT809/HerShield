import React, { useState } from "react";
import "./AadhaarDemo.css";

function AadhaarDemo() {
  const [aadhaar, setAadhaar] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSendOtp = async () => {
    if (aadhaar.length !== 12) {
      alert('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/aadhaar/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aadhaarNumber: aadhaar, mobileNumber: mobile }),
      });

      const data = await res.json();

      if (data.otp) {
        // Show popup
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2500);

        // Fade out page before redirect
        const page = document.querySelector(".aadhaar-page");
        page.classList.add("fade-out");

        setTimeout(() => {
          window.location.href = '/home';
        }, 800); // fade-out duration
      } else {
        setResult(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      setResult('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aadhaar-page">
      {/* Popup */}
      <div className={`popup ${showPopup ? "show" : ""}`}>
         Permission Granted
      </div>

      {/* Glass Login Box */}
      <div className="glass-container">
        <h2>Digital Identity Login</h2>
        <p>Securely login using your Aadhaar number and mobile.</p>

        <div className="input-box">
          <label>Aadhaar Number</label>
          <input
            placeholder="Enter 12-digit Aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value.replace(/\D/, ""))}
            maxLength={12}
            inputMode="numeric"
          />
        </div>

        <div className="input-box">
          <label>Mobile Number</label>
          <input
            placeholder="Enter 10-digit number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
            maxLength={10}
            inputMode="numeric"
          />
        </div>

        <button
          className="send-btn"
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP & Login"}
        </button>

        {result && <div className="result-text">{result}</div>}

        <p className="footer-text">
          Powered by secure Digital Identity standards.
        </p>
      </div>
    </div>
  );
}

export default AadhaarDemo;
