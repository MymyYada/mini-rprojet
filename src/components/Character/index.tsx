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
      {context.characters.length > 0 &&
        context.characters.map((character: CharacterProps) => (
          <CharacterItem key={character.id} {...character} />
        ))}
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
