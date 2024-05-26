import { Document } from "mongoose";

export interface usertype extends Document {
    username: string;
    email: string;
    fullname: string;
    bio: string;
    avatarImage: string;
    password: string;
    refreshToken: string;
    isVerified: boolean;
    verificationToken: number;
    verificationTokenExpiry: Date;
    resetPasswordToken: string;
    resetPasswordTokenExpiry: Date;
    generateRefreshToken(): string;
    generateAccessToken(): string;
    IsPasswordCorrect(password: string): Promise<boolean>;
}