import { IsUUID, IsString, MinLength, minLength, IsEmail, IsArray } from "class-validator";

export class CreateDirectoryDTO {
    @IsUUID()
    id: string;
    @IsString()
    name: string;
    @IsArray()
    emails: string[];
}
