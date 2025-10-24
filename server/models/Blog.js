import { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "published", "archived"],
    },
    category: { type: String, required: true },
    coverImage: {
      url: { type: String },
      publicId: { type: String },
    },
    publishedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slug: { type: String, required: true, unique: true },
    viewCount: { type: Number, default: 0 },
    readingTime: { type: Number, default: 0 }, // in minutes
    excerpt: { type: String },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Blog = model("Blog", blogSchema);

export default Blog;