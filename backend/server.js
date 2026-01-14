require("dotenv").config();
const express= require("express")
const cors= require("cors");
const path=require("path")

const app= express();

// middleware to handle Cors
app.use(
    cors({
        origin:"*",
        method:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],


    })
    // 
);

// Middleware
app.use(express.json());

// Routes



// Serve uploads folder
app.use("/upload", express.static(path.join(__dirname, "uploads"),{}));

const PORT =process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));







