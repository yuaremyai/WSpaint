import { useEffect, useRef, useState } from "react";
import "./App.css";



function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect( () => {
    if (canvasRef.current) {
      canvasRef.current.getContext("2d")
    }
  }, [])

  return (
    <div className="App">
      <canvas ref={canvasRef} className="canvas" width={'600px'} height={'400px'}></canvas>
    </div>
  );
}


export default App;
