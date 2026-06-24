const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// Allow requests from your React frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://portfolio-git-staging-zainab-bilals-projects-849ad4fc.vercel.app',
    'https://portfolio-git-feat-api-i-e496e3-zainab-bilals-projects-849ad4fc.vercel.app',   // ← Add this line
    'https://your-main-portfolio.vercel.app'   // add your final domain later
  ],
  credentials: true,
}));

// Parse incoming JSON request bodies
app.use(express.json())

// Health check route — visit this in browser to confirm server is running
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

// Global error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))