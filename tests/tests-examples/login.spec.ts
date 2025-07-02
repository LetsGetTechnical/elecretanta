// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { test } from '@playwright/test';
import { getSupabaseClient } from '../utils/auth-setup';
test('Login for manual testing', async ({ page }) => {
  await getSupabaseClient(page, 'testmember1@test.com');
  await page.goto('/dashboard');
  await new Promise((resolve) => setTimeout(resolve, 500000));
});
