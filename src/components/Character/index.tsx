import React, { useEffect, useState } from "react";

type CharacterProps = {
  id: number;
  rank: number;
  skill_pts: number;
  health: number;
  attack: number;
  defense: number;
  magik: number;
};

const Character = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    fetch("http://localhost:4001/characters/all", {
      mode: "no-cors",
    })
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

  return (
    <>
      <div>Coincoin</div>
      {characters.length > 0 &&
        characters.map((character: CharacterProps) => (
          <div>{character.id}</div>
        ))}
    </>
  );
};

export default Character;
