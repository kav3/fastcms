import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { Roles } from "../enums";
import { UserDocument } from "../models/user";

const config = {
    'secret': process.env.SECRET || 'my-super-secret-key'
}

const tokenSign = (user: UserDocument) => sign({ id: user._id, role: user.role }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
});

const tokenUser = () => (req: Request, res: Response, next: NextFunction) => {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        var parts = token.toString().split(' ');
        if (parts.length === 2) {
            var scheme = parts[0];
            var credentials = parts[1];
            if (/^Bearer$/i.test(scheme)) {
                token = credentials;

                verify(token, config.secret, function (err, decoded) {
                    req["user"] = decoded;
                });
            }
        }
    }

    next();
}

const tokenVerify = (role: Roles = Roles.USER) => (req: Request, res: Response, next: NextFunction) => {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    var parts = token.toString().split(' ');
    if (parts.length === 2) {
        var scheme = parts[0];
        var credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
            token = credentials;
            verify(token, config.secret, function (err, decoded) {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

                if (decoded.role < role)
                    return res.status(403).send({ auth: false, message: 'Role' });

                req["user"] = decoded;
                next();
            });
        }
    }
}

export { tokenSign, tokenUser, tokenVerify }
