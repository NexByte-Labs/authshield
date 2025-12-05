# AuthShield — Authentication & RBAC (NexByte Labs)

AuthShield is a compact, production-ready example of JWT-based authentication and Role-Based Access Control (RBAC).  
It demonstrates best-practice structure, human-friendly code, clear error handling, and easy integration into SaaS projects.

## Features
- JWT access + refresh token pattern
- Role-based permissions (Admin, Manager, User)
- Middleware: `authenticate` and `authorize`
- Clear error messages & logging
- Example routes and minimal tests
- ESLint + Prettier formatting

## Quick start (development)
1. Copy `.env.example` to `.env` and set values:
   ```bash
   cp .env.example .env
   # Edit .env to add JWT_SECRET, MONGO_URI, etc.
