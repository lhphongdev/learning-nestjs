import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CategoryEntity } from '../../entities/categories.entity';
import { Category } from '../models/category.model';
import { ICategoryRepository } from 'src/interfaces/ICategoryRepository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ['cars'] });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['cars'],
    });
  }

  async create(category: Category): Promise<Category> {
    return await this.categoryRepository.save(category);
  }

  async update(id: number, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.findOne(id);
  }

  async delete(id: number): Promise<boolean> {
    const isFlag: DeleteResult = await this.categoryRepository.delete(id);
    return isFlag.affected === 1;
  }
}
