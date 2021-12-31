import { User, UserDocument, AuthToken } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { CallbackError, NativeError } from "mongoose";
import { tokenSign } from "../utils/auth";
import { body, check, validationResult } from "express-validator";
import { Roles } from "../enums";

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("username", "Username is not valid").isLength({ min: 3 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send(errors);
        return;
    }

    User.findOne({ username: req.query.username }, (err: NativeError, existingUser: UserDocument) => {
        if (err) { return next(err); }
        res.send({ exist: !!existingUser })
    });
}

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await check("username", "Username is not valid").isLength({ min: 3 }).run(req);
    // await check("password", "Password is not valid").isLength({ min: 6 }).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send(errors);
        return;
    }

    User.findOne({ username: req.body.username }, (err: NativeError, user: UserDocument) => {
        if (err) { return next(err); }

        if (!req.body.password) {
            res.send({ exist: !!user })
            return;
        } else if (user) {
            user.comparePassword(req.body.password, (err, isMatch) => {
                if (err) { return next(err); }
                if (isMatch)
                    res.send(generateResponse(user));
                else
                    res.status(403).send("wrong password");
            })
        } else {
            user = new User({
                username: req.body.username,
                password: req.body.password,
                role: Roles.USER
            });

            user.save((err) => {
                if (err) { return next(err); }

                res.send(generateResponse(user));
            });
        }
    });
}

const generateResponse = function (user: UserDocument) {
    return {
        token: tokenSign(user),
        username: user.username,
        role: user.role,
        name: user.profile.name
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const page = req.query.page && parseInt(req.query.page.toString()) || 1;
    const limit = req.query.limit && parseInt(req.query.limit.toString()) || 15;
    const q = req.query.q || "";

    var pipeline = [];

    if (q)
        pipeline.push({
            $match: {
                $or: [
                    { "name": { $regex: '.*' + q + '.*' } },
                    { "username": { $regex: '.*' + q + '.*' } }
                ]
            }
        });

    await User.aggregate([...pipeline, {
        $facet: {
            items: [
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                { $project: { password: 0 } }
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

