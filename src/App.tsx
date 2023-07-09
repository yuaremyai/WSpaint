import { useState } from "react";
import "./styles/app.scss";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import Settingbar from "./components/Settingbar";



function App() {

  return (
    <div className="App">
      <Toolbar />
      <Settingbar />
      <Canvas />  
    </div>
  );
}


export default App;
