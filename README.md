
# 🦷 DentCare Manager

**DentCare Manager** is a complete dental clinic management system designed for small practices.  
It streamlines patient registration, appointment scheduling, visit tracking, treatments, and payment management.  
The system provides tailored interfaces for both the **Doctor** and the **Receptionist** roles.

---

## 🚀 Features

### 👨‍⚕️ Doctor Panel
- View today’s appointments (normal & emergency).
- Start and manage visits: mark as delayed or completed.
- Add and edit treatments during visits.
- View patient details with a tabbed layout:
  - Basic Info
  - Visit History
  - Payments & Outstanding Balance

### 👩‍💼 Receptionist Panel
- Register new patients.
- Schedule appointments and mark type (normal/emergency).
- Trigger real-time emergency notifications to the doctor.
- Manage all patient records and appointment logs.
- Full CRUD access to treatments (based on doctor instructions).

---

## 🛠️ Tech Stack

| Technology             | Description                          |
|------------------------|--------------------------------------|
| Node.js + Express      | Backend server                       |
| MongoDB + Mongoose     | Database and ORM                     |
| EJS + Bootstrap        | Frontend templating and styling      |
| Flash & Express-Session| UI notifications and session handling|
| MVC Architecture       | Clean and modular codebase           |

---

## 🔐 Authentication & Roles

- Basic login system with role-based access (Doctor / Receptionist).
- Implemented password reset system.
- Authentication handled via session middleware.

---

## 📈 Admin Dashboard

- **General Statistics** tab: users, patients, appointments, visits.
- **"More" Tab**: shows today's visit stats, total revenue, unpaid debts, etc.
- Dynamic sidebar and dashboard layout based on the user role.

---

## 📌 Notes

- Visits can only be edited if their status is **`unpaid`**.
- Treatments are added and managed by the **receptionist**, but only **used by the doctor**.
- Emergency visits are handled with high priority and immediately displayed in the doctor panel.

---

## 🧪 Setup & Usage

1. **Clone the repo**:
   ```bash
   git clone https://github.com/BasilAboSaleem/DentCare-Manager.git
   cd DentCare-Manager
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** and configure environment variables:
   - MongoDB connection string
   - Session secret
   - (Any other configs as needed)

4. **Run the app**:
   ```bash
   npm run watch
   ```

---

## 🤝 Contributing

Contributions are welcome!  
Feel free to submit issues or pull requests to improve the project.

---

## 📣 Final Notes

This project is ideal for developers, freelancers, or creatives who want to present their work professionally and build production-like portfolio apps.  
Built with flexibility, maintainability, and real-world usability in mind.

Created with ❤️ by **Basil Abu Saleem**

---

## 🌍 Developer Context (Personal Note)

> This platform was fully developed under extremely difficult conditions during the war in Gaza — amid displacement, power outages, and severe resource limitations.  
> Despite these challenges, I committed to learning and building a real-world full-stack project to demonstrate my skills, dedication, and perseverance.

Thank you for visiting.  
**Every line of code represents not just technical knowledge, but a journey through adversity.**
