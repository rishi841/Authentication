require("dotenv").config()
const express=require("express")
const cors=require("cors")
const app=express();
const UserRouter=require("./routes/user.routes");
const connectdb = require("./config/db");
const cookieParser = require("cookie-parser");

connectdb()
app.use(express.json())
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api",UserRouter)

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
