import { Config, names, uniqueNamesGenerator } from "unique-names-generator";
import { useAppContext } from "../../app/AppContext";
import Button from "../Button";
import Character from "./Character";
import { CharacterProps } from "./types";

const CharacterList = () => {
  const context = useAppContext();
  const config: Config = {
    dictionaries: [names],
    style: "capital",
  };
  const add = () => {
    context.addCharacter({ name: uniqueNamesGenerator(config) });
  };

  return (
    <div>
      <h1 className="text-lg leading-6 font-medium text-gray-900 mb-6">
        Combattants
      </h1>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {context.characters.length > 0 &&
          context.characters.map((character: CharacterProps) => (
            <Character key={character.id} {...character} />
          ))}
      </ul>
      <Button label="Engager" icon="user-plus" onClick={add} />
    </div>
  );
};

export default CharacterList;
