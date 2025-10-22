# Rocket.Q SPA - React.js & Sequelize

A complete Single Page Application (SPA) version of Rocket.Q built with React.js frontend and Express.js + Sequelize backend.

## 🚀 Features

- **SPA Architecture**: Full React.js frontend with Express.js API backend
- **Database**: SQLite with Sequelize ORM for data persistence
- **Real-time CRUD**: Create rooms, ask questions, mark as read, delete questions
- **Password Protection**: Secure room creation and administration
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error management on both frontend and backend

## 📁 Project Structure

```
rocket.q-React.js/
├── frontend/                  # React.js SPA Frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Modal/         # Modal for confirmations
│   │   │   └── Question-cards/ # Question display component
│   │   ├── pages/             # Page components with routing
│   │   │   ├── Home/          # Landing page
│   │   │   ├── Create-pass/   # Room creation
│   │   │   ├── Room/          # Main room interface
│   │   │   └── NotFound/      # 404 page
│   │   ├── services/          # API communication layer
│   │   │   └── api.js         # HTTP client for backend
│   │   └── main.jsx           # App entry point with routing
│   └── package.json
└── backend/
    └── API/                   # Express.js API Server
        ├── config/            # Database configuration
        ├── models/            # Sequelize models (Room, Question)
        ├── controllers/       # Business logic controllers
        ├── routes/            # API route definitions
        ├── server.js          # Server entry point
        └── package.json
```

## 🛠️ Technology Stack

### Frontend
- **React.js 18+**: Component-based UI library
- **React Router**: Client-side routing for SPA
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom properties and modern styling

### Backend
- **Express.js**: Web application framework
- **Sequelize**: Promise-based ORM for Node.js
- **SQLite**: Lightweight database
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend/API
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will be available at `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update package.json if needed for Node.js compatibility:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Rooms
- `POST /api/rooms/create` - Create a new room
- `POST /api/rooms/enter` - Validate room access
- `GET /api/rooms/:id` - Get room details with questions
- `DELETE /api/rooms/:id` - Delete a room

### Questions
- `POST /api/questions/create` - Create a new question
- `GET /api/questions/room/:roomId` - Get questions by room
- `PUT /api/questions/:id/read` - Mark question as read
- `DELETE /api/questions/:id` - Delete a question

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Database
The application uses SQLite with automatic table creation. The database file `database.sqlite` will be created automatically when the server starts.

## 🎯 Usage Flow

1. **Home Page**: Enter room ID or create new room
2. **Create Room**: Set password and create room
3. **Room Interface**: 
   - Submit anonymous questions
   - View all questions
   - Admin actions (mark as read/delete) with password
   - Copy room ID to share

## 🔐 Security Features

- Password hashing with bcryptjs
- Room-level access control
- Admin password verification for question management
- Input validation and sanitization
- CORS configuration for secure API access

## 🚨 Troubleshooting

### Node.js Version Issues
If you encounter Vite compatibility issues:
1. Update Node.js to version 18+ or 20+
2. Or downgrade Vite to version 5.x in package.json
3. Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Database Issues
- The SQLite database is created automatically
- Check console logs for Sequelize connection errors
- Ensure write permissions in the backend/API directory

### CORS Issues
- Backend configured for `http://localhost:5173` by default
- Update `FRONTEND_URL` in .env if using different ports
- Check browser console for CORS-related errors

## 🎨 Styling
The application uses CSS custom properties for theming:
- Modern color palette with CSS variables
- Responsive design with grid and flexbox
- Smooth animations and hover effects
- Mobile-first approach

## 📝 Development Notes

- All API responses include proper error handling
- Frontend includes loading states and error messages
- Database models include validation rules
- Components are modular and reusable
- Routes are protected and handle edge cases

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---
