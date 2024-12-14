import mongoose from "mongoose";

export interface IUser {
  _id: string;
  email: string;
  name: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [1, "Name must be at least 1 character"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email Address is required"],
      validate: {
        validator: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        message: "Please enter a valid email address",
      },
    },
    image: {
      type: String,
      default: null,
      validate: {
        validator: (url: string) => url == null || /^https:\/\/.+/.test(url),
        message: "Please enter a valid HTTPS image URL",
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || mongoose.model<IUser>("User", userSchema, "users");
export default User;
