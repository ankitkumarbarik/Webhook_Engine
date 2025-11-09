import express, { Application, Request, Response } from "express";
import { fileSize } from "@constants/index";
import cors from "cors";
import { query } from "@db/index";

const app: Application = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: fileSize }));
app.use(express.json({ limit: fileSize }));

type Event = "purchase" | "enrollment";

type Webhook = {
    id: string;
    url: string;
    token: string;
    event: Event;
};

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

// register webhook endpoint on LMS side
app.post("/api/v1/register-webhook", async (req: Request, res: Response) => {
    try {
        const { url, token, event }: Webhook = req.body;
        if (!url || !token || !event) {
            return res.status(400).json({ message: "missing required fields" });
        }

        const result = await query(
            "INSERT INTO webhooks (url, token, event) VALUES ($1, $2, $3) RETURNING *",
            [url, token, event]
        );

        return res
            .status(200)
            .json({ message: "webhook registered", webhook: result.rows[0] });
    } catch (err: any) {
        console.error("error registering webhook:", err);
        return res.status(500).json({ message: "internal server error" });
    }
});

app.post("/api/v1/purchase", async (req: Request, res: Response) => {
    try {
        const { name, email, course }: Payload = req.body;
        if (!name || !email || !course) {
            return res.status(400).json({ message: "missing required fields" });
        }

        const result = await query(
            "INSERT INTO users (name, email, course) VALUES ($1, $2, $3) RETURNING *",
            [name, email, course]
        );

        // get webhooks by event "purchase"
        const webhooks = await query(
            "SELECT * FROM webhooks WHERE event = 'purchase'"
        );

        // create payload
        const payload: Payload = {
            id: result.rows[0].id.toString(),
            name,
            email,
            course,
        };

        // send webhook
        await sendWebhooks(webhooks.rows, payload);

        return res.status(200).json({
            message: "course purchased, webhooks triggered",
            purchase: result.rows[0],
        });
    } catch (err: any) {
        console.error("error purchasing course:", err);
        return res.status(500).json({ message: "internal server error" });
    }
});

const sendWebhooks = async (webhooks: Webhook[], payload: Payload) => {
    for (const webhook of webhooks) {
        try {
            const response = await fetch(webhook.url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-Webhook-Token": webhook.token,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.error(
                    `error sending webhook to ${webhook.url}: ${response.statusText}`
                );
            }
        } catch (err: any) {
            console.error("error sending webhook: ", err);
        }
    }
};

export default app;

// ===============================
// 📘 Webhook Flow (LMS ↔ Automator)
// ===============================
//
// 1️⃣ Automator → LMS
//    Automator registers its webhook URL on the LMS.
//    Example: POST /api/register-webhook
//    Body: { url, token, event }
//
// 2️⃣ LMS stores webhook info
//    LMS saves the registered webhook details (URL, token, event) internally.
//
// 3️⃣ Event Trigger (e.g. Course Purchase)
//    When a student purchases a course, LMS triggers the "purchase" event.
//
// 4️⃣ LMS → Automator
//    LMS sends a POST request to Automator's /webhook endpoint.
//    Includes payload: { id, name, email, course }
//    Token sent in header: X-Webhook-Token
//
// 5️⃣ Automator receives the webhook
//    Automator verifies the token, processes the payload,
//    and performs an action (e.g. send email, create invite, etc.)
//
// ✅ Summary:
//    Webhook is registered on the LMS,
//    but the endpoint exists on the Automator side
//    where LMS sends data when an event occurs.
//
