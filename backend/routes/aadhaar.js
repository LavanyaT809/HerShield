const express = require('express');
const router = express.Router();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/aadhaar/send-otp', (req, res) => {
  const { aadhaarNumber } = req.body;
  if (!aadhaarNumber || aadhaarNumber.length !== 12) {
    return res.status(400).json({ message: 'Invalid Aadhaar number' });
  }

  const otp = generateOTP();
  console.log("Generated demo OTP:", otp);
  res.json({ message: 'OTP sent', otp });
});

module.exports = router;
