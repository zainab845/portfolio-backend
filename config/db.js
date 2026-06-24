const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    console.log('Attempting to connect with URI:', process.env.MONGO_URI?.substring(0, 50) + '...'); // Don't log full password
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Full error:', error);
    process.exit(1);
  }
};

module.exports = connectDB