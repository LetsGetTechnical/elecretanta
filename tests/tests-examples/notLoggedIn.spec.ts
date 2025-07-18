// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('hero-title')).toBeVisible();
});

test('has 4 features', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('feature')).toHaveCount(4);
});

test('has 3 steps', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('step')).toHaveCount(3);
});
