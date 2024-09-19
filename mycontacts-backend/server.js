const dotenv = require("dotenv").config();
const connectDb = require('./config/dbConnection.js');
const express = require("express");
const errorHandler = require("./middlewares/errorHandler.js");
connectDb();

const app = express();
const contactRouter = require('./routes/contactRoutes.js');
const userRouter = require("./routes/userRoutes.js");

const port =  process.env.PORT || 5001;


app.use(express.json());
app.use('/api/contacts',contactRouter);
app.use('/api/users',userRouter);

app.use(errorHandler);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


