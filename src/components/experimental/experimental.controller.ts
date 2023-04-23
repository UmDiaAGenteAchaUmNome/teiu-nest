import { CloudinaryImage } from '@apicore/teiu/lib/third-party';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
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

    @Get("data")
    public async getALotOfData(@Query() params: any) {
        const data = []
        console.log(params)

        for (let size = 0; size < params.$pageSize; size++) {
            data.push({
                keys: {
                    id: size + 1
                },
                values: {
                    firstColumn: `Example First Column Item ${size + 1}`,
                    secondColumn: `Example Second Column Item ${size + 1}`,
                    scenario: `Scenario ${size + 1}`
                }
            })
        }

        return {
            links: {
                self: `example/customObjectData/token/tokenExample/rowset?$page=${params.$pageSize}`
            },
            requestToken: 'tokenExample',
            tokenExpireDateUtc: '2023-04-07T14:32:00.07',
            customObjectId: 'objectIdExample',
            customObjectKey: 'customObjectIdExample',
            pageSize: params.$pageSize,
            page: 1,
            count: params.$pageSize,
            top: 0,
            items: data
        }
    }
}