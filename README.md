# ExpressJS Auth Backend

## Features

- User sign up with full name, email, username, and password
- Password hashing with bcrypt
- Sign in with JWT access and refresh tokens
- Password reset via email token
- Google OAuth 2.0 social login
- Admin panel APIs for user management
- MongoDB for secure and scalable data storage
- Dockerized for easy deployment
- Security best practices: rate limiting, helmet, CORS, input validation

## Setup

1. Copy `.env.example` to `.env` and fill in your environment variables.
2. Build and run with Docker:

```bash
docker-compose up --build
```

3. The API will be available at `http://localhost:5000`.

## API Endpoints

### Auth

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/request-password-reset` - Request password reset email
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback

### Users (Admin only)

- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

## Notes

- Use HTTPS in production.
- Set strong JWT secrets.
- Configure your email SMTP server for password reset emails.
- Frontend URL must be set in `.env` for CORS and redirects.

## License

MIT