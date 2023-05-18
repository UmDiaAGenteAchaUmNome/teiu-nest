import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/components/image/image.service';
import { ProductDetail } from 'src/entities/product/product-detail';
import { Repository } from 'typeorm';

@Injectable()
export class ProductDetailService {

    constructor(
        @InjectRepository(ProductDetail)
        private readonly detailRepository: Repository<ProductDetail>,
        private readonly imageService: ImageService
    ) {}

    public async deleteProductDetail(detailId: number) {
        try {
            let productDetail = await this.detailRepository.findOne({
                where: { id : detailId },
                relations: [ 'image' ]
            })
    
            await this.imageService.deleteImage(productDetail.image)

            //TODO: investigar cascade de imagem

            return true
        } catch(error) {
            console.error(error)
            console.log('do something...')
            return false
        }
    }

}
