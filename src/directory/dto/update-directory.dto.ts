import { IsEmail, IsInt, IsPositive, IsString, MinLength } from 'class-validator';
import { CreateDirectoryDTO } from './create-directory.dto';
import { Prop } from '@nestjs/mongoose';

export class UpdateDirectoryDto extends CreateDirectoryDTO {
    @IsInt()
    @IsPositive()
    id: number
}