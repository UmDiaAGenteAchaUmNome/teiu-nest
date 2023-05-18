import { ConfigOptions } from "cloudinary";
import envConfig from "src/config/env/env.config";

export const CloudinaryCredentials: ConfigOptions = {
    cloud_name: envConfig().thirdParty.cloudinary.name,
    api_key: envConfig().thirdParty.cloudinary.key,
    api_secret: envConfig().thirdParty.cloudinary.secret
}