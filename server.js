const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dogRoutes = require("./routes/dogRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware pour gérer les en-têtes CORS et le corps de la requête
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware global
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/adopet') 
  .then(() => console.log('Connected to MongoDB')) 
  .catch(err => console.error('Failed to connect to MongoDB', err)); 

// Routes
app.use("/api/dogs", dogRoutes);

// Lancer le serveur
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
});
