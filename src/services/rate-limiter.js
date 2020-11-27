const RateLimiter = require('limiter').RateLimiter;

class RateLimitService {
    constructor( amount, duration ) {
        this.amount = amount;
        this.duration = duration;
        this.limiters = {};
    }

    /**
     * Checks if a limiter exists for the given key string, creates if none using config.
     * @param {string} key 
     */
    takeAndCheck(key) {
        // Create limiter if it does not exist for key
        if (!this.limiters[key]) { this.limiters[key] = new RateLimiter(this.amount, this.duration, true) }

        if (this.limiters[key].getTokensRemaining() < 1) {
            return true
        } else {
            // Decrement remaining limit
            this.limiters[key].tryRemoveTokens(1)
        }
        
        return false
    }

    getRemainingWindow(key) {
        if (this.limiters[key]) console.log(this.limiters[key])
    }
}

module.exports = RateLimitService;