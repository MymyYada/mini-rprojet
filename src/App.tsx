import React from "react";
import "./App.css";
import {
  AppProvider as AppContextProvider,
  useAppContext,
} from "./app/AppContext";
import Character from "./components/Character";
import { GradientText } from "./components/GradientText";
import Lobby from "./components/Lobby";
import logo from "./logo.svg";

function App() {
  const context = useAppContext();

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

      <GradientText text="Bonjour" />

      {context.attacker && context.opponent ? (
        <Lobby attacker={context.attacker} opponent={context.opponent} />
      ) : (
        <Character />
      )}
    </div>
  );
}

function AppWithContext() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default AppWithContext;
