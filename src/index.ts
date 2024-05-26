import { app } from "./app";
import "dotenv/config";
import { dbConnect } from "./db/db.config";
dbConnect()
console.log(dbConnect());


const { PORT } = process.env;

app.get("/", (_req, res) => {
    res.json({
        message: "test route"
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
});