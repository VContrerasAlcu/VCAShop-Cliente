import { useLocation } from "react-router-dom";
import ProductoMax from "./ProductoMax.js";


function Detalles() {
  const location = useLocation();
  const { producto } = location.state || {};

  return (
      <ProductoMax producto = {producto} />
  );
}

export default Detalles;