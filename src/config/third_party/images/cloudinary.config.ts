import { ConfigOptions } from "cloudinary";

export const CloudinaryCredentials: ConfigOptions = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
}