import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ElonService } from './elon.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { Elon } from './schemas/elon.schema';

@ApiTags('Elon')
@Controller('elon')
export class ElonController {
  constructor(private readonly elonService: ElonService) {}

  @Post()
  @ApiOperation({ summary: 'Elon yaratish' })
  @ApiResponse({ status: 201, description: 'Elon yaratildi', type: Elon })
  create(@Body() createElonDto: CreateElonDto) {
    return this.elonService.create(createElonDto);
  }

  @Get()
@ApiOperation({ summary: 'Barcha elonlarni olish' })
@ApiResponse({ status: 200, description: 'Elonlar royxati', type: [Elon] })
@ApiQuery({ name: 'title', required: false, description: 'Elon sarlavhasi boyicha qidirish' })
@ApiQuery({ name: 'minPrice', required: false, description: 'Minimal narx', type: Number })
@ApiQuery({ name: 'maxPrice', required: false, description: 'Maksimal narx', type: Number })
@ApiQuery({ name: 'sortBy', required: false, description: 'Sort qilish maydoni (default: createdAt)' })
@ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort tartibi (asc/desc)' })
@ApiQuery({ name: 'page', required: false, type: Number, description: 'Sahifa raqami (default: 1)' })
@ApiQuery({ name: 'limit', required: false, type: Number, description: 'Har bir sahifada nechta element (default: 10)' })
findAll(
  @Query('title') title?: string,
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string,
  @Query('sortBy') sortBy?: string,
  @Query('order') order?: 'asc' | 'desc',
  @Query('page') page?: string,
  @Query('limit') limit?: string
) {
    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: 'i' };
    if (minPrice && maxPrice) filter.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
  
    return this.elonService.findAll(
      filter,
      sortBy || 'createdAt',
      order || 'desc', 
      Number(page) || 1, 
      Number(limit) || 10 
    );
 }
  


  @Get(':id')
  @ApiOperation({ summary: 'Bitta elon olish' })
  @ApiResponse({ status: 200, description: 'Elon topildi', type: Elon })
  findOne(@Param('id') id: string) {
    return this.elonService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Elon yangilash' })
  @ApiResponse({ status: 200, description: 'Elon yangilandi', type: Elon })
  update(@Param('id') id: string, @Body() updateElonDto: UpdateElonDto) {
    return this.elonService.update(id, updateElonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elon ochirish' })
  @ApiResponse({ status: 200, description: 'Elon ochirildi' })
  remove(@Param('id') id: string) {
    return this.elonService.remove(id);
  }

  @Get('/sorted')
@ApiOperation({ summary: 'Elonlarni buyurtmalar soni boyicha tartiblash' })
@ApiResponse({ status: 200, description: 'Tartiblangan elonlar', type: [Elon] })
findAllSortedByOrders() {
  return this.elonService.findAllSortedByOrders();
}

}
