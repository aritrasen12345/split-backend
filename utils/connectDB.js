import mongoose from "mongoose";

const { connect, set } = mongoose;
const options = {
  // autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 10000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectDB = () => {
  set("strictQuery", false);
  connect(process.env.DB_URL, options)
    .then(() => {
      console.log("Connected to DB successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectDB;
