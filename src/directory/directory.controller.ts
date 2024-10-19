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
} from '@nestjs/common';
import { CreateDirectoryDTO } from './dto/create-directory.dto';
import { DirectoryService } from './directory.service';
import { UpdateDirectoryDto } from './dto/update-directory.dto';

@Controller('directories')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}
  
  @Post()
  create(@Body() createDirectoryDto: CreateDirectoryDTO) {
    return this.directoryService.create(createDirectoryDto)
  }
  @Put(':term')
  update(@Param('term') term: string, @Body() updateDirectoryDto: UpdateDirectoryDto) {
    console.log(term);
    return this.directoryService.update(term, updateDirectoryDto);
  }
  @Patch()
  updatePartial() {
    throw new NotImplementedException();
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    console.log(term);
    return this.directoryService.findOne(term);
  }
  @Get()
  findAll() {
    throw new NotImplementedException();
  }
  @Delete()
  remove() {
    throw new NotImplementedException();
  }
}
