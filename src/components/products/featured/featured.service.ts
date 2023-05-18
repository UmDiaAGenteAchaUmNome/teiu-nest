import { Filter } from '@apicore/nestjs/lib';
import { FeaturedDTO } from '@apicore/teiu/lib';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Featured } from 'src/entities/featured';
import { Image } from 'src/entities/image';
import { CloudinaryService } from 'src/third_party/images/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';

@Injectable()
export class FeaturedService {

    private readonly relations: string[] = ['image', 'category']

    constructor(
        @InjectRepository(Featured)
        private readonly repository: Repository<Featured>,
        
        @InjectRepository(Image)
        private readonly imageRepository: Repository<Image>,
        private readonly filter: Filter,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    public async search(filters?: Featured) {
        return await this.repository.find({
            where: this.filter.build(filters),
            relations: this.relations
        })
    }

    public async findById(id: number) {
        return await this.repository.findOne({
            where: { id },
            relations: this.relations
        })
    }

    public async save(featuredProduct: FeaturedDTO) {
        featuredProduct = await this.saveImage(featuredProduct)
        return await this.repository.save(featuredProduct)
    }

    public async update(id: number, featuredProject: FeaturedDTO) {
        featuredProject = await this.saveImage(featuredProject)
        return await this.repository.update(id, featuredProject)
    }

    public async delete(id: number) {
        return await this.repository.delete(id)
    }

    private async saveImage(featuredProduct: FeaturedDTO) {
        if (!featuredProduct.image.link && featuredProduct.image.base64src) {
            featuredProduct.image = await this.cloudinaryService.uploadImageDto(
                featuredProduct.image,
                `/destaques`
            )

            featuredProduct.image = await this.imageRepository.save(featuredProduct.image)
        }

        return featuredProduct
    }

}
