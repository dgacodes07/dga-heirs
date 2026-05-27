const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

mongoose.set("bufferCommands", false);

const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const ebooksRouter = require("./routes/ebooks");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dgaheirs";
const publicDir = path.join(__dirname, "public");
const uploadsDir = path.join(__dirname, "uploads");

fs.mkdirSync(path.join(uploadsDir, "ebooks"), { recursive: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(publicDir));
app.use("/uploads", express.static(uploadsDir));

const companies = [ 
  {
    name: "Music Distro Entertainment Global",
    description: "Global Music Distribution, Publishing Administration, Playlisting & Promotional platform",
    url: "https://musicdistroglobal.com",
    logo: "/images/mdg.jpg"
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

app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "offline"
  });
});

app.get("/api/companies", (req, res) => {
  res.json(companies);
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/ebooks", ebooksRouter);

mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => {
    console.warn("MongoDB is offline. Public pages will still load; admin, posts, and ebook writes need MongoDB.");
    console.warn(error.message);
  });

app.listen(PORT, () => {
  console.log(`DGA Heirs local server running at http://localhost:${PORT}`);
});
