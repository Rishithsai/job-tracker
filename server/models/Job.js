const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: 'Remote',
    },
    status: {
      type: String,
      enum: ['Applied', 'Screening', 'Interview', 'Offer', 'Rejected'],
      default: 'Applied',
    },
    jobUrl: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      trim: true,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);