# 🎬 Movie Backend API

A movie API built with NestJS, TypeScript, and Clean Architecture principles. This backend service provides movie data through RESTful APIs with comprehensive documentation and authentication.

## 🚀 Live Demo

- **Frontend**: [https://movie-frontend-151383141329.asia-southeast1.run.app](https://movie-frontend-151383141329.asia-southeast1.run.app)
- **Backend API**: [https://movie-backend-151383141329.asia-southeast1.run.app/swagger](https://movie-backend-151383141329.asia-southeast1.run.app/swagger)
- **Frontend Repository**: [https://github.com/pitiwatPro/movie-front-end](https://github.com/pitiwatPro/movie-front-end)

## 📋 Prerequisites

Before getting started, you need to obtain a **RAPID_API_KEY** from:
[https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/playground](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/playground)

## 🛠️ Local Development Setup

### Using Docker Compose (Recommended)

1. **Create project directory and clone repositories:**
   ```bash
   mkdir movie_project
   cd movie_project
   git clone https://github.com/pitiwatPro/movie-back-end.git
   ```

2. **Configure environment variables:**
   ```bash
   cd movie-back-end
   cp .env.example .env
   echo "RAPID_API_KEY={your_rapid_api_key}" >> .env
   # Replace {your_rapid_api_key} with your actual API key
   ```

3. **Start the application:**
   ```bash
   docker compose up -d
   ```

4. **Open your browser:**
   Visit [http://localhost:3001/swagger](http://localhost:3001/swagger) for API documentation

### Using npm (Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys
   ```

3. **Start development server:**
   ```bash
   npm run start:dev
   ```

## 🏗️ Project Architecture

This project follows **Clean Architecture** principles with clear separation of concerns and dependency inversion:

```
src/
├── app.module.ts          # Main application module
├── main.ts               # Application entry point with Swagger setup
├── common/               # Shared utilities and cross-cutting concerns
│   ├── config/          # Configuration management
│   ├── decorators/      # Custom decorators
│   ├── errors/          # Custom error classes
│   ├── guards/          # Authentication and authorization guards
│   ├── helpers/         # Utility functions
│   └── middlewares/     # Global middlewares and filters
├── core/                # Business Logic Layer (Framework Independent)
│   ├── adapters/        # Interfaces/Ports for external data sources
│   ├── application/     # Use cases and business orchestration
│   └── entities/        # Pure domain entities and business models
└── infrastructure/      # External Data Layer and Framework Specific Code
    ├── http/           # REST API controllers and DTOs
    │   ├── health/     # Health check endpoints
    │   └── movie/      # Movie-related API endpoints
    └── rapid/          # External API integration (RapidAPI)
        ├── api/        # RapidAPI client implementation
        └── rapid.repository.ts # Movie repository implementation
```

### Architecture Layers Explained:

#### 🎯 **Core Layer** (Business Logic)
- **`entities/`**: Pure domain models containing business rules and data structures
- **`application/`**: Use cases that orchestrate business logic and coordinate between entities and adapters
- **`adapters/`**: Interfaces (ports) that define contracts for external data sources, ensuring dependency inversion

#### 🔌 **Infrastructure Layer** (External Data & Framework)
- **`http/`**: REST API controllers that expose business functionality to clients
- **`rapid/`**: External API integration implementing repository pattern for movie data
- Implements adapter interfaces to work seamlessly with core business logic

#### 🛠️ **Common Layer** (Cross-cutting Concerns)
- **`config/`**: Environment configuration and application settings
- **`guards/`**: API key authentication and authorization
- **`errors/`**: Custom error handling and exception classes
- **`middlewares/`**: Global error filters and request/response processing

## 🛡️ Technologies Used

- **Framework**: NestJS with Express
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **Authentication**: API Key Guard
- **Configuration**: @nestjs/config
- **Validation**: Built-in NestJS validation
- **Deployment**: Google Cloud Run
- **Containerization**: Docker

## 📁 Environment Variables

```bash
# Server Configuration
PORT=3001
GLOBAL_PREFIX='api'

# Security
API_KEY='your_api_key_here'

# CORS Configuration
CORS_ORIGIN='http://localhost:3000'
CORS_METHODS='GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'

# External API
RAPID_URL='https://streaming-availability.p.rapidapi.com'
RAPID_API_KEY='YOUR_RAPID_API_KEY'
```

## 🚀 Available Scripts

- **`npm run start`**: Start production server
- **`npm run start:dev`**: Start development server with watch mode
- **`npm run start:debug`**: Start development server with debug mode
- **`npm run build`**: Build production application
- **`npm run lint`**: Run ESLint for code quality
- **`npm run test`**: Run unit tests
- **`npm run test:e2e`**: Run end-to-end tests

## 📚 API Documentation

Once the application is running, visit:
- **Local**: [http://localhost:3001/swagger](http://localhost:3001/swagger)
- **Production**: [https://movie-backend-151383141329.asia-southeast1.run.app/swagger](https://movie-backend-151383141329.asia-southeast1.run.app/swagger)

### Authentication

All movie endpoints require an API key to be included in the request headers:
```bash
x-api-key: your_api_key_here
```


## 🌐 Deployment

The application is automatically deployed to Google Cloud Run via GitHub Actions when pushing to the main branch. The CI/CD pipeline includes:

- ✅ Type checking and linting
- 🧪 Running tests
- 🐳 Docker image building
- 🚀 Automatic deployment to Cloud Run
- 🔍 Health checks and rollback on failure

## 🔗 Related Projects

- [Movie Frontend Application](https://github.com/pitiwatPro/movie-front-end) - Next.js frontend application
