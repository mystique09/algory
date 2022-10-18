import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
    await page.goto('/');
    expect(await page.textContent('h1')).toBe('Welcome to SvelteKit');
});

test('navbar is defined', async ({ page }) => {
    await page.goto('/');
    expect(await page.textContent('div.navbar'));
});