import { Schema, models, model, Document } from "mongoose";

// Interface for Tag Document
interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

// Schema for Tag
const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false }, // Opsional
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

// Check if model already exists, otherwise create a new model
const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
