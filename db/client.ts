import mongoose from "mongoose";
import "server-only";

// Track the connection status
let isConnected = false;

export async function connectToMongo() {
  // If already connected, skip the connection attempt
  if (isConnected) {
    console.log("DB: Using existing database connection");
    return true;
  }

  // Ensure the MONGODB_URI is set
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error("Please define the MONGODB_URI environment variable");

  // Establish the database connection
  try {
    const { connection } = await mongoose.connect(mongoUri);

    // Check if the connection is successfully established
    if (connection.readyState === 1) {
      isConnected = true;
      console.log("DB: Database connection established");

      // Optionally listen for connection events
      mongoose.connection.on("disconnected", () => {
        console.log("DB: MongoDB disconnected");
        isConnected = false;
      });

      return true;
    }
  } catch (error) {
    console.error("DB: Database connection error:", error);
    throw new Error("Could not connect to the database. Please check the connection string.");
  }
}
