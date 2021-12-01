const path = require("path");
const dbPath = path.resolve(__dirname, "db/database.sqlite");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Table characters
knex.schema
  .hasTable("characters")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("characters", (table) => {
          table.increments("id").primary();
          table.string("name");
          table.integer("rank");
          table.integer("skill_pts");
          table.integer("health");
          table.integer("max_health");
          table.integer("attack");
          table.integer("defense");
          table.integer("magik");
        })
        .then(() => {
          console.log("Table 'Characters' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Debug
knex
  .select("*")
  .from("characters")
  .then((data) => console.log("data:", data))
  .catch((err) => console.log(err));

module.exports = knex;
