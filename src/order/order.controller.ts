import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Buyurtma yaratish' })
  @ApiResponse({ status: 201, description: 'Buyurtma yaratildi', type: Order })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({ status: 200, description: 'Buyurtmalar royxati', type: [Order] })
  @ApiQuery({ name: 'status', required: false, description: 'Buyurtma statusi boyicha filterlash' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort qilish maydoni (default: createdAt)' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'], description: 'Sort tartibi (asc/desc)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Sahifa raqami (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Har bir sahifada nechta element (default: 10)' })
  findAll(
    @Query('status') status?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const filter: any = {};
    if (status) filter.status = status;

    return this.orderService.findAll(
      filter,
      sortBy || 'createdAt', 
      order || 'desc',
      Number(page) || 1, 
      Number(limit) || 10 
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta buyurtmani olish' })
  @ApiResponse({ status: 200, description: 'Buyurtma topildi', type: Order })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Buyurtmani yangilash' })
  @ApiResponse({ status: 200, description: 'Buyurtma yangilandi', type: Order })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Buyurtmani ochirish' })
  @ApiResponse({ status: 200, description: 'Buyurtma ochirildi' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
