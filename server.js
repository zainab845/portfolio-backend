const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const contactRoutes = require('./routes/contactRoutes')
const { errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

const app = express()

// ✅ CORS (should already be updated)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://portfolio-git-staging-zainab-bilals-projects-849ad4fc.vercel.app',
    'https://portfolio-git-feat-api-i-e496e3-zainab-bilals-projects-849ad4fc.vercel.app',
  ],
  credentials: true,
}))

app.use(express.json())

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' })
})

// ✅ Routes
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)

// Error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))