const { createHash } = require('node:crypto');

/**
 * Hash a URL with SHA-256 and return a compact hexadecimal code.
 *
 * The full digest is deterministic: the same exact URL produces the same
 * digest. The short code can collide, so a real URL shortener must check
 * whether the code is already mapped to a different URL and resolve that
 * collision (for example, by trying another code or adding a nonce).
 */
function hashUrl(url, codeLength = 8) {
  if (typeof url !== 'string' || url.trim() === '') {
    throw new TypeError('url must be a non-empty string');
  }

  if (!Number.isInteger(codeLength) || codeLength < 1 || codeLength > 64) {
    throw new RangeError('codeLength must be an integer between 1 and 64');
  }

  const fullHash = createHash('sha256').update(url, 'utf8').digest('hex');

  return {
    fullHash,
    shortCode: fullHash.slice(0, codeLength),
  };
}

const longUrl =
  'https://www.example.com/articles/system-design/url-shortener?source=interview-preparation';

const result = hashUrl(longUrl);

console.log('URL:       ', longUrl);
console.log('SHA-256:   ', result.fullHash);
console.log('Short code:', result.shortCode);

module.exports = { hashUrl };
