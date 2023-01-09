import { CloudinaryImage } from '@apicore/teiu/lib/third-party';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CryptHelper } from 'src/helpers/auth/crypt.helper';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';

@ApiTags('Experimental Routes')
@Controller('experimental')
export class ExperimentalController {

    constructor(
        private cloudinaryService: CloudinaryService,
        private http: HttpService,
        private crypt: CryptHelper
    ) { }

    @Post("image-upload")
    public async uploadImageToCloudinary(@Body() image: CloudinaryImage) {
        return await this.cloudinaryService.uploadImage(image)
    }

    @Get()
    public async checkCloudinaryResponse() {
        let response = await this.http.axiosRef.get('http://res.cloudinary.com/arpdevs-tecnologia/image/upload/v1664465213/exp/gow/Cleit%C3%A3o%20da%20Ma%C3%A7a.jpg')

        console.log(response.data)
        return response.data
    }

    @Get("salt")
    public async generateSalt(): Promise<string> {
        return await this.crypt.generateSalt()
    }

    @Get("hash/:data")
    public async generateHash(@Param('data') data: string): Promise<string> {
        return await this.crypt.generateCryptedHash(data)
    }

    @Get("logged-user")
    public async getLoggedUser(@Headers() headers) {
        const token = headers.authorization.split(" ")[1]

        return JSON.parse(Buffer.from((token.split('.')[1]), 'base64').toString()).user
    }
}