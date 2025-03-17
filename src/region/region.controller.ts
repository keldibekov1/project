import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './schemas/region.schema';

@ApiTags('Regions') // Swagger'da bo‘lim nomi
@Controller('regions')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi region yaratish' })
  @ApiResponse({ status: 201, description: 'Region muvaffaqiyatli yaratildi.', type: Region })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha regionlarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha regionlar', type: [Region] })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta regionni olish' })
  @ApiResponse({ status: 200, description: 'Region topildi', type: Region })
  @ApiResponse({ status: 404, description: 'Region topilmadi' })
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Regionni yangilash' })
  @ApiResponse({ status: 200, description: 'Region muvaffaqiyatli yangilandi', type: Region })
  @ApiResponse({ status: 404, description: 'Region topilmadi' })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Regionni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Region muvaffaqiyatli o‘chirildi', type: Region })
  @ApiResponse({ status: 404, description: 'Region topilmadi' })
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
