
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Detalles from './components/Detalles.js';
import Barra from './components/Barra.js';
import Compra from './components/Compra.js';
import RutaProtegida from './components/RutaProtegida.js';
import { AuthProvider } from './context/AuthContext.js';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Barra />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/detalles" element={<Detalles />} />
            <Route path="/compra" element={<RutaProtegida><Compra /></RutaProtegida>} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
