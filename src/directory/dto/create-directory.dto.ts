import { IsString, MinLength, IsEmail } from "class-validator";

export class CreateDirectoryDTO {
    @IsString()
    @MinLength(4)
    name: string;
    @IsEmail({}, {each : true})
    emails: string[];
}
