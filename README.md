# Ooorion X - Enhanced Portfolio Dashboard

A modern crypto exchange dashboard built with React and NestJS.

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **Headless UI** for styling
- **Zustand** for state management
- **React Query** for data fetching
- **Recharts** for charts and graphs
- **Lucide React** for icons
- **Framer Motion** for animations

### Backend
- **NestJS** + **TypeScript**
- **PostgreSQL** database
- **Redis** for caching
- **Socket.io** for real-time WebSocket connections
- **Axios** for HTTP client
- **node-cron** for scheduled tasks

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/galenzo17/ooorion_x.git
cd ooorion_x
```

2. Start the database services:
```bash
docker-compose up -d
```

3. Install and run the backend:
```bash
cd backend
npm install
npm run start:dev
```

4. Install and run the frontend:
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Copy the `.env` file in the backend directory and update the values as needed.

## 📁 Project Structure

```
ooorion_x/
├── frontend/          # React frontend application
├── backend/           # NestJS backend application
├── docker-compose.yml # Database services
└── README.md
```

## 🔧 Development

- Frontend development server: `http://localhost:5173`
- Backend API server: `http://localhost:3000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## 📝 Features

- Portfolio overview and analytics
- Real-time price tracking
- Interactive charts and graphs
- Modern responsive UI
- Real-time WebSocket updates