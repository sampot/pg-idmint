/** UUID / NanoID generators (Web Crypto). */

/** @returns {string} */
export function uuidV4() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

const NANO_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

/**
 * @param {number} size
 * @param {string} [alphabet]
 */
export function nanoid(size = 21, alphabet = NANO_ALPHABET) {
  const bytes = crypto.getRandomValues(new Uint8Array(size));
  let id = "";
  const mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1;
  for (let i = 0; i < size; i++) {
    id += alphabet[bytes[i] & mask] ?? alphabet[bytes[i] % alphabet.length];
  }
  return id;
}

/**
 * @param {number} count
 * @param {() => string} gen
 */
export function bulk(count, gen) {
  const n = Math.min(Math.max(1, count | 0), 500);
  /** @type {string[]} */
  const out = [];
  for (let i = 0; i < n; i++) out.push(gen());
  return out;
}
