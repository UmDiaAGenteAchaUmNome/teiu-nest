import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CloudinaryImage } from 'src/entities/images/cloudinary/image.model';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';

@Controller('experimental')
export class ExperimentalController {

    constructor(
        private cloudinaryService: CloudinaryService,
        private http: HttpService
    ) {}

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
}
