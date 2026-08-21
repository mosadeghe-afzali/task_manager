# Task Manager API

A production-oriented RESTful API for managing tasks, projects, teams, and users.

The project is built with **Node.js, Express, Prisma, and PostgreSQL**, with a focus on clean architecture, authentication, authorization, data modeling, and maintainable backend code.

## 🏗️ Architecture

The application follows a layered architecture to keep business logic isolated and the codebase maintainable.

src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── validators/
├── utils/
└── prisma/


## 🛠️ Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime               |
| Express    | REST API framework    |
| Prisma     | ORM & database access |
| PostgreSQL | Relational database   |



## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* PostgreSQL
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Configure your environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
PORT=3000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```
