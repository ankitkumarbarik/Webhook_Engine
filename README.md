# ⚙️ Webhook_Engine

> 🚀 A modular and secure event-driven system for managing, triggering, and delivering webhooks between services like LMS and Automator.

---

## 🧠 Overview

**Webhook_Engine** is a lightweight backend system designed to demonstrate real-world webhook integration.  
It allows one service (like an LMS) to register webhook URLs and automatically send event notifications  
to other connected systems (like Automator) whenever specific actions occur (e.g., course purchase or enrollment).

---

## 🧩 Architecture

🧑‍🎓 LMS (Event Source)
    ├── Register webhook (POST /api/v1/register-webhook)
    ├── Trigger event (POST /api/v1/purchase)
    └── Sends payload → Automator

⚙️ Automator (Event Receiver)
    ├── Receives webhook (POST /webhook)
    ├── Verifies token
    └── Performs action (e.g., send email/invite)

---

## 🛠️ Tech Stack

| Component | Technology |
|------------|-------------|
| **Language** | TypeScript |
| **Framework** | Express.js |
| **Database** | PostgreSQL |
| **Communication** | REST + Webhooks |
| **Utility** | Node Fetch, CORS |
| **Environment** | dotenv |

---

## 📂 Monorepo Structure

The project is a monorepo, meaning it contains multiple packages.  
The packages are listed below:

| Package | Description |
|---------|-------------|
| `lms` | LMS (Event Source) |
| `automator` | Automator (Event Receiver) |
| `db` | PostgreSQL Database |

---

## 🔗 API Endpoints

### 🧠 LMS

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/api/v1/register-webhook` | Register a new webhook |
| `POST` | `/api/v1/purchase` | Trigger webhook after course purchase |

### ⚙️ Automator

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/webhook` | Receives webhook data and performs actions |

---

## 📬 Example Flow

1️⃣ **Automator → LMS**  
Registers a webhook on LMS:  
```json
POST /api/v1/register-webhook
{
  "url": "http://localhost:3000/webhook",
  "token": "somesecret",
  "event": "purchase"
}
```

2️⃣ **Student → LMS**  
Triggers a purchase event:  
```json
POST /api/v1/purchase
{
  "name": "John Wick",
  "email": "johnwick@gmail.com",
  "course": "Golang Bootcamp"
}
```

3️⃣ **LMS → Automator**  
LMS automatically sends the event payload:  
```json
{
  "id": "1",
  "name": "John Wick",
  "email": "johnwick@gmail.com",
  "course": "Golang Bootcamp"
}
```

4️⃣ **Automator verifies token & executes action**  
```
Mail sent to John Wick on johnwick@gmail.com for course Golang Bootcamp
```

---

## 🚀 Run Locally

### 1️⃣ Install dependencies
```bash
pnpm install -r
```

### 2️⃣ Run in development mode
```bash
pnpm dev
```

---

## 📦 Features

✅ Register and store webhooks in PostgreSQL  
✅ Trigger webhooks on specific events  
✅ Secure token verification  
✅ Modular app design (LMS + Automator)  
✅ Fully typed with TypeScript  
✅ Async webhook delivery  

---

## 🧩 Future Enhancements

- Retry mechanism for failed webhooks  
- Webhook logs dashboard  
- Event subscription management  
- Webhook delivery signing (HMAC)  

---

## 🧑‍💻 Author

**Ankit Barik**  
📧 ankitbarik.dev@gmail.com  
🌐 [GitHub Profile](https://github.com/ankitkumarbarik)

---

## ⭐ Support

If you like this project, don’t forget to ⭐ **star** the repository and share it!

---

🪄 *Webhook_Engine — Automate your world, one event at a time!*
