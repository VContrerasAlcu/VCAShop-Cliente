
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/Home.js';
import Detalles from './components/Detalles.js';
import Barra from './components/Barra.js';
import Compra from './components/Compra.js';
import RutaProtegida from './components/RutaProtegida.js';
import { AuthProvider } from './context/AuthContext.js';
import Validacion from './components/Validacion.js';
import { ProductoProvider } from './context/productoContext.js';
import Registro from './components/Registro.js';
import RegistroOk from './components/RegistroOk.js';


function App() {
  return (
    <AuthProvider>
      <ProductoProvider>
        <BrowserRouter>
            <Barra />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/detalles" element={<Detalles />} />
              <Route path="/compra" element={<RutaProtegida><Compra /></RutaProtegida>} />
              <Route path="/validacion" element={<Validacion />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/registroOk" element={<RegistroOk />} />
            </Routes>
        </BrowserRouter>
      </ProductoProvider>
    </AuthProvider>
  );
}

export default App;
