const express = require("express");
const charactersRoutes = require("./../controllers/characters-controller.js");

const router = express.Router();

router.get("/all", charactersRoutes.charactersAll);
router.post("/create", charactersRoutes.charactersCreate);
router.put("/delete", charactersRoutes.charactersDelete);

module.exports = router;
