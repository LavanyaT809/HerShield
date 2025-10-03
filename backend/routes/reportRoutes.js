const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// POST route to create a new report
router.post('/reports', reportController.createReport);

// GET route to fetch all reports for analytics
router.get('/reports', reportController.getReports);

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const reportController = require('../controllers/reportController');

// router.post('/reports', reportController.createReport);

// module.exports = router;

