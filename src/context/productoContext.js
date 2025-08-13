// Importa funciones necesarias de React
import { createContext, useState } from "react";

// Crea el contexto que se usará para compartir el producto seleccionado
export const productoContext = createContext();

/**
 * Componente ProductoProvider
 * Proporciona el producto actualmente seleccionado a toda la aplicación.
 */
export function ProductoProvider({ children }) {
  // Estado local para guardar el producto que se está visualizando en detalle
  const [productoEnContext, setProducto] = useState(null);

  /**
   * Proporciona el producto y su actualizador a todos los componentes hijos
   */
  return (
    <productoContext.Provider value={{ productoEnContext, setProducto }}>
      {children}
    </productoContext.Provider>
  );
}