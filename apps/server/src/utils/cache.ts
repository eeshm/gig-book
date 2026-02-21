import NodeCache from "node-cache";

// Default TTL: 60 seconds, check for expired keys every 120 seconds
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

/** Remove all entries whose key starts with the given prefix */
export function invalidatePrefix(prefix: string): void {
  const keys = cache.keys().filter((k) => k.startsWith(prefix));
  if (keys.length > 0) cache.del(keys);
}

export default cache;
