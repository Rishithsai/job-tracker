const Job = require('../models/Job');

// @GET /api/jobs
const getJobs = async (req, res) => {
  try {
    const { status, sort = '-createdAt' } = req.query;
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    const jobs = await Job.find(filter).sort(sort);
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @GET /api/jobs/stats
const getStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const result = { Applied: 0, Screening: 0, Interview: 0, Offer: 0, Rejected: 0 };
    stats.forEach(({ _id, count }) => { result[_id] = count; });
    result.total = Object.values(result).reduce((a, b) => a + b, 0);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @POST /api/jobs
const createJob = async (req, res) => {
  try {
    const { company, role } = req.body;
    if (!company || !role) {
      return res.status(400).json({ message: 'Company and role are required' });
    }
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @PUT /api/jobs/:id
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @DELETE /api/jobs/:id
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getJobs, getStats, createJob, updateJob, deleteJob };