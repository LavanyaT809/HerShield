const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  incidentType: { type: String, required: true },
  incidentDate: { type: Date, required: true },
  incidentLocation: { type: String, required: true },
  description: { type: String, required: true },
  evidence: String,
  contactName: String,
  contactPhone: String,
  contactEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
