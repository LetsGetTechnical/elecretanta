// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test, expect } from '@playwright/test';
import { getSupabaseClient } from '../utils/auth-setup';
//import { setTimeout } from 'timers/promises';
test('Logged in user who hasn’t completed onboarding sees onboarding', async ({
  page,
}) => {
  test.setTimeout(600000);
  await getSupabaseClient(page);
  await page.goto('/');
  await expect(page).toHaveURL('/onboarding');
  await expect(
    page.getByText('Welcome to Elfgorithm✨', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Next', exact: true }),
  ).toBeVisible();
});
