import { Request, Response } from "express";
import { Users } from "../models/users.model";
import { apiError } from "../utils/error.handler";
import { asyncHandler } from "../utils/async.handler";
import { apiRes } from "../utils/res.handler";
import { usertype } from "../types/user.type";
import crypto from "crypto";

const register = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { fullname, username, email, password }: usertype = req.body;

        if (!(fullname && username && email && password)) {
            throw new apiError(400, "fullname, email, mobile and password is required!");
        }

        const isUserExists = await Users.findOne({ $or: [{ email }, { username }] });
        if (isUserExists) {
            throw new apiError(400, "User already exists. Please login instead!");
        }

        const verificationCode = crypto.randomInt(100000, 999999);

        const user = await Users.create({
            email,
            fullname,
            username,
            password,
            verificationToken: verificationCode,
            verificationTokenExpiry: new Date(Date.now() + 1000 * 60 * 60)
        });

        const createdUser = await Users.findById(user._id).select("-password -verificationToken");

        if (!createdUser) {
            throw new apiError(400, "Unable to register user. Please try again!");
        }

        return res.status(200).json(
            new apiRes(
                200,
                createdUser,
                "user registered successfully",
            )
        );

    } catch (error) {
        if (error instanceof apiError) {
            return res.status(error.statusCode).json(new apiRes(error.statusCode, null, error.message));
        }
        console.error(error);
        return res.status(500).json(new apiRes(500, null, "Internal server error!"));
    }
});


export {
    register
}