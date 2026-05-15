import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should not stay in loading state indefinitely', async ({ page }) => {
    let resolveRequest;
    const requestPromise = new Promise(resolve => { resolveRequest = resolve; });

    await page.route('**/GetListByCategory*', async (route) => {
      await requestPromise;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errno: 0,
          msg: '',
          data: {
            total_count: 100,
            total_page: 10,
            pageno: 1,
            count: 20,
            list: Array.from({ length: 20 }, (_, i) => ({
              id: `${i + 1}`,
              author: `Author ${i + 1}`,
              category: '4K专区',
              url: `https://via.placeholder.com/400x300?text=Wallpaper+${i + 1}`,
              class_id: '36',
            })),
          },
        }),
      });
    });

    await page.goto('/');

    const loadingSpinner = page.locator('.MuiCircularProgress-root').first();
    await expect(loadingSpinner).toBeVisible({ timeout: 5000 });

    resolveRequest();

    const cards = page.locator('.MuiCard-root');
    await expect(cards.first()).toBeAttached({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBe(20);
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
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          errno: 0,
          msg: '',
          data: {
            total_count: 100,
            total_page: 10,
            pageno: 1,
            count: 20,
            list: Array.from({ length: 20 }, (_, i) => ({
              id: `${i + 1}`,
              author: `Author ${i + 1}`,
              category: '4K专区',
              url: `https://via.placeholder.com/400x300?text=Wallpaper+${i + 1}`,
              class_id: '36',
            })),
          },
        }),
      });
    });

    await page.goto('/');

    const cards = page.locator('.MuiCard-root');
    await expect(cards.first()).toBeAttached({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBe(20);
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
