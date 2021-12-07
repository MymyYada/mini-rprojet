import React, { useState } from "react";
import "./App.css";
import { AppProvider as AppContextProvider } from "./app/AppContext";
import Character from "./components/Character";
import { CharacterProps } from "./components/Character/types";
import { GradientText } from "./components/GradientText";
import Lobby from "./components/Lobby";
import logo from "./logo.svg";

function App() {
  const [attacker, setAttacker] = useState<CharacterProps>();
  const attackerCallback = (character: CharacterProps) => {
    setAttacker(character);
  };

  return (
    <AppContextProvider>
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

        <GradientText text="Bonjour" />
        {!attacker ? (
          <Character attackerCallback={attackerCallback} />
        ) : (
          <Lobby attacker={attacker} />
        )}
      </div>
    </AppContextProvider>
  );
}

export default App;
