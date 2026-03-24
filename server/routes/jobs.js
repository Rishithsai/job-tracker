const express = require('express');
const { getJobs, getStats, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/stats', getStats);
router.get('/', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;