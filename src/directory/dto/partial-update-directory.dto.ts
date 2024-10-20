import  { PartialType } from '@nestjs/mapped-types';
import { CreateDirectoryDTO } from './create-directory.dto';

export class PartialUpdateDirectoryDto extends PartialType(CreateDirectoryDTO) {}