const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const ebooksRouter = require("./routes/ebooks");

const app = express();

mongoose.connect("mongodb://localhost:27017/dgaheirs")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());

// serve frontend
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const companies = [ 
  {
    name: "Music Distro Entertainment Global",
    description: "Global Music Distribution, Publishing Administration, Playlisting & Promotional platform",
    url: "https://musicdistroglobal.com",
    logo: "/images/mdg.png"
  },

  {
    name: "Bentanna Garms Global Ltd",
    description: "Fashion, Street Wears, Sneakers, Wristwatches",
    url: "https://bentannagarms.zevshop.com",
    logo: "/images/bentannagarms.jpg"
  },
  {
    name: "JFortMedia",
    description: "The Image Identity Of Africa. Amplification Platform",
    url: "https://jfortmedia.com",
    logo: "/images/jfort.png"
  },
  {
    name: "Jabulani Empire Music Studios",
    description: "Music Production, Mix & Mastering",
    url: "https://jemstudios.com",
    logo: "/images/jems.jpg"
  }
];

// API
app.get("/api/companies", (req, res) => {
  res.json(companies);
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/ebooks", ebooksRouter);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});