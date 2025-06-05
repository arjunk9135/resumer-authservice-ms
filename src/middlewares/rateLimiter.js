// customRateLimiter.js

const rateLimitSimple = (options) => {
  const hits = new Map();
  const windowMs = options.windowMs || 15 * 60 * 1000; // default 15 minutes
  const max = options.max || 100;
  const message = options.message || 'Too many requests from this IP, please try again later';

  return (req, res, next) => {
    const now = Date.now();
    const ip = req.ip;

    if (!hits.has(ip)) {
      hits.set(ip, []);
    }

    // Remove timestamps older than windowMs
    const timestamps = hits.get(ip).filter(time => now - time < windowMs);

    if (timestamps.length >= max) {
      res.status(429).send(message);
      return;
    }

    timestamps.push(now);
    hits.set(ip, timestamps);

    next();
  };
};

const limiter = rateLimitSimple({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later',
});

module.exports = limiter;
