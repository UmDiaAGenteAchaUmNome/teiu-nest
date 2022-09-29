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

    public uploadImagensProduto(produto: Produto): Produto {
        this.produto = produto



        return produto
    }

    private buildCloudinaryImage(titulo: string, imagem: string): CloudinaryImage {
        const cloudinaryImage: CloudinaryImage = {
            title: this.tratarTituloCloudinary(titulo),
            data: imagem,
            path: `teiu/produtos/${this.tratarTituloCloudinary(this.produto.titulo)}`
        }

        return new CloudinaryImage()
    }

    private tratarTituloCloudinary(titulo: string): string {
        return titulo.replace(/ |\/|-/gi, '_')
    }

}