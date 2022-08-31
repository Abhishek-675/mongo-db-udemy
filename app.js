const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("630f4a360a22ed785c1e85ba")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${process.env.MongoUserName}:${process.env.MongoPassword}@cluster0.epovlt4.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    User.findOne().then(user=>{
      if(!user){
        const user = new User({
          name: "john",
          email: "john@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    })
    app.listen(3000);
    console.log(">>>>>>>>>connected");
  })
  .catch((err) => {
    console.log(err);
  });
