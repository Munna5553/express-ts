import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!, { dbName: "techbyte" });

        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("mongodb connect successfully!");
        });
        connection.on("error", (error: Error) => {
            console.log("mongodb connection error!", error);
            process.exit(1);
        });
        connection.on("disconnected", () => {
            console.log("mongodb disconnected!");
        });

    } catch (error) {
        console.log("unable to connect database :", error);
    }
};