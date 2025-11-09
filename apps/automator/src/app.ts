import express, { Application, Request, Response } from "express";
import { fileSize } from "@constants/index";
import cors from "cors";

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: fileSize }));
app.use(express.json({ limit: fileSize }));

type Payload = {
    id: string;
    name: string;
    email: string;
    course: string;
};

// health check
app.get("/", (req: Request, res: Response) => {
    console.info("Root route accessed");
    return res.status(200).json({ message: "API is running" });
});

app.post("/webhook", (req, res) => {
    const token = req.headers["X-Webhook-Token"];

    if (token !== process.env.WEBHOOK_TOKEN) {
        return res
            .status(401)
            .json({ message: "unauthorized - invalid token" });
    }

    const { id, name, email, course }: Payload = req.body;
    // send email or create invite or whatever you want to do with the payload here
    console.log(`Mail sent to ${name} on ${email} for course ${course}`);

    return res.json({ message: "webhook received successfully, thank you" });
});

export default app;
