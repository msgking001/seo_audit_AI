const Audit = require('../models/Audit');
const { analyzeSEO } = require('../services/seoEngine');
const { generateRecommendations } = require('../services/aiEngine');

// Run a new SEO audit
exports.runAudit = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ success: false, error: 'Please provide a URL' });
    }

    // 1. Perform technical SEO audit crawling
    const auditFacts = await analyzeSEO(url);

    // 2. Generate detailed 100/100 scorecard
    const scorecard = await generateRecommendations(auditFacts, url);

    // 3. Generate backward compatibility mappings
    const issues = [];
    const recommendations = [];
    const checks = {};

    if (scorecard.sections) {
      scorecard.sections.forEach(sec => {
        if (sec.checks) {
          sec.checks.forEach(chk => {
            const passed = chk.status === 'PASS';
            const nameLower = chk.name.toLowerCase().replace(/[^a-z]/g, '');
            if (nameLower.includes('title')) checks.titleTag = passed;
            else if (nameLower.includes('description')) checks.metaDescription = passed;
            else if (nameLower.includes('h1')) checks.h1Structure = passed;
            else if (nameLower.includes('alt')) checks.imageAltText = passed;
            else if (nameLower.includes('graph') || nameLower.includes('og')) checks.openGraph = passed;
            else if (nameLower.includes('canonical')) checks.canonicalTag = passed;
            else if (nameLower.includes('robots')) checks.robotsTxt = passed;
            else if (nameLower.includes('sitemap')) checks.sitemap = passed;
            else if (nameLower.includes('viewport')) checks.mobileViewport = passed;
            else if (nameLower.includes('https') || nameLower.includes('ssl')) checks.https = passed;
            else if (nameLower.includes('schema') || nameLower.includes('structured')) checks.structuredData = passed;

            if (!passed) {
              issues.push({
                type: chk.name,
                status: 'Failed',
                message: chk.fixRequired,
                priority: sec.name.includes('Technical') || sec.name.includes('Vitals') ? 'High' : 'Medium',
                weight: chk.pointsLost || 2
              });
              
              recommendations.push({
                issue: chk.name,
                impact: `Resolves points lost in ${sec.name}.`,
                fix: chk.fixRequired,
                example: chk.targetValue
              });
            }
          });
        }
      });
    }

    // 4. Prepare full report
    const fullAudit = {
      websiteURL: url,
      seoScore: scorecard.seoScore,
      scoreCategory: scorecard.scoreCategory,
      grade: scorecard.grade,
      trafficImpact: scorecard.trafficImpact,
      topIssues: scorecard.topIssues,
      sections: scorecard.sections,
      roadmap: scorecard.roadmap,
      idealState: scorecard.idealState,
      // Legacy compatibility:
      checks: {
        titleTag: checks.titleTag !== undefined ? checks.titleTag : true,
        metaDescription: checks.metaDescription !== undefined ? checks.metaDescription : true,
        h1Structure: checks.h1Structure !== undefined ? checks.h1Structure : true,
        imageAltText: checks.imageAltText !== undefined ? checks.imageAltText : true,
        openGraph: checks.openGraph !== undefined ? checks.openGraph : true,
        canonicalTag: checks.canonicalTag !== undefined ? checks.canonicalTag : true,
        robotsTxt: checks.robotsTxt !== undefined ? checks.robotsTxt : true,
        sitemap: checks.sitemap !== undefined ? checks.sitemap : true,
        mobileViewport: checks.mobileViewport !== undefined ? checks.mobileViewport : true,
        https: checks.https !== undefined ? checks.https : true,
        structuredData: checks.structuredData !== undefined ? checks.structuredData : true,
      },
      issues: issues.length > 0 ? issues : [{ type: 'General', status: 'Passed', message: 'No critical failures', priority: 'Low', weight: 0 }],
      recommendations: recommendations.length > 0 ? recommendations : [{ issue: 'Optimization', impact: 'General improvements', fix: 'None needed', example: '' }],
      metrics: {
        responseTime: auditFacts.responseTime,
        internalLinks: auditFacts.links.internalCount,
        externalLinks: auditFacts.links.externalCount,
      },
      userId: req.user ? req.user.id : null,
    };

    // 5. Save to DB if user is logged in AND DB is connected
    let savedAudit;
    if (req.user) {
      try {
        savedAudit = await Audit.create(fullAudit);
      } catch (dbErr) {
        console.error('DB Save Error:', dbErr.message);
      }
    }

    res.status(200).json({
      success: true,
      data: savedAudit || { ...fullAudit, _id: 'demo_' + Date.now() },
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get personal audit history
exports.getHistory = async (req, res) => {
  try {
    const audits = await Audit.find({ userId: req.user.id }).sort('-createdAt');
    
    // Calculate stats on the fly as per requirements
    const totalAudits = audits.length;
    const avgScore = totalAudits > 0 
      ? Math.round(audits.reduce((acc, curr) => acc + curr.seoScore, 0) / totalAudits) 
      : 0;

    res.status(200).json({
      success: true,
      count: totalAudits,
      stats: { totalAudits, avgScore },
      data: audits,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get single audit by ID
exports.getAudit = async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id);

    if (!audit) {
      return res.status(404).json({ success: false, error: 'Audit not found' });
    }

    // Ensure user owns the audit or it's public (visitor audits aren't usually saved long-term)
    if (audit.userId && req.user && audit.userId.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: audit });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
