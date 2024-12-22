import mongoose from "mongoose"

const connect = async () => {
  if (mongoose.connections[0].readyState) return
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("Error reading process.env.MONGODB_URI")
  }
  try {
    await mongoose.connect(uri)
    console.log("Mongo Connection successfully established.")
  } catch (error) {
    throw new Error("Error connecting to Mongoose")
  }
}

export default connect
