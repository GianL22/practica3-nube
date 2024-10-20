import {
  Controller,
  Get,
  Delete,
  NotImplementedException,
  Patch,
  Post,
  Param,
  Put,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateDirectoryDTO } from './dto/create-directory.dto';
import { DirectoryService } from './directory.service';
import { UpdateDirectoryDto } from './dto/update-directory.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { routes } from 'src/config/routes.config';
import { PartialUpdateDirectoryDto } from './dto/partial-update-directory.dto';

@Controller(routes.DIRECTORIES)
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}
  
  @Post()
  create(@Body() createDirectoryDto: CreateDirectoryDTO) {
    return this.directoryService.create(createDirectoryDto)
  }

  @Put(':term')
  update(@Param('term') term: string, @Body() updateDirectoryDto: UpdateDirectoryDto) {
    return this.directoryService.update(term, updateDirectoryDto);
  }

  @Patch(':term')
  updatePartial(@Param('term') term: string, @Body() partialUpdateDirectoryDto: PartialUpdateDirectoryDto) {
    return this.directoryService.partialUpdate(term, partialUpdateDirectoryDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {;
    return this.directoryService.findOne(term);
  }

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.directoryService.getAll(pagination);
  }

  @Delete(':term')
  removeOne(@Param('term') term: string) {
    return this.directoryService.deleteOne(term);
  }

  @Delete()
  remove() {
    return this.directoryService.delete();
  }
  
}
