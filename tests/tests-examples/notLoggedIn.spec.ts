// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Make Gift-Giving Magical')).toBeVisible();
});

test('has smart gifting', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Smart Gifting')).toBeVisible();
});
