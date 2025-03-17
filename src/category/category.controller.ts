import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schema';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Kategoriya yaratish' })
  @ApiResponse({ status: 201, description: 'Kategoriya yaratildi', type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar royxati', type: [Category] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta kategoriya olish' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi', type: Category })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Kategoriya yangilash' })
  @ApiResponse({ status: 200, description: 'Kategoriya yangilandi', type: Category })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kategoriya ochirish' })
  @ApiResponse({ status: 200, description: 'Kategoriya ochirildi' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
