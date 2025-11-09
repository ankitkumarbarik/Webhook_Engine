import dotenv from "dotenv";
import app from "./app";

dotenv.config({ path: "./.env" });

const PORT = Number(process.env.PORT) || 3000;

(async () => {
    try {
        const server = app.listen(PORT, () => {
            console.info(`AUTOMATOR Server running on port ${PORT}`);
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
