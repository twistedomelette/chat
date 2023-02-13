import AWS from 'aws-sdk';

type Credentials = {
    secret: string;
    access: string;
};

type UploadProps = Credentials & {
    bucketName: string;
    file: Express.Multer.File;
};

const getS3 = ({ secret, access }: Credentials): AWS.S3 => {
    return new AWS.S3({
        region: 'eu-central-1',
        credentials: {
            accessKeyId: access,
            secretAccessKey: secret,
        },
    });
};

const uploadImage = ({ bucketName, file, ...credentials }: UploadProps): Promise<AWS.S3.ManagedUpload.SendData> => {
    const s3 = getS3(credentials);

    return s3
        .upload({
            Bucket: bucketName,
            Key: file.originalname,
            Body: file.buffer,
        })
        .promise();
};

export default uploadImage