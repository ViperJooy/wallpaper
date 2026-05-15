const BING_DATA_URL = 'https://ss.netnr.com/assets/ss/data-wallpaper-bing.json';

let dataCache = null;
let dataCachePromise = null;

function buildImageUrl(imageId) {
  return `https://www.bing.com/th?id=OHR.${imageId}_UHD.jpg`;
}

function buildThumbUrl(imageId) {
  return `https://www.bing.com/th?id=OHR.${imageId}_UHD.jpg&pid=hp&w=400&h=250&rs=1&c=4`;
}

export async function fetchBingData(signal) {
  if (dataCache) return dataCache;
  if (!signal && dataCachePromise) return dataCachePromise;

  const promise = (async () => {
    const res = await fetch(BING_DATA_URL, { signal });
    if (!res.ok) throw new Error('Failed to fetch Bing data');
    const entries = await res.json();
    const result = entries.map((entry, index) => {
      const [date, imageId] = entry.split(',');
      return {
        id: `bing-${index}`,
        date,
        imageId,
        url: buildImageUrl(imageId),
        thumb: buildThumbUrl(imageId),
        tag: date,
      };
    });
    dataCache = result;
    return result;
  })();

  if (!signal) {
    dataCachePromise = promise;
  }

  return promise;
}

export function filterByMonth(data, month) {
  if (!month || month === 'all') return data;
  return data.filter(item => item.date.startsWith(month));
}

export function searchBing(data, keyword) {
  if (!keyword || !keyword.trim()) return data;
  const q = keyword.toLowerCase();
  return data.filter(item =>
    item.date.includes(q) ||
    item.imageId.toLowerCase().includes(q)
  );
}

export function clearCache() {
  dataCache = null;
  dataCachePromise = null;
}
