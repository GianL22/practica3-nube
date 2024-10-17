import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'directories' })
export class Directory {
  @Prop({
    type: SchemaTypes.UUID,
    unique: true,
    required: true,
  })
  id: string;
  @Prop({
    required: true,
    minlength: 4,
  })
  name: string;
  @Prop({
    type: [String],
    required: true,
    minlength: 4,
  })
  emails: string[];
}

export const DirectorySchema = SchemaFactory.createForClass(Directory);
