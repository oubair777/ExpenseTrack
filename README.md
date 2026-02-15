
---

##  Database Design

### User Schema

- name
- email (unique)
- password (hashed using bcrypt)
- createdAt

### Transaction Schema

- title
- amount
- category
- date
- notes
- user (ObjectId reference to User)
- createdAt

Each transaction is linked to a specific user to ensure secure data isolation.

---

## Security Implementation

- Password hashing using bcrypt
- JWT-based route protection
- Middleware validation
- User-specific query filtering
- Environment variables for secrets

---

##  API Endpoints

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### Transaction Routes (Protected)

- `POST /api/transactions`
- `GET /api/transactions`
- `GET /api/transactions/:id`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`

Supports query parameters:
?search=
?page=
?limit=
?category=
?startDate=
?endDate=

## How To Run Locally

### 1️ Clone Repository

git clone https://github.com/oubair777/ExpenseTracker.git


### 2️ Backend Setup

cd server
npm install
npm run dev


Create `.env` file:

PORT=5000
MONGO_URI=mongodb+srv://bellcorpuser:Test1234@cluster0.ijf7qax.mongodb.net/?appName=Cluster0
JWT_SECRET=supersecret


---

### 3️ Frontend Setup

cd client
npm install
npm start


---

##  Design Decisions

- Implemented server-side pagination for scalability
- Used query-based filtering to support dynamic explorer navigation
- Structured modular backend architecture (controllers, middleware, routes)
- Implemented donut-style percentage pie chart for better UX
- Maintained separation of concerns between frontend and backend

---

##  Video Walkthrough

Video includes:
- Application demo
- Backend architecture explanation
- Database schema explanation
- API design walkthrough
- Frontend component structure

VideoLink-https://drive.google.com/file/d/1m9Ihk70YuQwVfR7rM7C83F1Q-H4cHESI/view
---

##  Submission

Submitted to:
engineering@bellcorpstudio.com

---

##  Author

Mohammad Oubair Shareef
MERN Stack Developer  
