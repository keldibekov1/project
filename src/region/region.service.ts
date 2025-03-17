import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region, RegionDocument } from './schemas/region.schema';
import { Model } from 'mongoose';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private regionModel: Model<RegionDocument>) {}
  create(createRegionDto: CreateRegionDto) {
    const createdRegion = new this.regionModel(createRegionDto);
    return createdRegion.save();
  }

  findAll() {
    return  this.regionModel.find().exec();
  }

  findOne(id: string) {
    const region = this.regionModel.findById(id).exec();
    if (!region) {
      throw new NotFoundException(`Region with id ${id} not found`);
    }
    return region;
  }
  

  async update(id: string, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const updatedRegion = await this.regionModel.findByIdAndUpdate(id, updateRegionDto, { new: true }).exec();
    if (!updatedRegion) {
      throw new NotFoundException(`Region with id ${id} not found`);
    }
    return updatedRegion;
  }

  async remove(id: string): Promise<Region> {
    const deletedRegion = await this.regionModel.findByIdAndDelete(id).exec();
    if (!deletedRegion) {
      throw new NotFoundException(`Region with id ${id} not found`);
    }
    return deletedRegion;
  }
}
