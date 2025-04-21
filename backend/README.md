## Backend Setup

### Prerequisites

- Ensure you have Docker and Docker Compose installed on your machine.
- Ensure you have Node.js and Yarn installed on your machine.
- Ensure you have a Supabase account and project set up.

### Installation

1. Navigate to the backend directory:

```sh
cd backend
```

2. Install the dependencies:

```sh
yarn install
```

3. Set up your environment variables:

Create a `.env` file in the `backend` directory and add the following:

```env
DATABASE_URL=your_supabase_database_url
DIRECT_URL=your_supabase_direct_url
```

### Running the Application

1. Start the application using Docker Compose:

```sh
docker-compose up --build
```

This will start the backend server on port 8080 and the PostgreSQL database on port 5433.

2. Alternatively, you can start the application without Docker:

```sh
yarn start
```

This will start the backend server on port 3001.

### Prisma

1. Generate Prisma client:

```sh
yarn prisma generate
```

2. Run Prisma migrations:

```sh
yarn prisma migrate dev
```

### API Endpoints

- Get all tickets: `GET http://localhost:8080/tickets`
- Get ticket by ID: `GET http://localhost:8080/ticket/:id`
- Create a new ticket: `POST http://localhost:8080/tickets`
- Get all users: `GET http://localhost:8080/users`
- Get user by ID: `GET http://localhost:8080/user/:id`
- Create a new user: `POST http://localhost:8080/users`
- Login to user account: `POST http://localhost:8080/users/login`
- Update user password: `PUT http://localhost:8080/user/:id`

This will provide clear instructions on how to set up and run the backend application.