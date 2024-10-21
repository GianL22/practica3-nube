import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Document} from 'mongoose';
import { routes } from 'src/config/routes.config';

@Schema({ collection: routes.DIRECTORIES, versionKey : false})
export class Directory extends Document {
  @Prop({
    type: 'Number',
  })
  id: number
  
  @Prop({
    required: true,
    unique: true,
    minlength: 4,
  })
  name: string;
  
  @Prop({
    type: [String],
    required: true,
    unique: true,
    minlength: 4,
  })
  emails: string[];
}

export const DirectorySchema = SchemaFactory.createForClass(Directory);
