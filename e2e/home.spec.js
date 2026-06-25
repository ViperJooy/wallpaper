import { test, expect } from '@playwright/test';

const TEST_IMAGE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="2" height="2"><rect width="2" height="2" fill="#22c55e"/></svg>';
const TEST_IMAGE = `data:image/svg+xml,${encodeURIComponent(TEST_IMAGE_SVG)}`;

const buildWallpaperList = (length, overrides = {}) => Array.from({ length }, (_, i) => ({
  id: `${i + 1}`,
  author: `Author ${i + 1}`,
  category: '4K专区',
  tag: `Test wallpaper ${i + 1}`,
  url: TEST_IMAGE,
  class_id: '36',
  ...overrides,
}));

async function fulfillWallpaperList(route, list) {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      errno: 0,
      msg: '',
      data: {
        total_count: list.length,
        total_page: 1,
        pageno: 1,
        count: list.length,
        list,
      },
    }),
  });
}

async function expectDecodedImages(page, expectedCount) {
  const images = page.locator('img[alt^="Test wallpaper"]');
  await expect(images).toHaveCount(expectedCount, { timeout: 10000 });
  await expect
    .poll(async () => {
      return images.evaluateAll(nodes =>
        nodes.filter(img => img.complete && img.naturalWidth > 0).length
      );
    }, { timeout: 10000 })
    .toBe(expectedCount);
}

test.describe('Home page', () => {
  test('should not stay in loading state indefinitely', async ({ page }) => {
    let resolveRequest;
    const requestPromise = new Promise(resolve => { resolveRequest = resolve; });

    await page.route('**/GetListByCategory*', async (route) => {
      await requestPromise;
      await fulfillWallpaperList(route, buildWallpaperList(20));
    });

    await page.goto('/');

    const loadingSpinner = page.locator('.MuiCircularProgress-root').first();
    await expect(loadingSpinner).toBeVisible({ timeout: 5000 });

    resolveRequest();

    await expectDecodedImages(page, 20);
  });

  test('should show error state when API fails', async ({ page }) => {
    await page.route('**/GetListByCategory*', async (route) => {
      await route.abort('connectionrefused');
    });

    await page.goto('/');

    const errorText = page.getByText('加载失败');
    await expect(errorText).toBeVisible({ timeout: 10000 });
  });

  test('should display wallpapers after successful load', async ({ page }) => {
    await page.route('**/GetListByCategory*', async (route) => {
      await fulfillWallpaperList(route, buildWallpaperList(20));
    });

    await page.goto('/');

    await expectDecodedImages(page, 20);
  });

  test('should load API http image urls over https', async ({ page }) => {
    let requestedSecureImage = false;
    const httpImageUrl = 'http://cdn.example.test/wallpaper-1.jpg';

    await page.route('**/GetListByCategory*', async (route) => {
      await fulfillWallpaperList(route, buildWallpaperList(1, { url: httpImageUrl }));
    });

    await page.route('https://cdn.example.test/**', async (route) => {
      requestedSecureImage = true;
      await route.fulfill({
        status: 200,
        contentType: 'image/svg+xml',
        body: TEST_IMAGE_SVG,
      });
    });

    await page.goto('/');

    const image = page.locator('img[alt="Test wallpaper 1"]');
    await expect(image).toHaveAttribute('src', /^https:\/\/cdn\.example\.test\//);
    await expectDecodedImages(page, 1);
    expect(requestedSecureImage).toBe(true);
  });

  test('should handle empty API response gracefully', async ({ page }) => {
    await page.route('**/GetListByCategory*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errno: 0,
          msg: '',
          data: {
            total_count: 0,
            total_page: 0,
            pageno: 1,
            count: 20,
            list: [],
          },
        }),
      });
    });

    await page.goto('/');

    const emptyText = page.getByText('暂无壁纸');
    await expect(emptyText).toBeVisible({ timeout: 10000 });
  });

  test('should show error state when API request times out', async ({ page }) => {
    await page.route('**/GetListByCategory*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 20000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ errno: 0, msg: '', data: { list: [] } }),
      });
    });

    await page.goto('/');

    const errorTitle = page.getByText('加载失败');
    await expect(errorTitle).toBeVisible({ timeout: 20000 });
  });
});
