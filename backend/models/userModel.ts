import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface IUserDocument extends IUser, Document {
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;
