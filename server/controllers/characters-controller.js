const knex = require("./../db");

exports.charactersAll = async (req, res) => {
  // Get all characters from database
  knex
    .select("*")
    .from("characters")
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      res.json({ message: `There was an error retrieving characters: ${err}` });
    });
};

exports.charactersCreate = async (req, res) => {
  // Add new character to database
  knex("characters")
    .insert({
      name: req.body.name,
      rank: req.body.rank,
      skill_pts: req.body.skill_pts,
      health: req.body.health,
      max_health: req.body.max_health,
      attack: req.body.attack,
      defense: req.body.defense,
      magik: req.body.magik,
    })
    .then(() => {
      res.json({ message: `Character ${req.body.name} created.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error creating ${req.body.name} character: ${err}`,
      });
    });
};

exports.charactersDelete = async (req, res) => {
  // Find specific character in the database and remove it
  knex("characters")
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({ message: `Character ${req.body.id} deleted.` });
    })
    .catch((err) => {
      res.json({
        message: `There was an error deleting ${req.body.id} character: ${err}`,
      });
    });
};
