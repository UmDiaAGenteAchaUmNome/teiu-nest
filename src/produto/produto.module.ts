import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from 'src/entities/typeorm/produto';
import { CloudinaryProdutoHelper } from 'src/helpers/cloudinary/CloudinaryProdutoHelper';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
    controllers: [ProdutoController],
    providers: [ProdutoService, CloudinaryService, CloudinaryProdutoHelper],
    imports: [TypeOrmModule.forFeature([Produto])],
    exports: [TypeOrmModule]
})
export class ProdutoModule {}
