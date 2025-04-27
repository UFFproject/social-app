
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppType } from '../../../../../dist/libs/api/routers/src/lib/main.d.ts';

import { hc } from 'hono/client';

// FIXME: Fix env type, and insert env UFF_API_URL
export const client = hc<AppType>("http://uff-api:3000", {
  init: {
    credentials: 'include',
  }
});