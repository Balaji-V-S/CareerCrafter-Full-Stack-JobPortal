# CareerCrafter

A **full-stack project** focused on mastering backend architecture, authentication, and clean entity design using **Spring Boot** and **React (Vite)**.  
This project emphasizes **technical depth** — from normalized JPA entities to JWT-based security and RESTful service structuring.

---

## 🧩 Architecture Overview

**Tech Stack:**

- **Backend:** Spring Boot 3 (Java 17), Spring Data JPA, Hibernate, Spring Security (JWT)
- **Frontend:** React (Vite), Axios, TailwindCSS
- **Database:** MySQL, Postgre
- **VM (optional):** GraalVM 
- **Build Tools:** Maven, npm
- **Testing & Docs:** Postman / Swagger (optional setup)
- **Version Control:** Git + GitHub

---

## ⚙️ Project Structure

### **Backend Modules**
```
src/
 ├── main/java/org/example/careercrafter/
 │    ├── entity/
 │    │    ├── UserData.java (Base class - abstract)
 │    │    ├── Employer.java
 │    │    ├── JobSeeker.java
 │    │    ├── JobListing.java
 │    │    ├── Application.java
 │    │    ├── Notification.java
 │    │    └── enums/
 │    │         ├── Role.java
 │    │         ├── EmploymentType.java
 │    │         └── ApplicationStatus.java
 |    ├── dto/
 │    ├── repository/
 │    ├── service/
 │    ├── controller/
 |    ├── config/
 |    ├── exceptions/
 |    ├── utility/
 │    └── security/
 │         ├── JwtAuthenticationFilter.java
 │         ├── JwtTokenProvider.java
 │         ├── SecurityConfig.java
 │         └── CustomUserDetailsService.java
 └── resources/
      └── application.properties
```

---

## 🧱 Entity Design & Inheritance

- **`UserData` (abstract):** Shared base class with `JOINED` inheritance strategy.  
  Fields: `id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`.

- **`Employer`** → Extends `UserData`, holds company info and job listings.  
- **`JobSeeker`** → Extends `UserData`, holds resume data, education, experience, and skills.  
- **`JobListing`** → References `Employer`, includes job details, industry, and JSON-based skills list.  
- **`Application`** → Links `JobSeeker` ↔ `JobListing`, tracks application status.  
- **`Notification`** → Associated with `UserData`, used for system-level messages.

All entities are normalized with **bidirectional relationships** and proper cascade configurations.

---

## 🔐 Security Implementation

### **JWT Authentication Flow**
- On login or registration, a **JWT token** is generated containing user identity and `Role`.
- Each subsequent API call is validated by **`JwtAuthenticationFilter`**.
- Tokens are stateless; no session data is stored on the server.

### **Role-Based Authorization**
- The system uses two primary roles:
  - `EMPLOYER` → Can post/manage job listings and review applications.
  - `JOB_SEEKER` → Can browse/apply to jobs and manage their applications.
- Spring Security restricts endpoints via annotations such as:
  ```java
  @PreAuthorize("hasRole('EMPLOYER')")
  @PreAuthorize("hasRole('JOB_SEEKER')")
  ```

### **Password Security**
- All passwords are hashed using **BCryptPasswordEncoder** before persistence.
- User credentials are validated via a **CustomUserDetailsService** implementation.

---

## 🚀 Future Improvements

- Integrate **OpenAPI/Swagger** for API documentation  
- Add **refresh tokens** for JWT lifecycle management  
- Expand frontend with **protected routes** and **role-based dashboards**  
- Introduce **email notification service** (Spring Mail or external APIs)
