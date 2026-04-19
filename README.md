# HireHub — Smart Job Discovery Platform 🚀

A full-stack **job portal** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). HireHub connects job seekers with opportunities through a clean, fast, and intuitive interface — and gives recruiters a complete dashboard to post jobs, manage companies, and review applicants.

---

## ✨ Features

### For Job Seekers
- 🔐 JWT-based authentication (register, login, logout)
- 🔍 Browse and search jobs with live filters (location, role, salary)
- 📄 Apply to jobs with one click — duplicate prevention built in
- 🔖 Save and unsave jobs — persists across sessions
- 👤 Full profile management — bio, skills, resume (PDF), profile photo
- 📋 Applied jobs tracker with status (Pending / Accepted / Rejected)
- 💀 Skeleton loading states for smooth UX

### For Recruiters
- 🏢 Register and manage companies (with logo upload via Cloudinary)
- 📝 Post, edit, and delete job listings
- 👥 View all applicants per job with resume links
- ✅ Accept or reject applicants directly from the dashboard
- 🔐 Protected admin routes — recruiters only

### Platform
- 📱 Fully responsive — works on mobile and desktop
- 🎨 Modern black & white design with Tailwind CSS
- 🧠 Redux + Redux Persist for global state management
- ☁️ Cloudinary for resume and image storage
- 📧 Nodemailer confirmation email on job application

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux Toolkit, Redux Persist, React Router v6 |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT, bcryptjs, HTTP-only cookies |
| File Storage | Cloudinary (images + PDFs) |
| Email | Nodemailer (Gmail SMTP) |
| Build Tool | Vite |

---

## Screenshots

### Home Page
![Home Page](MERN-JobPortal-main\Screenshots\homepage.jpg)

### Featured Jobs
![Featured Jobs](./Screenshots/FeaturedJobs.png)

### Login Page
![Login Page](./Screenshots/LoginPage.png)

### Signup Page
![Signup Page](./Screenshots/SignupPage.png)

### Jobs Page (with filter sidebar)
![Jobs Page](./Screenshots/JobsPage.png)

### Browse Page
![Browse Page](./Screenshots/BrowseJobs.png)

### Profile Page
![Profile Page](./Screenshots/Profile.png)

### 🏢 Admin — Companies
![Admin Companies Page](./Screenshots/AdminCompanies.png)

### 📊 Admin — Jobs
![Admin Jobs Page](./Screenshots/AdminJobs.png)

### ✏️ Post a Job
![Create Jobs Page](./Screenshots/CreateJobs.png)

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/HireHub.git
cd HireHub
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend/` folder:

```env
MONGO_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/<DB_NAME>
PORT=3000
JWT_SECRET=your_jwt_secret_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
```

> **Note:** For `MAIL_PASS`, use a [Gmail App Password](https://support.google.com/accounts/answer/185833), not your regular Gmail password.

### 4. Seed the database (optional)
```bash
cd backend
node utils/seedjobs.js
```
This populates the DB with 12 sample jobs across 8 companies.

### 5. Run the project
```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173` · Backend at `http://localhost:3000`

---

## 📁 Project Structure

```
HireHub/
├── backend/
│   ├── controllers/        # Business logic (user, job, company, application, saved)
│   ├── middlewares/        # isAuthenticated, multer
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── utils/              # DB, Cloudinary, DataURI, Mailer, Seed
│   └── index.js            # Entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── admin/      # Recruiter dashboard pages
        │   ├── auth/       # Login, Signup
        │   ├── shared/     # Navbar, Footer
        │   └── ui/         # shadcn/ui components
        ├── hooks/          # Custom data-fetching hooks
        ├── redux/          # Slices + store
        └── utils/          # API endpoint constants
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/register` | Register new user |
| POST | `/api/v1/user/login` | Login |
| GET | `/api/v1/user/logout` | Logout |
| GET | `/api/v1/user/profile` | Get current user |
| POST | `/api/v1/user/profile/update` | Update profile + resume |
| POST | `/api/v1/user/profile/photo` | Update profile photo |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/job/get` | Get all jobs (supports `?keyword=&location=&jobType=`) |
| GET | `/api/v1/job/get/:id` | Get single job |
| POST | `/api/v1/job/post` | Post a new job (recruiter) |
| PUT | `/api/v1/job/update/:id` | Update a job (recruiter) |
| DELETE | `/api/v1/job/delete/:id` | Delete a job (recruiter) |
| GET | `/api/v1/job/getadminjobs` | Get recruiter's own jobs |

### Applications
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/application/apply/:id` | Apply to a job |
| GET | `/api/v1/application/get` | Get my applied jobs |
| GET | `/api/v1/application/:id/applicants` | Get applicants for a job |
| POST | `/api/v1/application/status/:id/update` | Update application status |

### Companies
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/company/register` | Register company |
| GET | `/api/v1/company/get` | Get my companies |
| GET | `/api/v1/company/get/:id` | Get company by ID |
| PUT | `/api/v1/company/update/:id` | Update company |

### Saved Jobs
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/saved/toggle/:jobId` | Save or unsave a job |
| GET | `/api/v1/saved/` | Get all saved jobs |

---

## 🌍 Live Demo

Coming soon — deploying on Render.

---

## 🤝 Contributing

Pull requests are welcome. For major changes please open an issue first.

---

## 📄 License

MIT

---

<div align="center">
  <p>Built with ❤️ using the MERN stack</p>
  <p>
    <a href="https://github.com/YOUR_USERNAME/HireHub">GitHub</a> ·
    <a href="#">Live Demo</a>
  </p>
</div>