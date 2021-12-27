import mongoose from "mongoose";
import { UserDocument } from "./user";

export type PostDocument = mongoose.Document & {
    title: string;
    url: string;
    body: string;
    publishedAt: Date;
    user: UserDocument;

    meta: {
        tags: string[];
        description: string;
    };
}

const postSchema = new mongoose.Schema<PostDocument>(
    {
        title: String,
        url: { type: String, unique: true },
        body: String,
        publishedAt: Date,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        meta: {
            tags: Array,
            description: String
        }
    },
    { timestamps: true },
);

export const Post = mongoose.model<PostDocument>("Post", postSchema);
