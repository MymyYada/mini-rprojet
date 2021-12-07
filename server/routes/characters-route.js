const express = require("express");
const charactersRoutes = require("./../controllers/characters-controller.js");

const router = express.Router();

router.get("/all", charactersRoutes.charactersAll);
router.post("/create", charactersRoutes.charactersCreate);
router.post("/update", charactersRoutes.charactersUpdate);
router.put("/delete", charactersRoutes.charactersDelete);

module.exports = router;
