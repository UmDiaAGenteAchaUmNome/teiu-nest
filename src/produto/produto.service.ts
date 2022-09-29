import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from 'src/entities/typeorm/produto';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        private readonly produtoRepository: Repository<Produto>
    ) {}

    public async criarProduto(produto: Produto): Promise<Produto> {
        await this.produtoRepository.save(produto)
        return produto
    }

    public async listarProdutos(): Promise<Produto[]> {
        return await this.produtoRepository.find()
    }

    public async buscarProdutoPorId(idProduto: number): Promise<Produto> {
        return await this.produtoRepository.findOneBy({id: idProduto})
    }

    public async atualizarProduto(idProduto: number, produto: Produto): Promise<Produto> {
        await this.produtoRepository.update(idProduto, produto)
        return await this.buscarProdutoPorId(idProduto)
    }

    public async excluirProduto(idProduto: number): Promise<void> {
        await this.produtoRepository.delete(idProduto)
    }
}
