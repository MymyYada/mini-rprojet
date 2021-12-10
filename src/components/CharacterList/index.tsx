import React from "react";
import { useAppContext } from "../../app/AppContext";
import Button from "../Button";
import CharacterItem from "./Item";
import { CharacterProps } from "./types";

const Character = () => {
  const context = useAppContext();

  return (
    <div>
      <div>Personnages</div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {context.characters.length > 0 &&
          context.characters.map((character: CharacterProps) => (
            <CharacterItem key={character.id} {...character} />
          ))}
      </ul>
      <Button
        label="Ajouter"
        icon="user-plus"
        onClick={() =>
          context.addCharacter({
            name: `Bob${
              context.characters[context.characters.length - 1].id + 1
            }`,
          })
        }
      />
    </div>
  );
};

export default Character;
