import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
  findAll() {
    return this.elonService.findAll();
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
@ApiOperation({ summary: 'E’lonlarni buyurtmalar soni bo‘yicha tartiblash' })
@ApiResponse({ status: 200, description: 'Tartiblangan e’lonlar', type: [Elon] })
findAllSortedByOrders() {
  return this.elonService.findAllSortedByOrders();
}

}
