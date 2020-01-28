const bcrypt = require("bcryptjs");
const sanitize = require("mongo-sanitize");
const path = require('path')

const User = require("./User");

exports.init = app => {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

  app.get("/users", async (req, res) => {
    const users = await User.find();
    return res.status(200).send(users);
  });

  app.post("/login", async (req, res) => {
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    //Le cas où l'email ou bien le password ne serait pas soumit ou null
    if (!email || !password) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    // On check si l'utilisateur existe en base
    try {
      const user = await User.findOne({ email: { $in: [email] } });
      const username = user.firstname;
      const userPassw = user.password;

      // On check si le password correspond
      user.authenticate(password, userPassw, (err, samePassword) => {
        if (!samePassword) {
          return res.status(401).send({
            text: "Wrong password"
          });
        }

        if (samePassword) {
          const token = user.getToken(user);
          req.session.token = token;
          return res.status(200).send({
            text: "Authentication successful",
            token: req.session.token,
            username: username
          });
        }
      });
    } catch (error) {
      return res.status(404).send({
        text: "User does not exist"
      });
    }
  });

  app.post("/signup", async (req, res) => {
    const firstname = sanitize(req.body.firstname);
    const email = sanitize(req.body.email);
    const password = sanitize(req.body.password);

    //Le cas où l'email le password ou le firstname ne serait pas soumit ou null
    if (!email || !firstname || !password) {
      return res.status(400).send({
        text: "Bad request"
      });
    }
    // Création d'un user

    // On check en base si l'utilisateur existe déjà
    try {
      const user = await User.findOne({ email: { $in: [email] } });
      if (user) {
        return res.status(405).send({
          text: "User already exists"
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }

    // Sauvegarde de l'utilisateur en base et hashage du mot de passe
    try {
      const userData = new User({
        firstname,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userData.password, salt, async function(
          err,
          hashedPassword
        ) {
          if (err) {
            console.error(err);
          }
          userData.password = hashedPassword;
          const userObject = await userData.save();

          return res.status(201).send({
            text: "Succes, new user saved",
            token: userObject.getToken(userObject)
          });
        });
      });
    } catch (error) {
      return res.status(500).send({ error });
    }
  });

  app.delete("/users/:id", async (req, res) => {
    const userId = sanitize(req.params.id);

    if (!userId) {
      return res.status(400).send({
        text: "Bad request"
      });
    }

    try {
      await User.deleteOne({ _id: userId });

      return res.status(200).redirect("/users");
    } catch (error) {
      return res.status(500).send({ error });
    }
  });
};
