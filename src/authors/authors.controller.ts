import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilterAuthorsDto } from './dto/filter-authors.dto';
import { Author } from './entities/author.entity';
import { PaginatedAuthorsDto } from './dto/paginated-authors.dto';

@Controller('authors')
@ApiTags('Authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({ status: 201, description: 'The author has been successfully created.', type: Author })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: 'Get a list of authors' })
  @ApiResponse({ status: 200, description: 'List of authors with pagination.', type: PaginatedAuthorsDto })
  @Get()
  findAll(@Query() filterAuthorsDto: FilterAuthorsDto) {
    return this.authorsService.findAll(filterAuthorsDto);
  }

  @ApiOperation({ summary: 'Get a single author by ID' })
  @ApiResponse({ status: 200, description: 'Author details.', type: Author })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an existing author' })
  @ApiResponse({ status: 200, description: 'The author has been successfully updated.', type: Author })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @ApiOperation({ summary: 'Delete an author' })
  @ApiResponse({ status: 200, description: 'The author has been successfully deleted.', type: Author })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.remove(id);
  }
}
