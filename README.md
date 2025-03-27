# 🦖 Dinosaur Inventory Project
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=for-the-badge&logo=postgresql)
![EJS](https://img.shields.io/badge/EJS-Template_Engine-green?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Fullstack Learning](https://img.shields.io/badge/Fullstack-Development-blue?style=for-the-badge)

## 📜 Project Overview
This is a full-stack application built as part of an assignment from **The Odin Project** using:

- **Planning**: UX: Figma, DB: Eraser.io
- **Backend**: Node.js, Express.js
- **Frontend**: EJS (for HTML injection), Vanilla JavaScript
- **Database**: PostgreSQL

## 🌍 Deployed on Railway:
This application is deployed on **Railway**, and the database is hosted there as well.

### 🚀 Live Demo: 👉 <a href="https://dinosaur-inventory-production.up.railway.app/dinosaurs">Click Here</a>

### 🌱 Features:
- **Database Seeding**: Scripts to populate a PostgreSQL database with **Dinosaur** and **Category** tables, and seeding them with sample data.
- **Self-Referencing Categories**: The **Category** table contains parent categories and subcategories referencing the parent.
- **CRUD Operations**:
  - **Dinosaurs**: View, create, edit, and delete dinosaur entries (password required for edit/delete).
  - **Categories**: View parent categories and their subcategories, with filtering options for dinosaurs by category.
- **Authentication**: Password protection for editing and deleting dinosaurs.
- **Light/Dark Theme Toggle**: Toggle between light and dark modes for a better user experience.
- **Responsive Design**: The website is fully responsive and adjusts seamlessly across devices (mobile, tablet, desktop).
- **404 Page**: A custom 404 page that redirects to the homepage when trying to access an invalid path.

## 🧠 What I've Learned:
- **Database Integration**: This project allowed me to deepen my understanding of relational databases, particularly **PostgreSQL**, and how to integrate them into a full-stack web application. I learned about **database relationships**, **self-referencing tables**, and how to manage database connections using **node-postgres (pg)**.
- **Full-Stack Development**: I gained hands-on experience with **Node.js**, **Express.js**, and **EJS** for both the backend and frontend, while working on building CRUD functionality.
- **UI/UX Design**: I enhanced my skills in **UX/UI design** through planning the website's structure in **Figma**, ensuring that the website is intuitive and user-friendly.
  
## 📊 Planning & Design:
- **UX/UI Design**: The user experience and interface were carefully planned and designed in **Figma**. The design focuses on being easy to navigate while ensuring the website adapts well to different screen sizes and devices.
- **Database Structure**: The database was planned using an **Entity Relationship Diagram (ERD)** created in **Eraser**, helping me visualize the relationships between **dinosaurs** and **categories**. The diagram helped in designing the schema and planning out the **self-referencing categories**. (The colors of the finished app are different from what's seen in the planning process)
![figmaDesign](https://github.com/user-attachments/assets/e5e883e0-ec4e-415a-844b-e3638adc4f6f)
![ERD](https://github.com/user-attachments/assets/169b97b3-f529-4610-8707-eb7b262f885a)

## 🖼️ Media:
Here are some shots of the UI:
![pages](https://github.com/user-attachments/assets/dc5206a8-13e0-4e04-9c07-b341c8b0f453)
![changes](https://github.com/user-attachments/assets/62370f3b-ad25-47f0-8457-bec671f8d5be)
![responsive](https://github.com/user-attachments/assets/de4ffb3e-8d9e-4775-8bae-f3c3b3ae2255)


## 📁 Folder Structure

```
controllers/
├── authController.js
├── categoriesController.js
├── dinosaursController.js
└── indexController.js
db/
├── pool.js
└── queries.js
middlewares/
└── notFound.js
public/
├── images/
├── uploads/
├── styles.css
└── script.js
routers/
├── authRouter.js
├── categoriesRouter.js
├── dinosaursRouter.js
└── indexRouter.js
views/
├── partials/
├── 404.ejs
├── categories.ejs
├── dino-details.ejs
├── dinosaurs.ejs
├── index.ejs
├── new-category.ejs
└── new-dino.ejs
app.js
```

## 🔮 Future Improvements:
- **Category Editing**: Enable editing and deletion of categories.
- **Better Error Handling**: Implement better error handling and logging.
- **Image Hosting**: Move image storage to an external service rather than handling it directly within the app.
- **Testing**: Unit and E2E-testing.

---

## 🙏 Thank You!
Thank you so much for checking out my Dinosaur Inventory project! If you have any feedback or questions, feel free to reach out. Your feedback is always appreciated as I'm always keen to grow and develop!
