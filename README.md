<div align="center">
<a href="https://github.com/fahmirizalbudi/shortize" target="blank">
<img src="https://raw.githubusercontent.com/JjagoKoding/icon/6b673da5c28c4d4f91e71b0c1eaf510877673c28/shortize.svg" width="300" alt="Logo" />
</a>

<br />
<br />

![](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

</div>

<br/>

## 🔗 Shortize

Shortize is a simple web based application for creating short URLs easily and quickly. Built with Laravel as the backend and React for a dynamic user interface, this project ensures a smooth user experience. Data management is handled reliably by MySQL. Key features include:

## ✨ Features

- **⚡ Fast Redirection:** Optimized query handling for quick link access.
- **🎨 Interactive UI:** Built with React for a responsive and seamless experience.
- **📊 Dashboard:** User-friendly dashboard to manage links.
- **🔐 Authentication:** Secure login and registration system.

## 👩‍💻 Tech Stack

- **Laravel**: A PHP web application framework with expressive, elegant syntax for backend logic and API.
- **React**: A JavaScript library for building user interfaces and single-page components.
- **MySQL**: An open-source relational database management system.

## 📦 Getting Started

To get a local copy of this project up and running, follow these steps.

### 🚀 Prerequisites

- **PHP** (v8.2 or higher) & **Composer**.
- **Node.js** & **NPM**.
- **MySQL** (or another supported SQL database).

## 🛠️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fahmirizalbudi/shortize.git
   cd shortize
   ```

2. **Install dependencies:**

   ```bash
   #client
   cd client
   npm install

   #server
   cd server
   composer install
   cp .env .env.example
   php artisan key:generate
   ```

3. **Run migration:**

   ```bash
   php artisan migrate
   ```

4. **Start the development server:**

   ```bash
   #client
   npm run dev

   #server
   php artisan serve
   ```

## 📖 Usage

### ✔ Running the Website

> Use [http://localhost:8000](http://localhost:8000) to test the api in your Postman.

> Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📜 License

All rights reserved. This project is for educational purposes only and cannot be used or distributed without permission.
