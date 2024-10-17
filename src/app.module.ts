import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DirectoryController } from './directory/directory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
  ],
  controllers: [AppController, DirectoryController],
  providers: [],
})
export class AppModule {}
