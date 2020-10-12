require("dotenv").config();
 
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const stripeRoutes = require("./routes/stripepayment");

//DB Connection 
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/auth", authRoutes);
app.use("/user",userRoutes);
app.use("/product",productRoutes);
app.use("/api", stripeRoutes);

//PORT
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello !')
})

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
   