import React from "react";
import "./App.css";
import {
  AppProvider as AppContextProvider,
  useAppContext,
} from "./app/AppContext";
import Character from "./components/Character";
import Header from "./components/Header";
import Lobby from "./components/Lobby";

function App() {
  const context = useAppContext();

  return (
    <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
      <Header />
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
