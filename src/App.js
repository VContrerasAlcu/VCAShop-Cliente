
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Detalles from './components/Home.js';
import Barra from './components/Barra.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Barra />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/detalles" element={<Detalles />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
