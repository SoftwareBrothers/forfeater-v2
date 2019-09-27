import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { SlackModule } from './slack/slack.module';
import { VendorModule } from './vendors/vendors.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ChoicesModule } from './choices/choices.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    SlackModule,
    VendorModule,
    ProductsModule,
    OrdersModule,
    ChoicesModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule { }
