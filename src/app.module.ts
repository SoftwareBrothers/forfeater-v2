import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { SlackModule } from './slack/slack.module';
import { VendorModule } from './vendors/vendors.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    SlackModule,
    VendorModule,
    ProductsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule { }
