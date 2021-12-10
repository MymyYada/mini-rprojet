import React from "react";
import { useAppContext } from "../../app/AppContext";
import Button from "../Button";
import Character from "./Character";
import { CharacterProps } from "./types";

const CharacterList = () => {
  const context = useAppContext();

  return (
    <div>
      <h1 className="text-lg leading-6 font-medium text-gray-900 mb-6">
        Personnages
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {context.characters.length > 0 &&
          context.characters.map((character: CharacterProps) => (
            <Character key={character.id} {...character} />
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

export default CharacterList;
