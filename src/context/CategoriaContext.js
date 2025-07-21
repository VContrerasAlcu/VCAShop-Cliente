import { createContext, useState } from "react";

export const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  return (
    <CategoriaContext.Provider value={{ categoriaSeleccionada, setCategoriaSeleccionada }}>
      {children}
    </CategoriaContext.Provider>
  );
};