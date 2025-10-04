# E-Commerce Full-Stack Application

A complete e-commerce application built with Spring Boot backend and React frontend. Features user authentication, product management, shopping cart functionality, and order processing with a modern, responsive user interface.

## 📁 Directory Structure

```
Fiscal_Automation_Engine2/
├── ecommerce-backend/                    # Spring Boot Backend
│   ├── src/main/java/com/ecommerce/shop/
│   │   ├── auth/                        # Authentication module
│   │   │   ├── controller/              # Auth REST endpoints
│   │   │   ├── dto/                    # Auth DTOs
│   │   │   └── service/                # Auth business logic
│   │   ├── cart/                       # Shopping cart module
│   │   │   ├── controller/             # Cart REST endpoints
│   │   │   ├── dto/                   # Cart DTOs
│   │   │   ├── entity/                # Cart entities
│   │   │   ├── repository/            # Cart data access
│   │   │   └── service/               # Cart business logic
│   │   ├── common/                    # Shared components
│   │   │   ├── dto/                  # Common DTOs
│   │   │   └── exception/            # Exception handling
│   │   ├── config/                    # Configuration classes
│   │   ├── orders/                    # Order management
│   │   ├── payments/                  # Payment processing
│   │   ├── products/                  # Product management
│   │   ├── security/                  # Security utilities
│   │   ├── users/                     # User management
│   │   └── EcommerceApplication.java  # Main application class
│   ├── src/main/resources/
│   │   ├── application.yml            # Main configuration
│   │   ├── application-dev.yml        # Development profile
│   │   ├── application-prod.yml       # Production profile
│   │   └── db/migration/              # Database migrations
│   └── pom.xml                        # Maven dependencies
├── ecommerce-frontend/                 # React Frontend
│   ├── src/
│   │   ├── api/                       # API client services
│   │   ├── components/                # React components
│   │   │   ├── common/               # Reusable components
│   │   │   ├── layout/               # Layout components
│   │   │   └── products/             # Product components
│   │   ├── context/                   # React contexts
│   │   ├── pages/                     # Page components
│   │   └── assets/                    # Static assets
│   ├── package.json                   # Frontend dependencies
│   └── tailwind.config.js            # Tailwind CSS config
├── README.md                          # This file
```

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have the following tools installed:

- **Java 17** or higher
- **Maven 3.6+**
- **Node.js 16+** and **npm**
- **Git**

### Starting the Backend

1. **Navigate to the backend directory:**
   ```bash
   cd ecommerce-backend
   ```

2. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```

3. **Alternative method (if Maven fails):**
   ```bash
   mvn clean package -DskipTests
   java -jar target/shop-0.0.1-SNAPSHOT.jar
   ```

4. **Verify backend is running:**
   - Visit: http://localhost:8080/api/products
   - You should see a JSON response with product data

### Starting the Frontend

1. **Navigate to the frontend directory:**
   ```bash
   cd ecommerce-frontend
   ```

2. **Install dependencies (first time only):**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

4. **Alternative method (if dev server fails):**
   ```bash
   npm run build
   npx serve -s build -l 3001
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000 (or http://localhost:3001)
   - Backend API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui/index.html
   - H2 Console: http://localhost:8080/h2-console

## 📊 Sample Data

The application comes with pre-loaded sample data.

### Sample Users (4)
- **Admin**: admin@shop.com / user123
- **John Doe**: user@shop.com / user123
- **Jane Smith**: jane@shop.com / user123
- **Bob Johnson**: bob@shop.com / user123

## 🎯 Demo Section



## 📄 License

This project is licensed under the MIT License.

