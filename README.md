# Healthcare-Backend-Task

A RESTful API backend for a healthcare application built with Node.js, Express.js, and PostgreSQL. This system allows users to register, log in, and manage patient and doctor records securely, with support for assigning doctors to patients.

## Features
- User authentication with JWT (register and login)
- Patient management (CRUD) scoped to authenticated users
- Doctor management (CRUD) with global visibility for retrieval
- Patient-doctor mappings with global visibility for retrieval
- PostgreSQL database with Sequelize ORM
- Robust error handling for validation, authentication, and database errors
- Environment variable management with dotenv

## Technologies
- **Node.js**: v22.14.0
- **Express.js**: v4.x
- **PostgreSQL**: v13 or higher
- **Sequelize**: v6.x
- **JWT**: For authentication
- **dotenv**: For environment variables

## Prerequisites
- Node.js installed (https://nodejs.org/)
- PostgreSQL installed and running (https://www.postgresql.org/download/)
- Postman for API testing (https://www.postman.com/downloads/)

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - Login and receive JWT token

### Patients (Authenticated)
- **GET** `/api/patients` - Get all patients created by the authenticated user
- **POST** `/api/patients` - Add a new patient
- **GET** `/api/patients/:id` - Get patient by ID
- **PUT** `/api/patients/:id` - Update patient details
- **DELETE** `/api/patients/:id` - Delete a patient

### Doctors (Authenticated)
- **GET** `/api/doctors` - Get all doctors
- **POST** `/api/doctors` - Add a new doctor
- **GET** `/api/doctors/:id` - Get doctor by ID
- **PUT** `/api/doctors/:id` - Update doctor details
- **DELETE** `/api/doctors/:id` - Delete a doctor

### Patient-Doctor Mappings (Authenticated)
- **POST** `/api/mappings` - Assign a doctor to a patient
- **GET** `/api/mappings` - Get all patient-doctor mappings
- **GET** `/api/mappings/:patientId` - Get all doctors assigned to a specific patient
- **DELETE** `/api/mappings/:id` - Remove a doctor from a patient

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/suryaprakash-Gadi/Healthcare-Backend-Task.git>
cd Healthcare-Backend-Task
