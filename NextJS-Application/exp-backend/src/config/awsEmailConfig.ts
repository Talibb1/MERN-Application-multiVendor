import AWS from 'aws-sdk';
import { ACCESSKEYID, REGION, SECRETACCESSKEY } from './env';

AWS.config.update({
  region: REGION,
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
});

export const ses = new AWS.SES();

