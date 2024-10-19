import { Module } from '@nestjs/common';
import { DirectoryController } from './directory.controller';
import { DirectoryService } from './directory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Directory, DirectorySchema } from './models/directory.model';
@Module({
  controllers: [DirectoryController],
  providers: [DirectoryService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Directory.name,
        schema: DirectorySchema
      }
    ])
  ],
  exports:[MongooseModule]
})
export class DirectoryModule {}
