const express = require('express');
const multer = require('multer');
const path = require('path');
const Dog = require('../models/Dog');

const router = express.Router();

// Configuration de multer pour gérer les fichiers image
const uploadDirectory = path.join(__dirname, '../uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Utilisation de la date pour un nom unique
  },
});

const upload = multer({ storage });

// Route pour récupérer tous les chiens
router.get("/", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour ajouter un nouveau chien
router.post("/", upload.single("imagePath"), async (req, res) => {
  try {
    const dogData = req.body;
    if (req.file) {
      dogData.imagePath = `/uploads/${req.file.filename}`; // Chemin de l'image
    }

    const newDog = new Dog(dogData);
    await newDog.save();
    res.status(201).json(newDog);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Route pour mettre à jour un chien
router.put("/:id", upload.single("imagePath"), async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) {
      updatedData.imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedDog) {
      return res.status(404).json({ error: "Dog not found" });
    }

    res.json(updatedDog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour supprimer un chien
router.delete("/:id", async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: "Dog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
