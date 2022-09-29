import { Injectable } from "@nestjs/common"
import { CloudinaryImage } from "src/entities/images/cloudinary/image.model"
import { Produto } from "src/entities/typeorm/produto"
import { CloudinaryService } from "src/third_party/images/cloudinary/cloudinary.service"

@Injectable()
export class CloudinaryProdutoHelper {

    private produto: Produto

    constructor(
        private cloudinaryService: CloudinaryService
    ) {}

    public async uploadImagensProduto(produto: Produto): Promise<Produto> {
        this.produto = produto

        const imagemProduto = this.buildCloudinaryImage(this.produto.titulo, this.produto.imagem)
        const imagemBanner = this.buildCloudinaryImage(this.produto.titulo.concat('_banner'), this.produto.imagemBanner)

        produto.imagem = await this.cloudinaryService.uploadImage(imagemProduto)
        produto.imagemBanner = await this.cloudinaryService.uploadImage(imagemBanner)

        return produto
    }

    private buildCloudinaryImage(titulo: string, imagem: string): CloudinaryImage {
        const cloudinaryImage: CloudinaryImage = {
            title: this.tratarTituloCloudinary(titulo),
            data: imagem,
            path: `teiu/produtos/${this.tratarTituloCloudinary(this.produto.titulo)}`
        }

        return cloudinaryImage
    }

    private tratarTituloCloudinary(titulo: string): string {
        return titulo.replace(/ |\/|-/gi, '_').toLowerCase()
    }

}