# replit.md

## Overview

This is a full-stack web application for a print shop service called "PrintLite". The application allows users to upload documents, customize print settings, place orders, and track their printing jobs. It features a React frontend with a Node.js/Express backend, using PostgreSQL for data storage.

**Migration Status**: Successfully migrated from Replit Agent to standard Replit environment (July 15, 2025)

## Recent Changes
- ✓ Added deployment configuration files for AWS Amplify (`amplify.yml`)
- ✓ Created SPA routing support (`_redirects`, `.htaccess`)
- ✓ Added comprehensive deployment documentation (`DEPLOYMENT.md`)
- ✓ Verified project runs correctly in Replit environment

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: React Router for client-side navigation
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Development**: Hot reloading with tsx in development mode

### Project Structure
```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
├── server/          # Express backend
│   ├── index.ts     # Main server file
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Database interface and in-memory implementation
│   └── vite.ts      # Vite development server setup
├── shared/          # Shared types and schemas
│   └── schema.ts    # Database schema definitions
└── migrations/      # Database migration files
```

## Key Components

### Database Schema
- **Users table**: Basic user authentication with username/password
- **Schema validation**: Zod schemas for runtime type checking
- **ORM**: Drizzle ORM for type-safe database operations

### Frontend Pages
- **HomePage**: Landing page with service overview and templates
- **UploadPage**: File upload interface with drag-and-drop
- **PrintSettings**: Customization options for print jobs
- **CartPage**: Shopping cart functionality
- **CheckoutPage**: Order placement and payment
- **AdminDashboard**: Order management for staff
- **TrackOrder**: Order status tracking for customers

### Backend Services
- **Storage Interface**: Abstracted database operations
- **In-Memory Storage**: Development storage implementation
- **Route Handler**: Express middleware for API endpoints
- **Error Handling**: Centralized error management

## Data Flow

1. **User Authentication**: Users create accounts and log in through the user system
2. **File Upload**: Documents are uploaded through the frontend upload interface
3. **Print Configuration**: Users select paper type, color options, binding, etc.
4. **Order Processing**: Orders are created and stored in the database
5. **Admin Management**: Staff can view and update order statuses
6. **Order Tracking**: Customers can track their order progress

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, React Router, TanStack Query
- **Styling**: Tailwind CSS, Radix UI components
- **Form Handling**: React Hook Form with Zod validation
- **Utilities**: date-fns, clsx, class-variance-authority

### Backend Dependencies
- **Server**: Express.js with middleware support
- **Database**: PostgreSQL via Neon Database serverless
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution

### Build Tools
- **Frontend**: Vite with React plugin
- **Backend**: esbuild for production bundling
- **Database**: Drizzle Kit for migrations

## Deployment Strategy

### Development Mode
- Frontend served by Vite dev server with HMR
- Backend runs with tsx for live reloading
- Database migrations handled by Drizzle Kit

### Production Build
- Frontend built to static files in `dist/public`
- Backend bundled with esbuild to `dist/index.js`
- Environment variables required: `DATABASE_URL`

### Database Setup
- PostgreSQL database provisioned (Neon Database recommended)
- Schema migrations applied via `npm run db:push`
- Connection configured through environment variables

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:push`: Apply database schema changes

The application is designed to be deployed on platforms that support Node.js applications with PostgreSQL databases, with particular optimization for Replit's environment.