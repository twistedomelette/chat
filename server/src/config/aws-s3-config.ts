/* AWS S3 config options */
/* Highly recommended to declare the config object in an external file import it when needed */

/* s3Config.ts */

import { env } from "./env";

export const s3Config = {
    bucketName: env.aws.bucket,
    albumName: 'photos',
    region: 'eu-central-1',
    accessKeyId: env.aws.access,
    secretAccessKey: env.aws.secret,
}

/* End of s3Config.ts */