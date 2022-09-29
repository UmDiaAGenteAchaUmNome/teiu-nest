import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/entities/typeorm/produto';
import { CloudinaryProdutoHelper } from 'src/helpers/cloudinary/CloudinaryProdutoHelper';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private cloudinaryProdutoHelper: CloudinaryProdutoHelper
    ) {}

    public async listarProdutos(): Promise<Produto[]> {
        return await this.produtoRepository.find()
    }

    public async buscarProdutoPorId(idProduto: number): Promise<Produto> {
        return await this.produtoRepository.findOneBy({id: idProduto})
    }

    public async criarProduto(produto: Produto): Promise<Produto> {
        produto = await this.cloudinaryProdutoHelper.uploadImagensProduto(produto)
        await this.produtoRepository.save(produto)
        return produto
    }

    public async atualizarProduto(idProduto: number, produto: Produto): Promise<Produto> {
        produto = await this.cloudinaryProdutoHelper.uploadImagensProduto(produto)
        await this.produtoRepository.update(idProduto, produto)
        return await this.buscarProdutoPorId(idProduto)
    }

    public async excluirProduto(idProduto: number): Promise<void> {
        await this.produtoRepository.delete(idProduto)
    }
}
