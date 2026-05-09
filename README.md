# 🍽️ Meal Planner Backend

A smart backend system designed to help bachelors and flatmates decide **“Aaj kya banega?”** by intelligently recommending meals based on available groceries, minimizing food waste, and reducing decision fatigue.

---

## 🚀 Problem Statement

In shared living environments, a common daily problem is:

> *“What should we cook today?”*

This often leads to:

* Repetitive meals (e.g., same sabzi daily)
* Poor utilization of groceries
* Food wastage
* Decision fatigue

---

## 💡 Solution

This backend system:

* Tracks available groceries in a flat
* Maintains a database of recipes
* Generates meal recommendations based on:

  * Available ingredients
  * Ingredient quantity levels
  * Recently cooked meals (to avoid repetition)

---

## 🧠 Key Features

### 👤 User & Flat Management

* Create users
* Automatically assign each user a flat

### 🥦 Grocery Management

* Add/update groceries for a flat
* Track:

  * Ingredient name
  * Availability
  * Quantity level (LOW / MEDIUM / HIGH)

### 📖 Recipe System

* Store recipes with:

  * Required ingredients
  * Optional ingredients
  * Veg / Non-veg classification

### 🍽️ Meal Recommendation Engine (v1)

* Suggest meals based on available ingredients
* Filter recipes that can be cooked

### 🔁 Meal Engine v2 (Smart Logic)

* Track meal history
* Avoid recently cooked meals
* Score recipes based on:

  * Ingredient urgency (LOW quantity prioritized)
  * Availability
* Provide:

  * 1 recommended meal
  * 2–3 alternative options

---

## 🏗️ Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

### ORM

* Prisma (v6)

### Dev Tools

* Nodemon
* Prisma Studio

---

## 📁 Project Structure

```
src/
  controllers/
  services/
  routes/
  prisma/
  app.js
  server.js

prisma/
  schema.prisma
  seed.js
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```
git clone <repo-url>
cd meal-planner-backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Setup Environment Variables

Create `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/meal_planner"
```

---

### 4. Run Migrations

```
npx prisma migrate dev
```

---

### 5. Seed Recipes

```
node prisma/seed.js
```

---

### 6. Start Server

```
npm run dev
```

---

## 📡 API Endpoints

### 👤 User APIs

#### Create User

```
POST /user
```

#### Get Users

```
GET /user
```

---

### 🥦 Grocery APIs

#### Add / Update Groceries

```
POST /grocery
```

#### Get Groceries

```
GET /grocery?flatId=...
```

---

### 🍽️ Meal APIs

#### Get Meal Recommendations

```
GET /meal?flatId=...
```

#### Mark Meal as Cooked

```
POST /meal/cook
```

---

## 🧠 Recommendation Logic

The meal engine works as follows:

1. Fetch available groceries
2. Match recipes with required ingredients
3. Score recipes based on:

   * LOW quantity ingredients → higher priority
   * MEDIUM → moderate priority
   * HIGH → lower priority
4. Penalize recently cooked meals
5. Return:

   * Top recommendation
   * Additional options

---

## 📊 Example Flow

1. Add groceries (Potato, Tomato, Paneer)
2. Fetch meals → Get suggestions
3. Cook one meal
4. Fetch again → Different recommendations

---

## ⚠️ Current Limitations

* Static recipe dataset
* No user preferences (veg/non-veg filtering yet)
* No quantity precision (approximate only)
* No frontend yet

---

## 🚀 Future Enhancements

* 📸 Image-based grocery detection
* 📅 Weekly meal planning
* 🛒 Smart shopping suggestions
* 🔔 Notifications (unused groceries)
* 👥 Multi-user flat support
* 📱 React Native frontend

---

## 🎯 Objective

To build a **smart, practical, and scalable system** that:

* Solves a real-life daily problem
* Reduces food waste
* Simplifies decision-making
* Provides a foundation for a production-ready app

---

## 👨‍💻 Author

Pranjal Shukla

---

## 📌 Status

✅ Backend MVP Completed
🚧 Enhancements in Progress
