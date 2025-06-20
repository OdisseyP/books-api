import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';
import { FilterGenresDto } from './dto/filter-genres.dto';
import { Like } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private genreRepository: Repository<Genre>,
  ) {}

  async findAll(filterGenresDto: FilterGenresDto): Promise<{ items: Genre[]; total: number }> {
    const { search, slug, sortBy = 'createdAt', order = 'desc', limit = 10, offset = 0 } = filterGenresDto;
    
    const query = this.genreRepository.createQueryBuilder('genre');

    if (search) {
      query.andWhere(
        '(genre.name ILIKE :search OR genre.description ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (slug) {
      query.andWhere('genre.slug = :slug', { slug });
    }

    query.orderBy(`genre.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');

    query.take(limit).skip(offset);

    const [items, total] = await query.getManyAndCount();

    return { items, total };
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${id} not found`);
    }
    
    return genre;
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genreData = { ...createGenreDto };
    
    if (!genreData.slug) {
      genreData.slug = this.generateSlug(genreData.name);
    }
    
    const genre = this.genreRepository.create(genreData);
    
    return this.genreRepository.save(genre);
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.findOne(id);

    const dataToUpdate = { ...updateGenreDto };

    if (dataToUpdate.name && !dataToUpdate.slug) {
      dataToUpdate.slug = this.generateSlug(dataToUpdate.name);
    }

    const updatedGenre = {
      ...genre,
      ...dataToUpdate,
    };

    return this.genreRepository.save(updatedGenre);
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    
    await this.genreRepository.remove(genre);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-') 
      .replace(/^-+|-+$/g, '') 
      .trim();
  }
} 