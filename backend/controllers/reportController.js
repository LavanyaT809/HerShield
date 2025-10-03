const Report = require('../models/Report');

// POST - create a new report
exports.createReport = async (req, res) => {
  try {
    const reportData = req.body;
    const newReport = new Report(reportData);
    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// GET - fetch all reports for analytics
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ incidentDate: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get reports' });
  }
};








// const Report = require('../models/Report');

// exports.createReport = async (req, res) => {
//   try {
//     const reportData = req.body;
//     const newReport = new Report(reportData);
//     await newReport.save();
//     res.status(201).json({ message: 'Report submitted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error: ' + error.message });
//   }
// };
