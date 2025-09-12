// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test, expect } from '@playwright/test';
import { getSupabaseClient } from '../utils/auth-setup';
test('Logged in user who hasn’t completed onboarding sees onboarding', async ({
  page,
}) => {
  await getSupabaseClient(page, 'playwrightuser@test.com');
  await page.goto('/');
  await expect(page).toHaveURL('/onboarding');
  await expect(page.getByTestId('onboarding-card')).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Next', exact: true }),
  ).toBeVisible();
});
