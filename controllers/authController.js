const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Helper: generate a JWT token for a given user ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if a user with this email already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' })
    }

    // Create the user (password gets hashed automatically via the model hook)
    const user = await User.create({ name, email, password })

    // Respond with the new user's info and a token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    console.error("Signup Error:", error);   // ← Helpful for debugging
    res.status(500).json({ 
      message: 'Server error during signup', 
      error: error.message 
    })
  }
}
const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      message: 'Server error during login', 
      error: error.message 
    })
  }
}
module.exports = { signup, login }