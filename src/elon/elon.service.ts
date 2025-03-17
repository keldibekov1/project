import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Elon, ElonDocument } from './schemas/elon.schema';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';

@Injectable()
export class ElonService {
  constructor(@InjectModel(Elon.name) private elonModel: Model<ElonDocument>) {}

  async create(createElonDto: CreateElonDto): Promise<Elon> {
    const elon = new this.elonModel(createElonDto);
    return elon.save();
  }

  async findAll(): Promise<Elon[]> {
    return this.elonModel.find().populate('category').exec();
  }

  async findOne(id: string): Promise<Elon> {
    const elon = await this.elonModel.findById(id).populate('category').exec();
    if (!elon) {
      throw new NotFoundException(`Elon with id ${id} not found`);
    }
    return elon;
  }

  async update(id: string, updateElonDto: UpdateElonDto): Promise<Elon> {
    const elon = await this.elonModel.findByIdAndUpdate(id, updateElonDto, { new: true }).exec();
    if (!elon) {
      throw new NotFoundException(`Elon with id ${id} not found`);
    }
    return elon;
  }

  async remove(id: string): Promise<void> {
    const result = await this.elonModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Elon with id ${id} not found`);
    }
  }

  async findAllSortedByOrders(): Promise<Elon[]> {
    return this.elonModel.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'elon',
          as: 'orders'
        }
      },
      {
        $addFields: { orderCount: { $size: '$orders' } }
      },
      {
        $sort: { orderCount: -1 }
      }
    ]).exec();
  }
  
}
