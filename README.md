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
├── INSTALLATION_GUIDE.md              # Detailed installation guide
├── VERSIONS.md                        # Software versions
├── features.md                        # Feature documentation
├── reading-order.md                   # Documentation reading guide
└── consolidated-overview.md           # Project overview
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

## 🛠️ Tools & Versions

### Backend Technologies
- **Java**: 17 (LTS)
- **Spring Boot**: 3.2.0
- **Spring Security**: 6.1.1
- **Spring Data JPA**: 3.2.0
- **H2 Database**: 2.2.224 (development)
- **PostgreSQL**: 42.7.1 (production)
- **JWT**: 0.11.5
- **Maven**: 3.9.6
- **Flyway**: 9.22.3 (database migrations)
- **Swagger/OpenAPI**: 2.2.0
- **Jackson Hibernate5 Module**: Handles lazy-loading proxy serialization

### Frontend Technologies
- **React**: 18.2.0
- **Node.js**: 18.17.0+
- **npm**: 9.6.7+
- **Tailwind CSS**: 3.4.17
- **Axios**: 1.7.7
- **React Router DOM**: 7.9.1
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.21

### Development Tools
- **IntelliJ IDEA Community**: 2023.3+
- **VS Code**: Latest version
- **Git**: 2.40.0+
- **Chrome/Firefox**: Latest version

## 📊 Sample Data

The application comes with pre-loaded sample data:

### Categories (4)
- **Electronics**: Electronic devices and gadgets
- **Clothing**: Fashion and apparel
- **Books**: Books and educational materials
- **Home & Garden**: Home improvement and garden supplies

### Products (16)
- **Electronics**: Gaming Laptop ($1299.99), Smartphone Pro ($699.99), Wireless Headphones ($199.99), Tablet Computer ($399.99)
- **Clothing**: Cotton T-Shirt ($19.99), Classic Denim Jeans ($49.99), Fleece Hoodie ($39.99), Running Shoes ($89.99)
- **Books**: Programming Guide ($39.99), Web Development ($29.99), Data Science ($49.99), System Design ($59.99)
- **Home & Garden**: Garden Tools Set ($79.99), Wall Art Canvas ($59.99), Indoor Plant ($24.99), Modern Table Lamp ($89.99)

### Sample Users (4)
- **Admin**: admin@shop.com / user123
- **John Doe**: user@shop.com / user123
- **Jane Smith**: jane@shop.com / user123
- **Bob Johnson**: bob@shop.com / user123

## 🔧 Configuration

### Development Profile (Default)
- Uses H2 in-memory database
- Debug logging enabled
- H2 console enabled at http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

### Production Profile
- Uses PostgreSQL database
- Optimized logging
- Flyway migrations enabled

To run with production profile:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

## 🧪 Testing

### Backend Tests
```bash
cd ecommerce-backend
mvn test
```

### Frontend Tests
```bash
cd ecommerce-frontend
npm test
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/search` - Search products with filters
- `GET /api/products/category/{categoryId}` - Get products by category

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{itemId}` - Update item quantity
- `DELETE /api/cart/items/{itemId}` - Remove item from cart

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user's orders (with product details)
- `GET /api/orders/{id}` - Get specific order by ID

### Users
- `GET /api/users/me` - Get current user profile

## 🐛 Troubleshooting

### Common Issues

1. **Port 8080 already in use**
   - Change the port in `application.yml`: `server.port: 8081`
   - Or kill the process: `netstat -ano | findstr :8080`

2. **Backend won't start with `mvn spring-boot:run`**
   - Ensure you're in the `ecommerce-backend` directory
   - Try building first: `mvn clean package -DskipTests`
   - Then run: `java -jar target/shop-0.0.1-SNAPSHOT.jar`

3. **Frontend won't start with `npm start`**
   - Ensure you're in the `ecommerce-frontend` directory
   - Install dependencies: `npm install`
   - Try building first: `npm run build`
   - Use alternative: `npx serve -s build -l 3001`

4. **Database connection issues**
   - Ensure H2 console is accessible at http://localhost:8080/h2-console
   - Check database configuration in `application-dev.yml`

5. **API calls failing**
   - Ensure backend is running on port 8080
   - Check CORS configuration in `SecurityConfig.java`
   - Verify API endpoints in Swagger UI: http://localhost:8080/swagger-ui/index.html

## 📖 Documentation

This project includes comprehensive documentation:

- **INSTALLATION_GUIDE.md**: Detailed software installation instructions
- **VERSIONS.md**: Exact versions of all software and dependencies
- **features.md**: Complete feature documentation
- **RECENT_CHANGES.md**: Latest bug fixes and enhancements
- **database_schema.md**: Complete database schema documentation
- **reading-order.md**: Guide for reading project documentation
- **consolidated-overview.md**: High-level project overview
- **backend-explain-*.md**: Detailed backend implementation guides
- **frontend-explain-*.md**: Detailed frontend implementation guides

## 🎯 Demo Section

*This section will be updated with demo links and screenshots.*

### Live Demo
- **Frontend**: [Demo Link - To be added]
- **Backend API**: [API Demo - To be added]

### Screenshots
- **Homepage**: [Screenshot - To be added]
- **Product Catalog**: [Screenshot - To be added]
- **Shopping Cart**: [Screenshot - To be added]
- **User Authentication**: [Screenshot - To be added]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Built as a portfolio project demonstrating:
- Spring Boot best practices
- RESTful API design
- JWT authentication
- Database integration
- Clean code architecture
- Modern React development
- Full-stack integration

---

## 📝 Recent Updates

See [RECENT_CHANGES.md](RECENT_CHANGES.md) for detailed changelog of recent bug fixes and enhancements.

**Latest Updates** (October 2025):
- ✅ Fixed circular reference JSON serialization in orders
- ✅ Enhanced order display with complete product details
- ✅ Formatted shipping address display
- ✅ Added Jackson Hibernate5 module for lazy-loading proxy handling

---

**Status**: ✅ Fully Functional - Backend running on port 8080, Frontend builds successfully, Sample data loaded, All APIs tested and working, Orders display correctly with formatted addresses.
