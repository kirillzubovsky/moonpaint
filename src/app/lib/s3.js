// lib/s3.js
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Initialize the S3 client
const s3Client = new S3Client({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function listImages() {
  try {
    const command = new ListObjectsV2Command({
      Bucket: "moonpaint",
    });

    const data = await s3Client.send(command);

    const imageUrls = data.Contents.filter(item => item.Key.match(/\.(jpg|jpeg|png|gif)$/))
                                    .map(item => `https://moonpaint.s3.us-west-1.amazonaws.com/${item.Key}`);

    return imageUrls;
  } catch (err) {
    console.error("Error fetching images from S3:", err);
    return [];
  }
}
