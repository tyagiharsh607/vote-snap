---

# **VoteSnap** 🗳️  
Real-time image voting application with live updates, secure account verification, and optimized backend performance.

---

## **Table of Contents**  
- [Overview](#overview)  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  
- [License](#license)  

---

## **Overview**  
**VoteSnap** is a real-time voting platform built to handle live updates with low latency and ensure scalable backend performance. It integrates secure authentication, efficient task processing, and responsive user interfaces.

---

## **Features**  
- **Live Vote Updates**: Real-time updates for votes with **30ms latency** using Socket.IO.  
- **Email Verification**: Background email processing for account verification using **BullMQ**.  
- **Scalable and Optimized**: Data storage with **PostgreSQL**, caching with **Redis**, and performance-driven APIs.  

---

## **Technologies Used**  
| **Tech Stack**           | **Purpose**                                |  
|--------------------------|-------------------------------------------|  
| **Next.js**              | Frontend and server-side rendering        |  
| **Node.js & Express.js** | Backend server and APIs                   |  
| **Socket.IO**            | Real-time communication                   |  
| **BullMQ**               | Background job processing for emails      |  
| **PostgreSQL**           | Database for storing votes and user data  |  
| **Redis**                | Caching and queue storage                 |  
| **Tailwind CSS**         | Styling and responsive design             |  
| **Shadcn**               | UI components library                     |  

---

## **Installation**  

Follow these steps to run the project locally:

### **Prerequisites**  
Make sure you have the following installed on your machine:  
- **Node.js** (v18+ recommended)  
- **PostgreSQL**  
- **Redis**  

### **Clone the Repository**  
```bash
git clone https://github.com/tyagiharsh607/votesnap.git
cd votesnap
```


### **Database Setup**  
- Create a PostgreSQL database.  
- Run migrations (assuming you're using Prisma):  
```bash
npx prisma migrate dev
```

---

## **Environment Variables**  

Create a `.env` file in the backend folder of your project and add the following:  
```env
DATABASE_URL="postgresql://user:password@localhost:5432/votesnap"  
REDIS_URL="redis://localhost:6379"  
SMTP_HOST="your_smtp_host"  
SMTP_USER="your_smtp_user"  
SMTP_PASSWORD="your_smtp_password"  
JWT_SECRET="your_jwt_secret"  
```

---



---


## **Contributions**  
Feel free to fork this repository, open issues, or submit pull requests. All contributions are welcome!

---

**Made with ❤️ by [Harsh Tyagi](https://github.com/tyagiharsh607).**  

--- 
