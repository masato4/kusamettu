import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Login } from "./components/pages/Login";
import LogedIn from "./components/pages/LogedIn";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Login />
      {/* <LogedIn /> */}
    </div>
  );
}

export default App;
