import { Schema, model } from "mongoose";
import { usertype } from "../types/user.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema: Schema = new Schema<usertype>({
    username: {
        type: String,
        required: [true, "username is require"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long."],
        maxlength: [20, "Username cannot exceed 20 characters."],
        match: [/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/, "username is not valid"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required!"],
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "please provide valid email"]
    },
    fullname: {
        type: String,
        require: true,
        index: true,
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    avatarImage: {
        type: String,
        default: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    password: {
        type: String,
        required: [true, "password is required!"],
        maxlength: [20, "the maximum number of character is 20."],
        minlength: [8, "minimum character length is 8."]
    },
    refreshToken: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: Number,
        required: true
    },
    verificationTokenExpiry: {
        type: Date,
        required: [true, "verification token expiry is require!"]
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTokenExpiry: {
        type: Date
    },
}, { timestamps: true });

userSchema.pre<usertype>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});

userSchema.methods.IsPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.ACCES_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const Users = model<usertype>("users", userSchema);