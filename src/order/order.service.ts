import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.orderModel(createOrderDto);
    return order.save();
  }

  async findAll(
    filter: any,
    sortBy: string,
    order: 'asc' | 'desc',
    page: number,
    limit: number
  ): Promise<Order[]> {
    const skip = (page - 1) * limit;
    const sortOrder = order === 'asc' ? 1 : -1;
  
    return this.orderModel
      .find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec();
  }
  

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('elon').exec();
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
