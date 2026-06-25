export function toSecureImageUrl(url) {
  if (typeof url !== 'string') return url;
  if (url.startsWith('http://')) {
    return `https://${url.slice('http://'.length)}`;
  }
  return url;
}

export function getThumbUrl(url) {
  if (!url) return url;
  const secureUrl = toSecureImageUrl(url);

  if (secureUrl.includes('qhimg.com')) {
    return secureUrl.replace(/\/bdr\/__\d+/, '/bdr/__200');
  }

  if (secureUrl.includes('bing.com/th')) {
    const separator = secureUrl.includes('?') ? '&' : '?';
    return `${secureUrl}${separator}pid=hp&w=400&h=250&rs=1&c=4`;
  }

  return secureUrl;
}

const BASE = import.meta.env.VITE_API_BASE_URL || 'https://wp.shanhutech.cn/intf';

export function getFullUrl(id) {
  if (!id) return '';
  if (id.startsWith('http')) return toSecureImageUrl(id);
  return `${BASE}/image/${id}`;
}
