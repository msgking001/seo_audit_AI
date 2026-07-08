const express = require('express');
const router = express.Router();
const { runAudit, getHistory, getAudit } = require('../controllers/auditController');
const { protect } = require('../middleware/auth');

// Optional auth for running audit
const { protect: optionalProtect } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const tryProtect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (e) {}
  }
  next();
};

router.post('/', tryProtect, runAudit);
router.get('/history', protect, getHistory);
router.get('/:id', tryProtect, getAudit);

module.exports = router;
