# QuizNest

QuizNest is a full-stack quiz application designed to facilitate the creation, management, and participation in quizzes. It comprises a robust backend built with Java and Spring Boot and a dynamic frontend developed using Angular, along with a database managed by PostgreSQL

## 📁 Project Structure

```
QuizNest/
├── examserver/   # Backend - Java Spring Boot
└── examfront/    # Frontend - Angular
```

---

## Features

- **User Authentication:** Secure login and registration functionalities.
- **Role-Based Access Control:** Differentiated access for admins and users.
- **Quiz Management:** Create, update, and delete quizzes and questions.
- **Real-Time Feedback:** Immediate scoring and feedback upon quiz submission.
- **Responsive UI:** Seamless user experience across devices.

---

## Technologies Used

### Backend (`examserver`)

- **Java 17**
- **Spring Boot**
- **Spring Security**
- **JWT (JSON Web Tokens)**
- **MySQL**
- **Hibernate/JPA**

### Frontend (`examfront`)

- **Angular 15**
- **TypeScript**
- **RxJS**
- **Bootstrap**

---

## Setup Instructions

### Prerequisites

- **Java 17+**
- **Node.js 16+ and npm**
- **PostgreSQL Server**

### Backend Setup (`examserver`)

1. **Navigate to the backend directory:**

   ```bash
   cd examserver
   ```

2. **Configure the database:**

   - Create a PostgreSQL database named `quiznest`.
   - Update the `application.properties` file with your PostgreSQL credentials.

3. **Build and run the application:**

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will start on `http://localhost:8080`.

### Frontend Setup (`examfront`)

1. **Navigate to the frontend directory:**

   ```bash
   cd examfront
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the Angular application:**

   ```bash
   ng serve
   ```

   The frontend will be accessible at `http://localhost:4200`.

---

## Authentication & Authorization

- **JWT Authentication:** Secure endpoints using JWT tokens.
- **Role-Based Access:** Differentiate functionalities based on user roles (Admin/User).

---

## API Endpoints

- **Authentication:**
  - `POST /authenticate`: User login.
  - `POST /register`: User registration.

- **Quiz Management:**
  - `GET /quiz/`: Retrieve all quizzes.
  - `POST /quiz/`: Create a new quiz.
  - `PUT /quiz/{id}`: Update an existing quiz.
  - `DELETE /quiz/{id}`: Delete a quiz.

- **Question Management:**
  - `GET /question/`: Retrieve all questions.
  - `POST /question/`: Add a new question.
  - `PUT /question/{id}`: Update a question.
  - `DELETE /question/{id}`: Delete a question.

---

## Screenshots


