import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <Login logIn={() => setLoggedIn(true)} />;
  return (
    <div className="App">
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/shrqmMY9qYnhO1aAc?backgroundColor=orange&viewControls=on"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default App;
