const express = require("express");
const firebase = require("../db");
//const firestore = firebase.firestore();
const Users = require("../models/users");
const router = express.Router();

// ADD NEW USER (REGISTER)
router.post("/user", async (req, res) => {
  try {
    const user = req.body;
    await firestore.collection("Users").doc().set(user);
    res.status(200).json({
      success: true,
      message: "Utilisateur ajouter avec succès",
    });
  } catch (err) {
    return res.status(400).json("ERREUR ADD USER");
  }
});

// UPDATE USER

module.exports = router;
