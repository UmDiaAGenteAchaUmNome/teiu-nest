import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Produto } from 'src/entities/typeorm/produto';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {

    constructor(
        private produtoService: ProdutoService
    ) {}

    @Get()
    public async listarProdutos(): Promise<Produto[]> {
        return await this.produtoService.listarProdutos()
    }

    @Get(':id')
    public async buscarProdutoPorId(@Param('id') idProduto: number): Promise<Produto> {
        return await this.produtoService.buscarProdutoPorId(idProduto)
    }

    @Post()
    public async criarProduto(@Body() produto: Produto): Promise<Produto> {
        return await this.produtoService.criarProduto(produto)
    }

    @Put(':id')
    public async atualizarProduto(@Param('id') idProduto: number, @Body() produto: Produto): Promise<Produto> {
        return await this.produtoService.atualizarProduto(idProduto, produto)
    }

    @Delete(':id')
    public async excluirProduto(@Param('id') idProduto: number): Promise<void> {
        await this.produtoService.excluirProduto(idProduto)
    }

}
