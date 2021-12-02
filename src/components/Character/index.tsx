import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";

type CharacterProps = {
  id: number;
  name: string;
  rank: number;
  skill_pts: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
  available: boolean;
  lastFight: DateTime;
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
        setCharacters(data);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the characters list: ${error}`
        )
      );
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <>
      <div>Coincoin</div>
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
              <div style={styles.item}>{`health: ${health}`}</div>
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
