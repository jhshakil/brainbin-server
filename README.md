# BrainBin Server 🧠📦

A **Node.js + Express + MongoDB** backend server built with [pnpm](https://pnpm.io/) for faster, disk-efficient dependency management.  
BrainBin Server provides **REST APIs** to manage tasks, users, and authentication for the BrainBin web application.

---

## 🚀 Features

- ⚡ Built with **Node.js + Express + TypeScript** for type-safe backend development
- 📦 Uses **pnpm** for fast and reliable package management
- 🗄 Uses **MongoDB** with **Mongoose/Prisma** for database management
- 🔐 **Role-based access control**:
  - **Admin**: Can create, update, and delete **tasks** and **users**
  - **User**: Can view tasks assigned to them and update **task status** only
- 🛠 Organized project structure for scalability
- ✅ Linting and formatting support (ESLint + Prettier)

---

## 📂 Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/jhshakil/brainbin-server.git
cd brainbin-server
```

### 2. Install dependencies with pnpm

```bash
pnpm install
```

### 3. Start development server

```bash
pnpm dev
```

The app will be running at:
👉 `http://localhost:5000/`

### 4. Build for production

```bash
pnpm build
```

### 5. Preview production build

```bash
pnpm start
```

---

## 📖 Scripts

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start development server     |
| `pnpm build` | Build production-ready app   |
| `pnpm start` | Preview the production build |

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **[Md Jahid Hasan](https://github.com/jhshakil)**
