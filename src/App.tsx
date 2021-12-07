import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import "./App.css";
import Character from "./components/Character";
import {
  CharacterProps,
  CharacterRequest,
  CharacterResponse,
  StatType,
} from "./components/Character/types";
import { GradientText } from "./components/GradientText";
import Lobby from "./components/Lobby";
import logo from "./logo.svg";

const AppContext = React.createContext({});

function App() {
  const [characters, setCharacters] = useState([]);
  const getAllCharacters = async () => {
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
        console.log(data);
        setCharacters(data);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the characters list: ${error}`
        )
      );
  };
  const addCharacter = ({ name, ...character }: CharacterRequest) => {
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
      .then((res) => {
        console.log(res);
        getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error creating the character: ${error}`)
      );
  };
  const updateCharacter = (character: CharacterProps) => {
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
      .then((res) => {
        console.log(res);
        getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error updating the character: ${error}`)
      );
  };
  const removeCharacter = (id: CharacterProps["id"]) => {
    const settings = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    };
    fetch("/characters/delete", settings)
      .then((res) => {
        console.log(res);
        getAllCharacters();
      })
      .catch((error) =>
        console.error(`There was an error removing the character: ${error}`)
      );
  };

  useEffect(() => {
    getAllCharacters();
  }, []);

  const [attacker, setAttacker] = useState<CharacterProps>();
  const attackerCallback = (character: CharacterProps) => {
    setAttacker(character);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <AppContext.Provider value={{ characters, setCharacters }}>
        <GradientText text="Bonjour" />
        {!attacker ? (
          <Character
            characters={characters}
            addCharacter={addCharacter}
            updateCharacter={updateCharacter}
            removeCharacter={removeCharacter}
            attackerCallback={attackerCallback}
          />
        ) : (
          <Lobby characters={characters} attacker={attacker} />
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
