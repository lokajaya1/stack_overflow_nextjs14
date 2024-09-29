import { Schema, models, model, Document } from "mongoose";

// Interface for Tag Document
interface ITag extends Document {
  name: string;
  description?: string;
  questions: Schema.Types.ObjectId[]; // Reference to Question model
  followers: Schema.Types.ObjectId[]; // Reference to User model
  createdOn: Date;
}

// Schema for Tag
const TagSchema = new Schema<ITag>({
  name: { type: String, required: true, unique: true }, // Tag name must be unique
  description: { type: String, required: true }, // Optional description
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Refers to associated questions
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }], // Refers to users following the tag
  createdOn: { type: Date, default: Date.now }, // Auto-set to current date
});

// Check if model already exists, otherwise create a new model
const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
