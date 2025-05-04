import { getCache, setCache } from "./cache.js";

export async function fetchWithTimeoutAndCache(url, timeout = 4000) {
  const cached = getCache(url);
  if (cached) return cached;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const data = await response.json();
    setCache(url, data);
    return data;
  } catch (err) {
    throw err;
  } finally {
    clearTimeout(id);
  }
}
