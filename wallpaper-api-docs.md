# 壁纸 API 接口文档

> 来源：https://ss.netnr.com/wallpaper

## 目录

- [1. Bing 壁纸](#1-bing-壁纸)
- [2. 360 壁纸](#2-360-壁纸)
- [3. Bird 壁纸（彼岸图网）](#3-bird-壁纸彼岸图网)
- [4. 使用建议](#4-使用建议)

---

## 1. Bing 壁纸

### 数据源

Bing 壁纸数据存储在本地 JSON 文件中，需要先获取数据文件。

```
数据文件: /assets/ss/data-wallpaper-bing.json
```

### 图片 URL 格式

```
基础 URL: https://www.bing.com/th?id=OHR.{图片ID}_UHD.jpg
```

#### 不同分辨率参数

| 分辨率 | URL 参数 |
|--------|----------|
| 4K 原图 | 无需参数 |
| 1920x1080 | `&pid=hp&w=1920&h=1080&rs=1&c=4` |
| 缩略图 (1000x618) | `&pid=hp&w=1000&h=618&rs=1&c=4` |

### 示例

```bash
# 4K 原图
https://www.bing.com/th?id=OHR.SomeImageID_UHD.jpg

# 1920x1080
https://www.bing.com/th?id=OHR.SomeImageID_UHD.jpg&pid=hp&w=1920&h=1080&rs=1&c=4

# 缩略图
https://www.bing.com/th?id=OHR.SomeImageID_UHD.jpg&pid=hp&w=1000&h=618&rs=1&c=4
```

### 数据格式

数据文件中每条记录格式：`YYYYMMDD,ImageID`

```
20260513,SomeImageID
```

### 使用说明

- ✅ 图片 CDN 可直接访问
- ❌ 数据索引需要本地 JSON 文件
- 📅 支持按日期筛选

---

## 2. 360 壁纸

### 数据源

360 壁纸数据存储在 ZIP 压缩包中，包含多个分类的 JSON 文件。

```
压缩包: /assets/ss/data-wallpaper-360.zip
文件格式: data-wallpaper-360-{分类ID}.json
```

### 分类列表

| 分类ID | 分类名称 | 分类ID | 分类名称 |
|--------|----------|--------|----------|
| 36 | 4K专区 | 11 | 明星风尚 |
| 6 | 美女模特 | 14 | 萌宠动物 |
| 30 | 爱情美图 | 5 | 游戏壁纸 |
| 9 | 风景大片 | 12 | 汽车天下 |
| 15 | 小清新 | 10 | 炫酷时尚 |
| 26 | 动漫卡通 | 29 | 月历壁纸 |
| 16 | 劲爆体育 | 7 | 影视剧照 |
| 13 | 节日美图 | 22 | 军事天地 |
| 18 | BABY秀 | 35 | 文字控 |
| 32 | 纹理 | - | - |

### 图片 URL 格式

```
基础路径: {path}
```

#### 不同分辨率 URL

| 分辨率 | URL 格式 |
|--------|----------|
| 4K 原图 | `https://p0.qhimg.com/bdr/__100/{path}` |
| 1920x1080 | `https://p0.qhimg.com/bdm/1920_1080_100/{path}.jpg` |
| 中等尺寸 (970x600) | `https://p0.qhimg.com/bdm/970_600_85/{path}.jpg` |
| 缩略图 | `https://p0.qhimg.com/bdr/__100/{path}.jpg` |

### 示例

```bash
# 假设 path = "t01b4864c8627bf1c5b"

# 4K 原图
https://p0.qhimg.com/bdr/__100/t01b4864c8627bf1c5b

# 1920x1080
https://p0.qhimg.com/bdm/1920_1080_100/t01b4864c8627bf1c5b.jpg

# 中等尺寸
https://p0.qhimg.com/bdm/970_600_85/t01b4864c8627bf1c5b.jpg
```

### 数据格式

JSON 文件中每条记录包含：

```json
{
  "path": "图片路径",
  "tag": "标签",
  "wh": "分辨率信息（可选）"
}
```

### 使用说明

- ✅ 图片 CDN 可直接访问
- ❌ 数据索引需要本地 ZIP 文件
- 🏷️ 支持按标签搜索
- 📂 支持多个分类

---

## 3. Bird 壁纸（彼岸图网）

### ⭐ 特点

**唯一可直接调用的在线 API，无需本地数据文件！**

### API 基础地址

```
https://wp.shanhutech.cn/intf/
```

### 3.1 按分类获取壁纸

#### 接口地址

```
GET https://wp.shanhutech.cn/intf/GetListByCategory
```

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| cids | number | 是 | 分类ID |
| pageno | number | 是 | 页码，从 1 开始 |
| count | number | 是 | 每页数量 |

#### 请求示例

```bash
# 获取 4K 专区第 1 页，每页 12 张
curl "https://wp.shanhutech.cn/intf/GetListByCategory?cids=36&pageno=1&count=12"

# 获取风景大片第 2 页，每页 20 张
curl "https://wp.shanhutech.cn/intf/GetListByCategory?cids=9&pageno=2&count=20"
```

#### JavaScript 示例

```javascript
async function getWallpapersByCategory(cid, page = 1, count = 12) {
  const url = `https://wp.shanhutech.cn/intf/GetListByCategory?cids=${cid}&pageno=${page}&count=${count}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// 使用示例
getWallpapersByCategory(36, 1, 12).then(data => {
  console.log(`总数: ${data.data.total_count}`);
  console.log(`壁纸列表:`, data.data.list);
});
```

### 3.2 搜索壁纸

#### 接口地址

```
GET https://wp.shanhutech.cn/intf/search
```

#### 请求参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| content | string | 是 | 搜索关键词（需 URL 编码） |
| pageno | number | 是 | 页码，从 1 开始 |
| count | number | 是 | 每页数量 |

#### 请求示例

```bash
# 搜索"风景"
curl "https://wp.shanhutech.cn/intf/search?content=%E9%A3%8E%E6%99%AF&pageno=1&count=12"

# 搜索"美女"
curl "https://wp.shanhutech.cn/intf/search?content=%E7%BE%8E%E5%A5%B3&pageno=1&count=12"
```

#### JavaScript 示例

```javascript
async function searchWallpapers(keyword, page = 1, count = 12) {
  const url = `https://wp.shanhutech.cn/intf/search?content=${encodeURIComponent(keyword)}&pageno=${page}&count=${count}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// 使用示例
searchWallpapers('风景', 1, 12).then(data => {
  console.log(`搜索结果总数: ${data.data.total_count}`);
  data.data.list.forEach(item => {
    console.log(`图片: ${item.url}, 标签: ${item.tag}`);
  });
});
```

### 分类列表

| 分类ID | 分类名称 | 分类ID | 分类名称 |
|--------|----------|--------|----------|
| 36 | 4K专区 | 11 | 明星风尚 |
| 6 | 美女模特 | 14 | 萌宠动物 |
| 30 | 爱情美图 | 5 | 游戏壁纸 |
| 9 | 风景大片 | 12 | 汽车天下 |
| 15 | 小清新 | 10 | 炫酷时尚 |
| 26 | 动漫卡通 | 29 | 月历壁纸 |
| 16 | 劲爆体育 | 7 | 影视剧照 |
| 13 | 节日美图 | 22 | 军事天地 |
| 18 | BABY秀 | 35 | 文字控 |

### 响应格式

```json
{
  "data": {
    "total_count": 1234,
    "list": [
      {
        "url": "https://example.com/image1.jpg",
        "tag": "风景,自然,山水"
      },
      {
        "url": "https://example.com/image2.jpg",
        "tag": "美女,模特,时尚"
      }
    ]
  }
}
```

### 响应字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| data.total_count | number | 符合条件的壁纸总数 |
| data.list | array | 壁纸列表 |
| data.list[].url | string | 壁纸图片 URL（可直接下载） |
| data.list[].tag | string | 壁纸标签（逗号分隔） |

### 使用说明

- ✅ 完全在线 API，无需本地文件
- ✅ 支持分类浏览
- ✅ 支持关键词搜索
- ✅ 支持分页
- ✅ 图片 URL 可直接访问下载
- 🔓 无需认证
- 🚀 响应速度快

---

## 4. 使用建议

### 推荐方案

如果你需要：

1. **直接调用 API** → 使用 **Bird 壁纸 API** ⭐
   - 无需本地数据文件
   - 支持在线搜索和分类
   - 接口稳定可靠

2. **高质量 Bing 壁纸** → 使用 **Bing 壁纸**
   - 需要先获取数据文件
   - 图片质量高
   - 每日更新

3. **海量壁纸资源** → 使用 **360 壁纸**
   - 需要先获取数据文件
   - 分类丰富
   - 资源量大

### 完整示例：获取壁纸并下载

```javascript
// Node.js 示例
const https = require('https');
const fs = require('fs');

// 1. 获取壁纸列表
async function getWallpapers() {
  const url = 'https://wp.shanhutech.cn/intf/GetListByCategory?cids=36&pageno=1&count=5';
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

// 2. 下载壁纸
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

// 3. 主函数
async function main() {
  try {
    // 获取壁纸列表
    const result = await getWallpapers();
    console.log(`找到 ${result.data.total_count} 张壁纸`);
    
    // 下载前 5 张
    for (let i = 0; i < result.data.list.length; i++) {
      const item = result.data.list[i];
      const filename = `wallpaper_${i + 1}.jpg`;
      console.log(`正在下载: ${filename}`);
      await downloadImage(item.url, filename);
      console.log(`下载完成: ${filename}`);
    }
    
    console.log('所有壁纸下载完成！');
  } catch (error) {
    console.error('错误:', error);
  }
}

main();
```

### Python 示例

```python
import requests
import os

def get_wallpapers(cid=36, page=1, count=12):
    """获取壁纸列表"""
    url = f"https://wp.shanhutech.cn/intf/GetListByCategory"
    params = {
        'cids': cid,
        'pageno': page,
        'count': count
    }
    response = requests.get(url, params=params)
    return response.json()

def download_image(url, filename):
    """下载图片"""
    response = requests.get(url, stream=True)
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

def main():
    # 获取 4K 专区壁纸
    result = get_wallpapers(cid=36, page=1, count=5)
    print(f"找到 {result['data']['total_count']} 张壁纸")
    
    # 创建下载目录
    os.makedirs('wallpapers', exist_ok=True)
    
    # 下载壁纸
    for i, item in enumerate(result['data']['list'], 1):
        filename = f"wallpapers/wallpaper_{i}.jpg"
        print(f"正在下载: {filename}")
        download_image(item['url'], filename)
        print(f"下载完成: {filename}")
    
    print("所有壁纸下载完成！")

if __name__ == '__main__':
    main()
```

---

## 注意事项

1. **请求频率**：建议控制请求频率，避免对服务器造成压力
2. **图片版权**：壁纸可能受版权保护，请合理使用
3. **URL 编码**：搜索关键词需要进行 URL 编码
4. **错误处理**：建议添加适当的错误处理和重试机制
5. **缓存策略**：对于频繁访问的数据，建议实现本地缓存

---

## 更新日志

- 2026-05-13: 初始版本，整理三个壁纸 API 接口

---

## 相关链接

- 原始页面: https://ss.netnr.com/wallpaper
- GitHub: https://github.com/netnr

---

**文档生成时间**: 2026-05-13
