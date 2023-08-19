const User = require('../models/User');
const rateLimit = require('express-rate-limit');

const userRateLimiter = (options) => {
  const userLimiter = rateLimit(options);

  return async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.rateLimitOptions = {
      ...options,
      keyGenerator: () => user.id,
    };

    userLimiter(req, res, next);
  };
};

module.exports = userRateLimiter;
