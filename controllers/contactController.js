const Contact = require('../models/Contact')

// @route   POST /api/contact
// @desc    Save a contact form submission
// @access  Public
const submitContact = async (req, res) => {
  const { name, email, message } = req.body

  try {
    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    // Save to database
    const contact = await Contact.create({ name, email, message })

    res.status(201).json({
      message: 'Message received! I will get back to you soon.',
      contact,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { submitContact }