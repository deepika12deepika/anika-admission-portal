# anika-admission-portal
its an clg project, developed by bestfriends


# 🏛️ Anika University Admission Portal v3.0

Anika University Portal is a high-fidelity, production-grade MERN stack application designed to streamline the academic admission lifecycle. It features a premium Indigo/Slate design system, real-time institutional telemetry, and a secured multi-stage admission wizard.

![Anika Portal Preview](https://github.com/user-attachments/assets/placeholder)

## 🌟 Key Features

### 1. **High-Performance Navigation**
- **Dynamic Verticals**: Explore departments like Quantum Computing, Nano Robotics, and Pure AI Ethics with detailed curriculums.
- **Micro-Animations**: Fluid transitions using Framer Motion and Tailwind CSS.
- **Institutional Gallery**: High-resolution architectural previews of the 400-acre smart campus.

### 2. **Secured Admission Wizard (Phase 1)**
- **4-Stage Workflow**: Personal Credential Verification, Academic Portfolio Submission, Document Hub (SOP/CV), and Secure Fee Gateway.
- **Holistic Review**: Includes a **Statement of Purpose (SOP)** field for qualitative assessment beyond GPA.
- **Real-time Status Tracking**: Tracking IDs (e.g., SIT-XXXX) allow students to monitor their application decision lifecycle.

### 3. **Role-Based User Hubs**
- **Student Dashboard**: Real-time CGPA tracking (9.4 CGPA), attendance analytics (88%), and institutional notice boards.
- **Management Control**: Registrar-level oversight to approve/reject applications and manage institutional records.
- **Cross-Role Compatibility**: Tailored interfaces for Students, Parents, Staff, and Admins.

### 4. **Infrastructure & Security**
- **MERN Stack**: MongoDB, Express.js, React, Node.js.
- **Authentication**: JWT & RSA 4096-bit session encryption (simulated).
- **Communication**: Automated SMTP email triggers for application milestones.
- **Real-time Sync**: Socket.io integration for instant status updates.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or via Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/deepika12deepika/college-admission-portal2.git
cd college-admission-portal2
```

### 2. Backend Setup
```bash
cd portal_server
npm install
# Create a .env file with your MONGO_URI, JWT_SECRET, and SMTP credentials
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | `student@anika.edu` | `student123` |
| **Admin** | `admin@anika.edu` | `admin123` |
| **Staff** | `staff@anika.edu` | `staff123` |
| **Parent** | `parent@anika.edu` | `parent123` |

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide-React, Axios, Alpine.js (legacy support).
- **Backend**: Node.js, Express.js, Mongoose, Socket.io, Nodemailer, Bcryptjs.
- **Database**: MongoDB.

---

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ❤️ for **Anika Institute of Excellence**.
