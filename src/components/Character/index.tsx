import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { CharacterProps, CharacterRequest, CharacterResponse } from "./types";

const Character = () => {
  const [characters, setCharacters] = useState([]);
  const getAllCharacters = async () => {
    fetch("/characters/all")
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        data = data.map(({ id, name, rank, ...stats }: CharacterResponse) => {
          return {
            id,
            name,
            rank,
            health: {
              value: stats.health,
              max_value: stats.max_health,
              type: "health",
            },
            attack: { value: stats.attack, type: "attack" },
            defense: { value: stats.defense, type: "defense" },
            magik: { value: stats.magik, type: "magik" },
            available: true,
            lastFight: DateTime.now(),
          };
        });
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

  useEffect(() => {
    getAllCharacters();
  }, []);

  return (
    <>
      <div>Personnages</div>
      {characters.length > 0 &&
        characters.map(
          ({
            id,
            name,
            rank,
            health,
            attack,
            defense,
            magik,
            available,
            lastFight,
          }: CharacterProps) => (
            <div key={id} className="flex flex-row justify-center">
              <div style={styles.item}>{`id: ${id}`}</div>
              <div style={styles.item}>{`name: ${name}`}</div>
              <div style={styles.item}>{`rank: ${rank}`}</div>
              <div style={styles.item}>
                {`health: ${health.value}/${health.max_value}`}
              </div>
              <div style={styles.item}>{`attack: ${attack.value}`}</div>
              <div style={styles.item}>{`defense: ${defense.value}`}</div>
              <div style={styles.item}>{`magik: ${magik.value}`}</div>
              <div style={styles.item}>{`available: ${available}`}</div>
              <div style={styles.item}>{`lastFight: ${lastFight.toLocaleString(
                DateTime.DATE_SHORT
              )}`}</div>
            </div>
          )
        )}
      <button onClick={() => addCharacter({ name: "Bob" })}>Ajouter</button>
    </>
  );
};

const styles = {
  item: {
    // flex: 1,
    margin: 8,
  },
};

export default Character;
