import { useState } from "react";
import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
