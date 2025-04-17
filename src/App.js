
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Detalles from './components/Detalles.js';
import Barra from './components/Barra.js';
import Compra from './components/Compra.js';

function App() {
  return (
    <BrowserRouter>
        <Barra />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/detalles" element={<Detalles />} />
          <Route path="/compra" element={<Compra />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
