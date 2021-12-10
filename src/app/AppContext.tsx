import { DateTime } from "luxon";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CharacterProps,
  CharacterRequest,
  CharacterResponse,
  StatType,
} from "../components/CharacterList/types";

type AppContextType = {
  characters: CharacterProps[];
  fighters: CharacterProps[];
  setFighters: React.Dispatch<React.SetStateAction<CharacterProps[]>>;
  getAllCharacters: () => void;
  addCharacter: (character: CharacterRequest) => void;
  updateCharacter: (character: CharacterProps) => void;
  removeCharacter: (id: CharacterProps["id"]) => void;
  updateFighter: (fighter: CharacterProps) => void;
};

const AppContext = React.createContext<AppContextType>({
  characters: [],
  fighters: [],
  setFighters: () => {
    // initially empty
  },
  getAllCharacters: () => {
    // initially empty
  },
  addCharacter: () => {
    // initially empty
  },
  updateCharacter: () => {
    // initially empty
  },
  removeCharacter: () => {
    // initially empty
  },
  updateFighter: () => {
    // initially empty
  },
});

export const AppProvider: React.FunctionComponent = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [fighters, setFighters] = useState<CharacterProps[]>([]);
  const getAllCharacters = useCallback(async () => {
    fetch("/characters/all")
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        data = data.map(
          ({ id, name, rank, skill_pts, ...stats }: CharacterResponse) => {
            return {
              id,
              name,
              rank,
              skill_pts,
              health: {
                value: stats.health,
                max_value: stats.max_health,
                type: StatType.health,
              },
              attack: { value: stats.attack, type: StatType.attack },
              defense: { value: stats.defense, type: StatType.defense },
              magik: { value: stats.magik, type: StatType.magik },
              available: true,
              lastFight: DateTime.now(),
            };
          }
        );
        setCharacters(data);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the characters list: ${error}`
        )
      );
  }, []);
  const addCharacter = useCallback(
    ({ name, ...character }: CharacterRequest) => {
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
        .then(() => getAllCharacters())
        .catch((error) =>
          console.error(`There was an error creating the character: ${error}`)
        );
    },
    [getAllCharacters]
  );
  const updateCharacter = useCallback(
    (character: CharacterProps) => {
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...character,
          health: character.health.value,
          max_health: character.health.max_value,
          attack: character.attack.value,
          defense: character.defense.value,
          magik: character.magik.value,
        }),
      };
      fetch("/characters/update", settings)
        .then(() => getAllCharacters())
        .catch((error) =>
          console.error(`There was an error updating the character: ${error}`)
        );
    },
    [getAllCharacters]
  );
  const removeCharacter = useCallback(
    (id: CharacterProps["id"]) => {
      const settings = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      };
      fetch("/characters/delete", settings)
        .then(() => getAllCharacters())
        .catch((error) =>
          console.error(`There was an error removing the character: ${error}`)
        );
    },
    [getAllCharacters]
  );
  const updateFighter = useCallback(
    (character: CharacterProps) => {
      const newFighters = [...fighters];
      const id = fighters.findIndex((fighter) => fighter.id === character.id);

      newFighters[id] = character;
      setFighters(newFighters);
    },
    [fighters]
  );

  useEffect(() => {
    getAllCharacters();
  }, [getAllCharacters]);

  const MemoValue = useMemo(
    () => ({
      characters,
      fighters,
      setFighters,
      getAllCharacters,
      addCharacter,
      updateCharacter,
      removeCharacter,
      updateFighter,
    }),
    [
      characters,
      fighters,
      setFighters,
      getAllCharacters,
      addCharacter,
      updateCharacter,
      removeCharacter,
      updateFighter,
    ]
  );

  return (
    <AppContext.Provider value={MemoValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
