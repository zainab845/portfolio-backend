const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

// Connect to database
connectDB()

const app = express()

// ✅ CORS - Improved version
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://portfolio-git-staging-zainab-bilals-projects-849ad4fc.vercel.app',
    'https://portfolio-git-feat-api-i-e496e3-zainab-bilals-projects-849ad4fc.vercel.app',
    'https://portfolio-seven-chi-79.vercel.app/',
    'https://your-main-portfolio.vercel.app',
  ],
  credentials: true,
}))

// Important: Parse JSON bodies
app.use(express.json())

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

// Global error handler - MUST be last
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`)
})