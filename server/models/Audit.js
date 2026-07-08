const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, // Optional for visitors
  },
  websiteURL: {
    type: String,
    required: [true, 'Please add a website URL'],
  },
  seoScore: {
    type: Number,
    required: true,
  },
  scoreCategory: {
    type: String,
    enum: ['Excellent', 'Good', 'Needs Improvement', 'Poor'],
    required: true,
  },
  issues: [
    {
      type: { type: String }, // 'Title', 'Meta', 'H1', etc.
      status: { type: String, enum: ['Passed', 'Failed'] },
      message: String,
      priority: { type: String, enum: ['High', 'Medium', 'Low'] },
      weight: Number,
    },
  ],
  recommendations: [
    {
      issue: String,
      impact: String,
      fix: String,
      example: String,
    },
  ],
  metrics: {
    responseTime: Number,
    internalLinks: Number,
    externalLinks: Number,
  },
  checks: {
    titleTag: Boolean,
    metaDescription: Boolean,
    h1Structure: Boolean,
    imageAltText: Boolean,
    openGraph: Boolean,
    canonicalTag: Boolean,
    robotsTxt: Boolean,
    sitemap: Boolean,
    mobileViewport: Boolean,
    https: Boolean,
    structuredData: Boolean,
  },
  // Rich audit structures for Perfect 100/100 Audit
  grade: {
    type: String,
    required: false,
  },
  trafficImpact: {
    type: String,
    required: false,
  },
  topIssues: [
    {
      type: String,
    }
  ],
  sections: [
    {
      name: String,
      maxPoints: Number,
      score: Number,
      status: String, // '✅' | '⚠️' | '❌'
      checks: [
        {
          name: String,
          status: { type: String, enum: ['PASS', 'FAIL', 'WARNING'] },
          currentValue: String,
          targetValue: String,
          fixRequired: String,
          pointsLost: Number,
        }
      ]
    }
  ],
  roadmap: {
    week1: [String],
    week2to4: [String],
    month2: [String],
    ongoing: [String],
  },
  idealState: [
    {
      section: String,
      description: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Audit', auditSchema);
