import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';
import { ElonModule } from './elon/elon.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, AuthModule, MongooseModule.forRoot('mongodb://localhost:27017/project'), RegionModule, CategoryModule, ElonModule, OrderModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
