import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/categories.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    private categoriesService: CategoriesService){}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      relations: ['products']
    });
    if(!category){
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const NewCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(NewCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne(id);
    this.categoryRepo.merge(category, changes)
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
