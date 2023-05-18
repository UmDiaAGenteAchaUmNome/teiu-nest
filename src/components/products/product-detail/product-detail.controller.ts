import { Controller, Delete, Param } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';

@Controller('product/detail')
export class ProductDetailController {

    constructor(
        private readonly productDetailService: ProductDetailService
    ) {}

    @Delete(':id')
    public async deleteProductDetail(@Param('id') detailId: number) {
        try {
            return await this.productDetailService.deleteProductDetail(detailId)
        } catch(error) {
            console.error(error)
        }
    }

}
