import mongoose from "mongoose";
import color from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connecting to Mongodb Database ${conn.connection.host} `.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgCyan.white);
  }
};

export default connectDB;
