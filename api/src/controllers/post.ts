import { Post, PostDocument } from "../models/post";
import { Request, Response, NextFunction } from "express";
import { CallbackError, isValidObjectId, Mongoose, NativeError } from "mongoose";
import { body, check, validationResult } from "express-validator";

export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const page = req.query.page && parseInt(req.query.page.toString()) || 1;
    const limit = req.query.limit && parseInt(req.query.limit.toString()) || 15;
    const q = req.query.q || "";

    var pipeline = [];

    if (q)
        pipeline.push({
            $match: { "title": { $regex: '.*' + q + '.*' } },
        });

    await Post.aggregate([...pipeline, {
        $facet: {
            items: [
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ],
            pageInfo: [
                {
                    $group: {
                        _id: null,
                        total: { $sum: 1 }
                    }
                },
                { $project: { _id: 0 } }
            ],
        },
    }, {
        $unwind: "$pageInfo"
    }], function (err, result) {
        if (!err && result[0])
            res.send(result[0])
    });
}

export const getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (isValidObjectId(req.params.id))
        Post.findOne({ _id: req.params.id }, (err: NativeError, post: PostDocument) => {
            if (err) { return next(err); }
            res.send(post)
        });
    else
        res.send(new Post({ title: "" }))
}

export const getByUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    Post.aggregate([{
        $match: { url: req.params.url }
    }, {
        $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user"
        }
    }, {
        $addFields: {
            user: "$user.name"
        }
    }], function (err, result) {
        if (!err && result[0])
            res.send(result[0])
    });

    // Post.findOne({ url: req.params.url }, {}, { populate: "user" }, (err: NativeError, post: PostDocument) => {
    //     if (err) { return next(err); }
    //     res.send(post)
    // });
}

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    Post.findOne({ _id: req.body._id }, (err: NativeError, post: PostDocument) => {
        if (err) { return next(err); }

        if (!post)
            post = new Post();

        post.title = req.body.title || "";
        post.url = req.body.url || "";
        post.body = req.body.body || "";

        post.save((err, post: PostDocument) => {
            if (err) { return next(err); }
            res.send(post)
        })
    });
}