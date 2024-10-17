import {
  Controller,
  Get,
  Delete,
  NotImplementedException,
  Patch,
  Post,
  Param,
  Put,
} from '@nestjs/common';

@Controller('directories')
export class DirectoryController {
  @Post()
  create() {
    throw new NotImplementedException();
  }
  @Put()
  update() {
    throw new NotImplementedException();
  }
  @Patch()
  updatePartial() {
    throw new NotImplementedException();
  }
  @Get(':id')
  findOne(@Param(':id') id: string) {
    console.log(id);
    throw new NotImplementedException();
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
