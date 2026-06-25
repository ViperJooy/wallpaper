import JSZip from 'jszip';

const QING_ZIP_URL = 'https://ss.netnr.com/assets/ss/data-wallpaper-360.zip';

let zipCache = null;
let zipCachePromise = null;
let categoryCache = {};

function buildImageUrl(path) {
  return `https://p0.qhimg.com/bdm/1920_1080_100/${path}.jpg`;
}

function buildThumbUrl(path) {
  return `https://p0.qhimg.com/bdm/480_300_85/${path}.jpg`;
}

function build4kUrl(path) {
  return `https://p0.qhimg.com/bdr/__100/${path}`;
}

async function getZip(signal) {
  if (zipCache) return zipCache;
  if (!signal && zipCachePromise) return zipCachePromise;

  const promise = (async () => {
    const res = await fetch(QING_ZIP_URL, { signal });
    if (!res.ok) throw new Error('Failed to fetch 360 data');
    const blob = await res.blob();
    const zip = await JSZip.loadAsync(blob);
    zipCache = zip;
    return zip;
  })();

  if (!signal) {
    zipCachePromise = promise;
  }

  return promise;
}

function parseItems(items, categoryId) {
  return items.map((item, index) => ({
    id: `360-${categoryId}-${index}`,
    path: item.path,
    tag: item.tag,
    wh: item.wh || '',
    url: buildImageUrl(item.path),
    thumb: buildThumbUrl(item.path),
    url4k: build4kUrl(item.path),
  }));
}

export async function fetch360Category(categoryId, signal) {
  const cacheKey = String(categoryId);
  if (categoryCache[cacheKey]) return categoryCache[cacheKey];

  const zip = await getZip(signal);
  const fileName = `data-wallpaper-360-${categoryId}.json`;
  const file = zip.file(fileName);
  if (!file) return [];

  const text = await file.async('text');
  const items = JSON.parse(text);
  const result = parseItems(items, categoryId);
  categoryCache[cacheKey] = result;
  return result;
}

export function search360List(items, keyword) {
  if (!keyword || !keyword.trim()) return items;
  const q = keyword.toLowerCase();
  return items.filter(item =>
    (item.tag && item.tag.toLowerCase().includes(q))
  );
}

export function clearCache() {
  zipCache = null;
  zipCachePromise = null;
  categoryCache = {};
}
