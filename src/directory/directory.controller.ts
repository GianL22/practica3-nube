import {
  Controller,
  Get,
  Delete,
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
    return this.directoryService.create(createDirectoryDto);
  }

  @Put(':term')
  update(
    @Param('term', ParseIntPipe) term: number,
    @Body() updateDirectoryDto: UpdateDirectoryDto,
  ) {
    return this.directoryService.update(term, updateDirectoryDto);
  }

  @Patch(':term')
  updatePartial(
    @Param('term', ParseIntPipe) term: number,
    @Body() partialUpdateDirectoryDto: PartialUpdateDirectoryDto,
  ) {
    return this.directoryService.partialUpdate(term, partialUpdateDirectoryDto);
  }


  @Get(':term')
  findOne(@Param('term', ParseIntPipe) term: number) {
    return this.directoryService.findOne(term);
  }

  @Get()
  findAll(@Query() pagination: PaginationDTO) {
    return this.directoryService.getAll(pagination);
  }

  @Delete(':term')
  removeOne(@Param('term', ParseIntPipe) term: number) {
    return this.directoryService.deleteOne(term);
  }
}
