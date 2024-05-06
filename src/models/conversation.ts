import {InferSchemaType, model, Schema} from 'mongoose';

const myschema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    inquiry: String,
    title: String,
    message: String,
    thread_id: String,
  },
  {timestamps: true}
);

type ConversationType = InferSchemaType<typeof myschema>;

export default model<ConversationType>('Conversation', myschema);