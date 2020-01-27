const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path')

const router = require("./router");
const config = require("./config/config");

const app = express();

// Middlewares
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")))

app.use(
  session({
    name: "tokendId",
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 7200,
      secure: true,
      sameSite: "strict"
    }
  })
);

// Routes
router.init(app);

module.exports = app;
