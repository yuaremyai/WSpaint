import "react";
import "./styles/app.scss";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import Settingbar from "./components/Settingbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



function App() {

  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/:id' element={<><Toolbar/><Settingbar/><Canvas/></>} />
            <Route path='/' element={<><Toolbar/><Settingbar/><Canvas/><Navigate to={`/f${Date.now().toString(16)}`} replace/></>} />
          </Routes>  
        </div>
      </BrowserRouter>
  );
}


export default App;
