import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDirectoryDTO } from './dto/create-directory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Directory } from './schemas/directory.schema';
import { isValidObjectId, Model } from 'mongoose';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Injectable()
export class DirectoryService {

  constructor(
    @InjectModel(Directory.name)
    private readonly directoryModel: Model<Directory>
  ){}
  
  async create(createDirectoryDto: CreateDirectoryDTO) {
    try {
      const directory = await this.directoryModel.create(createDirectoryDto);
      return directory;
    }catch (error){
      this.handleExceptions(error);
    }
  }

  async findOne(term: string) {
    let directory: Directory;
    directory = await this.directoryModel.findOne({name: term});
    if(isValidObjectId(term)){
      directory = await this.directoryModel.findById(term);
    }
    if(!directory){
      directory = await this.directoryModel.findOne({name: term});
    }
    if(!directory) throw new NotFoundException(`directory with id or name "${term}" not found`);

    return directory;
  }

  async update(term: string, updateDirectoryDto: UpdateDirectoryDto) {
    try {
      console.log(term);
      const directoryUpdated = await this.directoryModel.findByIdAndUpdate(term, updateDirectoryDto, { new: true });
      if (!directoryUpdated) {
        throw new NotFoundException(`Directory with ID "${term}" not found`);
      }
      return directoryUpdated;
    } catch (error) {
      this.handleExceptions(error);
    }
  }


  private handleExceptions(error: any){
    if(error.code === 11000){   // error de dato duplicado
      throw new BadRequestException(`Directory already exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Directory - Check server logs`)
  }
  
  // create() {
  //   return 0;
  // }
}
