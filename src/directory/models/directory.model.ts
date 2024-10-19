import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'directories', versionKey : false })
export class Directory {
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
