# TaskBoard.App.Ng
[![Build Status](https://github.com/niolikon/TaskBoard.App.Ng/actions/workflows/nodejs.yml/badge.svg)](https://github.com/niolikon/TaskBoard.App.Ng/actions)  
[![Package](https://github.com/niolikon/TaskBoard.App.Ng/actions/workflows/release-nodejs.yml/badge.svg)](https://github.com/niolikon/TaskBoard.App.Ng/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Task Board WebApp (Angular Frontend)

---

## 📚 Overview

**TaskBoard.App.Ng** is the frontend companion to the TaskBoard service. Built with Angular 17+, it provides a responsive UI for managing personal tasks in a board.  
The project showcases best practices in **component-based architecture**, **lazy loading**, **state management**, and **modular design**.

---

## 🚀 Features

- 🗂️ **Visual Task Management** – Browse and interact with tasks on a graphical board
- 📦 **Modular Architecture** – Organized using Angular feature modules and lazy loading
- 🔐 **JWT Authentication** – Secured via integration with Keycloak
- 📡 **RESTful Integration** – Communicates with the Spring Boot backend
- ❌ **Responsive Design** – Works across devices thanks to Angular Material [ON HOLD]

---

## 📖 User Stories

- ✅ Task creation and editing via modal form
- ✅ Filter and sort pending todos
- ✅ Lazy load translations for feature modules

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js 18+**
- **Angular CLI 16+**
- **Docker** (optional, to run backend+frontend integration)

---

### 👨‍💻 Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/niolikon/TaskBoard.App.Ng.git
   cd TaskBoard.App.Ng
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Navigate to:  
   [http://localhost:4200](http://localhost:4200)

---

### 🧪 Testing

Run unit tests using Karma:

```bash
ng test
```

Run end-to-end tests (if configured):

```bash
ng e2e
```

---

## 🐳 Docker Integration

This project is typically served behind a reverse proxy together with the backend.  
To build a production-ready image and run it via Docker:

1. Build the Docker image:
   ```bash
   docker build -t taskboard-app-ng:latest .
   ```

---

## 📬 Feedback

Have a suggestion or improvement? Feel free to open an issue or submit a pull request.  
We welcome contributions!

---

## 📝 License

This project is licensed under the MIT License.

---

🚀 **Developed by Simone Andrea Muscas | Niolikon**
