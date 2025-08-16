# 📊 Survey API Gateway for MoSPI Datasets

---

## 🧑‍💻 Team Information  
**Team Name:** Tech Coder  
**Team Members:**  
- Subham Chouhan  
- Mohammed Ali Atif  
- Shourya Dev Singh  
- Vishavraj Singh Rao
- Hiya Khichi  
- Eshasvi Soni

**Contact Email:** sc106745@gmail.com  
**Date:** August 13, 2025

---

## 📌 Problem Statement

Current access to microdata from the Ministry of Statistics and Programme Implementation (MoSPI) is limited to bulk dataset downloads. These files are large and require manual filtering and processing, making the workflow inefficient for researchers, analysts, and developers. There is no existing API to enable dynamic, query-based access to filtered data.

---

## 🎯 Background & Motivation

MoSPI datasets are critical for policymaking, academic research, socio-economic analysis, and government decision-making. However, current access methods create several bottlenecks:

- Manual filtering of large CSV files.
- No dynamic API access or programmatic query system.
- No support for role-based access or tiered usage.

### Why an API Gateway?

An API Gateway offers:
- Dynamic querying and filtered data access.
- Real-time data retrieval in JSON format.
- Role-based access and rate limiting for secure, scalable use.

### Potential Users:
- Researchers & data scientists  
- Government analysts  
- Developers building data-driven apps  
- Academics and students

---

## 🎯 Objectives

- ✅ Enable **query-based access** to MoSPI datasets via RESTful API  
- ✅ Return results in **JSON** format for easy integration  
- ✅ Support **role-based access** (guest, user, admin)  
- ✅ Implement **rate limiting** and security features  
- ✅ Provide a **user-friendly web interface** for non-technical users

---

## 💡 Proposed Solution

### 5.1 System Overview

The system allows users to browse available datasets, compose SQL-style queries through a web UI or directly via API, and receive filtered data results in JSON format. Access is controlled via JWT tokens, and rate limiting is applied based on user role.

### 5.2 Key Features

- 🔍 SQL query execution on survey datasets  
- 📦 JSON response output  
- 📚 Dataset metadata search  
- 👤 User authentication and role management  
- 📊 Admin dashboard for monitoring  
- 🛡️ Rate limiting and tiered API usage  

### 5.3 Architecture Diagram

    Frontend (React + Vite)
            |
            | REST API calls
            v
    Backend (Node.js + Express)
            |
            | SQL Queries
            v
    Database (PostgreSQL or MySQL)

    Authentication: JWT

    Hosting: Render (backend)

## ⚙️ Technical Implementation

### 6.1 Frontend (React.js + Vite)

- User-friendly dashboard with role-based views  
- Dataset browser and SQL query form  
- Responsive, accessible UI  

### 6.2 Backend (Node.js + Express)

- API Endpoints:
  - `GET /datasets` — list datasets  
  - `POST /query` — execute SQL queries  
  - `POST /auth/login` — user login  
  - `POST /auth/signup` — user registration  
  - `GET /users` — admin user management  

- JSON responses for all API calls  
- Error handling and validation  

### 6.3 Database (PostgreSQL or MySQL)

- Stores:
  - Dataset metadata
  - User roles and profiles
  - Usage logs

- Example Tables:
  - `datasets (id, name, description, schema_json)`
  - `users (id, email, role, hashed_password)`
  - `queries (user_id, dataset_id, query_text, timestamp)`

- Example Query:
  ```sql
  SELECT state, income
  FROM nss_survey_2021
  WHERE income > 50000;
