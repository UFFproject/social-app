import { hc } from 'hono/client';
import { AppType } from '@/uff-api-routers';

// FIXME: Fix env type, and insert env UFF_API_URL
export const client = hc<AppType>('http://localhost:3000', {
  init: {
    credentials: 'include',
  },
});
