import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import CharacterItem from "./Item";
import {
  CharacterProps,
  CharacterRequest,
  CharacterResponse,
  StatType,
} from "./types";

const Character = () => {
  const [characters, setCharacters] = useState([]);
  const getAllCharacters = async () => {
    fetch("/characters/all")
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        data = data.map(
          ({ id, name, rank, skill_pts, ...stats }: CharacterResponse) => {
            return {
              id,
              name,
              rank,
              skill_pts,
              health: {
                value: stats.health,
                max_value: stats.max_health,
                type: StatType.health,
              },
              attack: { value: stats.attack, type: StatType.attack },
              defense: { value: stats.defense, type: StatType.defense },
              magik: { value: stats.magik, type: StatType.magik },
              available: true,
              lastFight: DateTime.now(),
            };
          }
        );
        console.log(data);
        setCharacters(data);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the characters list: ${error}`
        )
      );
  };
  const addCharacter = ({ name, ...character }: CharacterRequest) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rank: character.rank ?? 1,
        skill_pts: character.skill_pts ?? 12,
        health: character.health ?? 10,
        max_health: character.max_health ?? 10,
        attack: character.attack ?? 0,
        defense: character.defense ?? 0,
        magik: character.magik ?? 0,
      }),
    };
    fetch("/characters/create", settings)
      .then((res) => {
        console.log(res);
        getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error creating the character: ${error}`)
      );
  };
  const updateCharacter = (character: CharacterProps) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...character,
        health: character.health.value,
        max_health: character.health.max_value,
        attack: character.attack.value,
        defense: character.defense.value,
        magik: character.magik.value,
      }),
    };
    fetch("/characters/update", settings)
      .then((res) => {
        console.log(res);
        getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error updating the character: ${error}`)
      );
  };
  const removeCharacter = (id: CharacterProps["id"]) => {
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };
    fetch("/characters/delete", settings)
      .then((res) => {
        console.log(res);
        getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error removing the character: ${error}`)
      );
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <div>
      <div>Personnages</div>
      {characters.length > 0 &&
        characters.map((character: CharacterProps) => (
          <CharacterItem
            key={character.id}
            {...character}
            onUpdate={updateCharacter}
            onDelete={() => removeCharacter(character.id)}
          />
        ))}
      <button onClick={() => addCharacter({ name: "Bob" })}>Ajouter</button>
    </div>
  );
};

export default Character;
