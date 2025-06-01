
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

interface RateLimitEntry {
  count: number;
  resetTime: number;
  blockedUntil?: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  check(identifier: string): { allowed: boolean; resetTime?: number; message?: string } {
    const now = Date.now();
    const entry = this.store.get(identifier);

    // If blocked, check if block period has expired
    if (entry?.blockedUntil && now < entry.blockedUntil) {
      return {
        allowed: false,
        resetTime: entry.blockedUntil,
        message: this.config.message || 'Rate limit exceeded. Please try again later.',
      };
    }

    // If no entry or window has expired, create new entry
    if (!entry || now > entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return { allowed: true };
    }

    // If within limit, increment count
    if (entry.count < this.config.maxRequests) {
      entry.count++;
      return { allowed: true };
    }

    // Rate limit exceeded - block for the remaining window time
    entry.blockedUntil = entry.resetTime;
    return {
      allowed: false,
      resetTime: entry.resetTime,
      message: this.config.message || 'Rate limit exceeded. Please try again later.',
    };
  }

  reset(identifier: string): void {
    this.store.delete(identifier);
  }

  getStats(identifier: string): { count: number; resetTime: number } | null {
    const entry = this.store.get(identifier);
    if (!entry) return null;

    return {
      count: entry.count,
      resetTime: entry.resetTime,
    };
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.resetTime && (!entry.blockedUntil || now > entry.blockedUntil)) {
        this.store.delete(key);
      }
    }
  }
}

// Pre-configured rate limiters for common use cases
export const rateLimiters = {
  // API calls - 100 requests per minute
  api: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 100,
    message: 'Too many API requests. Please wait before making more requests.',
  }),

  // Login attempts - 5 attempts per 15 minutes
  login: new RateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 5,
    message: 'Too many login attempts. Please wait 15 minutes before trying again.',
  }),

  // Email sending - 10 emails per hour
  email: new RateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 10,
    message: 'Email sending limit reached. Please wait before sending more emails.',
  }),

  // Search - 50 searches per minute
  search: new RateLimiter({
    windowMs: 60 * 1000,
    maxRequests: 50,
    message: 'Too many search requests. Please wait before searching again.',
  }),

  // File uploads - 20 uploads per hour
  upload: new RateLimiter({
    windowMs: 60 * 60 * 1000,
    maxRequests: 20,
    message: 'Upload limit reached. Please wait before uploading more files.',
  }),
};

// Utility function to get user identifier for rate limiting
export const getUserIdentifier = (userId?: string, ip?: string): string => {
  return userId || ip || 'anonymous';
};

// Cleanup expired entries every 5 minutes
setInterval(() => {
  Object.values(rateLimiters).forEach(limiter => limiter.cleanup());
}, 5 * 60 * 1000);

export { RateLimiter };
