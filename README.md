<p align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

# HNG Stage 1 Task 🚀

## 📌 Description
This is a simple project built for HNG Stage 1.

--- 
## ⚙️ Add `.env` variables
```bash
NUMBER_API_URL=""
PORT=
```

## 🛠️ Project Setup
To install dependencies, run:

```bash
pnpm install
```

---

## 🚀 Running the Project

### Development Mode
```bash
pnpm run start:dev
```

### Production Mode
```bash
pnpm run start:prod
```

---

## 🌐 API Endpoints & Responses

### ✅ Health Check
**Endpoint:**
```http
GET https://hng-12-stage-1-943t.onrender.com/api/health

```
**Response:**
```json
{
 "message":"Server is active 🚀🚀",
 "live":"Tue, 04 Feb 2025 10:24:12 GMT"
}
```

### 👤 Number Information
**Endpoint:**
```http
GET https://hng-12-stage-1-943t.onrender.com/api/classify-number?number=314
```
**Response:**
```json
{
 "number":371,
 "is_prime":false,
 "is_perfect":false,
 "properties":["armstrong","odd"],
 "digit_sum":11,
 "fun_fact":"371 is a boring number."
}
```

---

## 🔗 Hire Developers
Looking for talented developers? Check out these hiring pages:


- 🔥 [Hire Node.js Developers](https://hng.tech/hire/nodejs-developers)

---

🎯 **Follow the project on GitHub:** [masterchief-Dave/hng-12-stage-1](https://github.com/masterchief-Dave/hng-12-stage-1) 🚀

