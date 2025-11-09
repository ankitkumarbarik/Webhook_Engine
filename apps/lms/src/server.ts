import dotenv from "dotenv";
import app from "./app";
import { initializeDatabase } from "@db/index";

dotenv.config({ path: "./.env" });

const PORT = Number(process.env.PORT) || 5000;

(async () => {
    try {
        await initializeDatabase();

        const server = app.listen(PORT, () => {
            console.info(`LMS Server running on port ${PORT}`);
        });
        server.on("error", (err: Error) => {
            console.error(`Server Error: ${err.message}`);
            process.exit(1);
        });
    } catch (err: any) {
        console.error(`Connection failed ${err.message}`);
        process.exit(1);
    }
})();
