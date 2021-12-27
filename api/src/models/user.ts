import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Roles } from "../enums";

export type UserDocument = mongoose.Document & {
    username: string;
    password: string;
    tokens: AuthToken[];
    role: Roles;

    profile: {
        name: string;
        picture: string;
    };

    comparePassword: comparePasswordFunction;
}

export interface AuthToken {
    accessToken: string;
    kind: string;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        username: { type: String, unique: true },
        password: String,
        tokens: Array,
        role: Number,

        profile: {
            name: String,
            picture: String
        }
    },
    { timestamps: true },
);

userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt).then(hash => {
            user.password = hash;
            next();
        }).catch(err => next(err))
    });
});

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);