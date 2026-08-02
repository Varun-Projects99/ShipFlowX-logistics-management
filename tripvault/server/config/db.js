import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripvault';
  
  try {
    // Attempt connecting to configured MONGO_URI or local MongoDB
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[MongoDB] Primary database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB] Primary database not reachable (${error.message}).`);
    console.log(`[MongoDB] Launching embedded In-Memory MongoDB database fallback...`);
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const fallbackUri = memoryServer.getUri();
      await mongoose.disconnect(); // Clean up previous connection attempt first
      await mongoose.connect(fallbackUri);
      console.log(`[MongoDB] ✅ Embedded In-Memory Database connected successfully! Registration and Login are ready.`);
    } catch (memErr) {
      console.error(`[MongoDB] In-Memory fallback failed: ${memErr.message}`);
    }
  }
};

export const isDBConnected = () => {
  const state = mongoose.connection.readyState;
  return state === 1 || state === 2;
};


