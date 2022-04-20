import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <Login setLoggedIn={setLoggedIn} />;
  return (
    <div className="App">
      <iframe
        className="airtable-embed"
        src="https://airtable.com/embed/shr0jePRJhCAr11to?backgroundColor=orange&layout=card"
        frameBorder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  );
}

export default App;
