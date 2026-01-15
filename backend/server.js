const dotenv=require("dotenv").config();
const express= require("express");
const cors=require("cors");
const path= require("path");
const connectDB= require("./config/db")
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require('./routes/sessionRoutes');




const app= express();

//  middleware to handle CORS

app.use(
  cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["content-type", "Authorization"],

  })

);
connectDB()


// middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions',sessionRoutes);
// app.use('/api/questions',questionRoutes);

// api.use("/api/ai/generate-questions",protect,generateInterQuestions);
// app.use("/api/ai/generate-explanation",protect, generateConceptExplanations);







// Serve uploads folder

app.use("/uploads", express.static(path.join(__dirname,"uploads"),{}));

// start Server

const PORT= process.env.PORT||5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));


