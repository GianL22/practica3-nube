import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateDirectoryDTO } from './dto/create-directory.dto';
import { Directory } from './models/directory.model';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { PartialUpdateDirectoryDto } from './dto/partial-update-directory.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { routes } from 'src/config/routes.config';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectModel(Directory.name)
    private readonly directoryModel: Model<Directory>,
  ) {}

  private async getNextId(): Promise<number> {
    const lastDocument = await this.directoryModel
      .findOne()
      .sort({ id: -1 })
      .limit(1);
    return !lastDocument ? 1 : lastDocument.id + 1;
  }

  async create(createDirectoryDto: CreateDirectoryDTO) {
    try {
      const id = await this.getNextId();
      const directory = await this.directoryModel.create({
        ...createDirectoryDto,
        id: id,
      });
      return {
        id,
        ...createDirectoryDto,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(term: number) {
    let directory: Directory;
    if (isNaN(+term) && isValidObjectId(term)) {
      console.log(term);
      directory = await this.directoryModel.findById(term);
    }
    if (!directory) {
      directory = await this.directoryModel
        .findOne({ id: term })
        .select('-_id');
    }
    if (!directory)
      throw new NotFoundException(
        `directory with id or name "${term}" not found`,
      );

    return directory;
  }

  async update(term: number, updateDirectoryDto: UpdateDirectoryDto) {
    const {id, ...directory} = updateDirectoryDto;
    if(term != id)
        throw new BadRequestException(`Directory with ${id} does not match the ID (${term}) of the directory to be updated`);
    return this.partialUpdate(term, directory);
  }

  async partialUpdate(
    term: number,
    partialUpdateDirectoryDto: PartialUpdateDirectoryDto,
  ) {
    try {
      const directoryDB = await this.directoryModel.findOneAndUpdate(
        { id: term },
        partialUpdateDirectoryDto,
        { new: true },
      );
      if (!directoryDB) {
        throw new NotFoundException(`Directory with ID "${term}" not found`);
      }
      const { _id, ...response } = directoryDB.toObject();
      return {
        ...response,
        ...partialUpdateDirectoryDto,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async deleteOne(term: number) {
    const id = term;
    await this.findOne(term);
    await this.directoryModel.deleteOne({ id: term });
    return id;
  }

  async getAll({ limit = 5, offset = 0 }: PaginationDTO) {
    const directory = await this.directoryModel
      .find()
      .select('-_id')
      .limit(limit)
      .skip(offset);

    const totalCount = await this.directoryModel.countDocuments();
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(totalCount / limit);

    const { APP_HOST, PORT } = process.env;
    const baseUri = `${APP_HOST}:${PORT}/${routes.DIRECTORIES}`;

    return {
      count: totalCount,
      next:
        offset + limit >= totalCount
          ? null
          : `${baseUri}/?limit=${limit}&offset=${offset + limit}`,
      previous:
        offset <= 0
          ? null
          : `${baseUri}/?limit=${limit}&offset=${Math.max(offset - limit, 0)}`,
      results: directory,
    };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      // error de dato duplicado
      throw new BadRequestException(
        `Directory already exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Directory - Check server logs`,
    );
  }
}
