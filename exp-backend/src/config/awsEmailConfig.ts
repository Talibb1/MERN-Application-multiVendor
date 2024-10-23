import { SESClient } from '@aws-sdk/client-ses';

import { ACCESSKEYID, REGION, SECRETACCESSKEY } from './env';

if (!REGION || !ACCESSKEYID || !SECRETACCESSKEY) {
  throw new Error('Missing required environment variables');
}

// SESClient ka instance create karna
const sesClient = new SESClient({
  region: REGION as string,
  credentials: {
    accessKeyId: ACCESSKEYID as string,
    secretAccessKey: SECRETACCESSKEY as string,
  },
});

// Export karna
export const ses = sesClient;
