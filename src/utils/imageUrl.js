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
    // /bdm/ 路径支持按尺寸缩放，替换为列表缩略图尺寸
    if (secureUrl.includes('/bdm/')) {
      return secureUrl.replace(/\/bdm\/\d+_\d+_\d+\//, '/bdm/480_300_85/');
    }
    // /bdr/ 路径不支持缩放，转换为 /bdm/ 格式
    return secureUrl.replace(/\/bdr\/[^/]+\//, '/bdm/480_300_85/');
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
