import React from "react";
import "./App.css";
import {
  AppProvider as AppContextProvider,
  useAppContext,
} from "./app/AppContext";
import CharacterList from "./components/CharacterList";
import Lobby from "./components/Lobby";
import Navbar from "./components/Navbar";

function App() {
  const context = useAppContext();

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-gray-50">
      <Navbar />
      {context.fighters.length === 2 ? (
        <Lobby attacker={context.fighters[0]} opponent={context.fighters[1]} />
      ) : (
        <CharacterList />
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
