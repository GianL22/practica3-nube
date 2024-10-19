import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DirectoryController } from './directory/directory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DirectoryModule } from './directory/directory.module';
import { DirectoryService } from './directory/directory.service';
import { Directory } from './directory/schemas/directory.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    DirectoryModule
  ], 
  controllers: [AppController, DirectoryController],
  providers: [DirectoryService],
})
export class AppModule {}
