
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { AppType } from '../../../../../dist/libs/api/routers/src/lib/main.d.ts';

import { hc } from 'hono/client';

// FIXME: Fix env type, and insert env UFF_API_URL
export const client = hc<AppType>("http://uff-api:3000", {
  fetch: async (req: RequestInfo | URL, init?: RequestInit) => {
    // NOTE: This is for session cookie
    // let session: undefined = undefined;

    return fetch(req, {
      ...init,
      headers: {
        ...init?.headers,
        // 'cookie': session,
      },
    });

    // NOTE: This is for session cookie
    // try {
    //
    // } catch {
    //
    // }
  },
});