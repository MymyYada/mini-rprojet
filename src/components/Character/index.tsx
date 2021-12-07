import React from "react";
import CharacterItem from "./Item";
import { CharacterProps, CharacterRequest } from "./types";

const Character = ({
  characters,
  addCharacter,
  updateCharacter,
  removeCharacter,
  attackerCallback,
}: {
  characters: CharacterProps[];
  addCharacter: (character: CharacterRequest) => void;
  updateCharacter: (character: CharacterProps) => void;
  removeCharacter: (id: CharacterProps["id"]) => void;
  attackerCallback: (character: CharacterProps) => void;
}) => {
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
            attackerCallback={attackerCallback}
          />
        ))}
      <button onClick={() => addCharacter({ name: "Bob" })}>Ajouter</button>
    </div>
  );
};

export default Character;
