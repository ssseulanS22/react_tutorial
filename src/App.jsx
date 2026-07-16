import { useState } from "react";
import "./App.css";
import MainView from "./components/MainView";
import HistoryView from "./components/HistoryView";

const VIEWS = {
  main: MainView,
  history: HistoryView,
};

function App() {
  const [view, setView] = useState("history");
  const CurrentView = VIEWS[view];
  return (
    <div className="container">
      <CurrentView setView={setView} />
    </div>
  );
}

export default App;
