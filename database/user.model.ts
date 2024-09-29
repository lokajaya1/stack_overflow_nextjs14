import { Schema, models, model, Document } from "mongoose";

// Interface for User Document
interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string; // Optional, especially if users log in via Google or other methods
  bio?: string; // Optional
  picture: string; // Link to profile picture
  location?: string; // Optional
  portfolioWebsite?: string; // Optional link to user's portfolio
  reputation?: number; // Optional, default value will be 0
  saved: Schema.Types.ObjectId[]; // Array of ObjectIds referencing saved questions
  joinedAt: Date;
}

// Schema for User
const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true }, // Clerk auth ID
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional
  bio: { type: String }, // Optional
  picture: { type: String, required: true }, // Link to picture
  location: { type: String }, // Optional
  portfolioWebsite: { type: String }, // Optional
  reputation: { type: Number, default: 0 }, // Default reputation
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Ref to saved questions
  joinedAt: { type: Date, default: Date.now }, // Auto-sets to current date
});

// Check if model already exists, otherwise create a new model
const User = models.User || model<IUser>("User", UserSchema);

export default User;
