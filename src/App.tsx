import React from "react";
import "./App.css";
import {
  AppProvider as AppContextProvider,
  useAppContext,
} from "./app/AppContext";
import Character from "./components/Character";
import { GradientText } from "./components/GradientText";
import Lobby from "./components/Lobby";

function App() {
  const context = useAppContext();

  return (
    <div className="App">
      <GradientText text="Bonjour" />

      {context.fighters.length === 2 ? (
        <Lobby attacker={context.fighters[0]} opponent={context.fighters[1]} />
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
