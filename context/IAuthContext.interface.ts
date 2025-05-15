// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Session, User } from '@supabase/supabase-js';

export interface IAuthContext {
  user: User | null;
  session: Session | null;
  isSignedIn: boolean | null;
}
