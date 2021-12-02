import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";

type CharacterProps = {
  id: number;
  name: string;
  rank: number;
  skill_pts: number;
  health: Stat;
  attack: Stat;
  defense: Stat;
  magik: Stat;
  available: boolean;
  lastFight: DateTime;
};

type CharacterRequest = {
  name: string;
  rank?: number;
  skill_pts?: number;
  health?: number;
  max_health?: number;
  attack?: number;
  defense?: number;
  magik?: number;
};

type Stat = {
  value: number;
  max_value?: number;
  type: "health" | "attack" | "defense" | "magik";
};

const Character = () => {
  const [characters, setCharacters] = useState([]);
  const fetchCharacters = async () => {
    fetch("/characters/all")
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        console.log(data);
        // const test = [
        //   {
        //     id: data[0].id,
        //     name: data[0].name,
        //     rank: data[0].rank,
        //     health: { value: data[0].health, type: "health" },
        //     attack: { value: data[0].attack, type: "attack" },
        //     defense: { value: data[0].defense, type: "defense" },
        //     magik: { value: data[0].magik, type: "magik" },
        //     available: true,
        //     lastFight: DateTime.now(),
        //   },
        //   {
        //     id: data[1].id,
        //     name: data[1].name,
        //     rank: data[1].rank,
        //     health: { value: data[1].health, type: "health" },
        //     attack: { value: data[1].attack, type: "attack" },
        //     defense: { value: data[1].defense, type: "defense" },
        //     magik: { value: data[1].magik, type: "magik" },
        //     available: true,
        //     lastFight: DateTime.now(),
        //   },
        //   {
        //     id: data[2].id,
        //     name: data[2].name,
        //     rank: data[2].rank,
        //     health: { value: data[2].health, type: "health" },
        //     attack: { value: data[2].attack, type: "attack" },
        //     defense: { value: data[2].defense, type: "defense" },
        //     magik: { value: data[2].magik, type: "magik" },
        //     available: true,
        //     lastFight: DateTime.now(),
        //   },
        // ];
        // console.log(test);
        setCharacters(data);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the characters list: ${error}`
        )
      );
  };

  const CharacterCreate = (character: CharacterRequest) => {
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: character.name,
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
        fetchCharacters();
      })
      .catch((error) =>
        console.error(`There was an error creating the character: ${error}`)
      );
  };

  useEffect(() => {
    fetchCharacters();
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
            available = true,
            lastFight = DateTime.now(),
          }: CharacterProps) => (
            <div key={id} className="flex flex-row justify-center">
              <div style={styles.item}>{`id: ${id}`}</div>
              <div style={styles.item}>{`name: ${name}`}</div>
              <div style={styles.item}>{`rank: ${rank}`}</div>
              <div style={styles.item}>{`health: ${health}/${health}`}</div>
              <div style={styles.item}>{`attack: ${attack}`}</div>
              <div style={styles.item}>{`defense: ${defense}`}</div>
              <div style={styles.item}>{`magik: ${magik}`}</div>
              <div style={styles.item}>{`available: ${available}`}</div>
              <div style={styles.item}>{`lastFight: ${lastFight.toLocaleString(
                DateTime.DATE_SHORT
              )}`}</div>
            </div>
          )
        )}
      <button onClick={() => CharacterCreate({ name: "Bob" })}>Ajouter</button>
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
