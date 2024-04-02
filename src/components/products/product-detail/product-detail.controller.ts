import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt.guard';
import { ProductDetailService } from './product-detail.service';

@Controller('product/detail')
export class ProductDetailController {

    constructor(
        private readonly productDetailService: ProductDetailService
    ) { }

    @Delete(':id')
    @UseGuards(JwtGuard)
    public async deleteProductDetail(@Param('id') detailId: number) {
        try {
            return await this.productDetailService.deleteProductDetail(detailId)
        } catch (error) {
            console.error(error)
        }
    }

}
