import React from "react";
import { useAppContext } from "../../app/AppContext";
import CharacterItem from "./Item";
import { CharacterProps } from "./types";

const Character = () => {
  const context = useAppContext();
  return (
    <div>
      <div>Personnages</div>
      {context.characters.length > 0 &&
        context.characters.map((character: CharacterProps) => (
          <CharacterItem key={character.id} {...character} />
        ))}
      <button onClick={() => context.addCharacter({ name: "Bob" })}>
        Ajouter
      </button>
    </div>
  );
};

export default Character;
