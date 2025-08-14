import React, { useContext, useEffect } from "react";

// Hook para acceder a los parámetros de la URL
import { useSearchParams } from "react-router-dom";

// Contexto global de productos
import { productosContext } from "../context/productosContext.js";

// Componente que muestra un producto en formato reducido
import ProductoMin from "./ProductoMin.js";

// Componentes de Material UI
import { Box, Typography } from "@mui/material";

// Contexto global de categoría (para desactivar filtros al buscar)
import { CategoriaContext } from "../context/CategoriaContext.js";

// Buscador reutilizable (no se usa directamente aquí, pero está importado)
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";

/**
 * Componente Buscar
 * Muestra los productos que coinciden con el texto de búsqueda.
 */
const Buscar = () => {
  // Accede a la lista de productos desde el contexto
  const { productos } = useContext(productosContext);

  // Permite modificar la categoría seleccionada
  const { setCategoriaSeleccionada } = useContext(CategoriaContext);

  // Hook para leer parámetros de la URL
  const [searchParams] = useSearchParams();

  // Extrae el texto de búsqueda y lo normaliza
  const texto = searchParams.get("texto")?.toLowerCase() || "";

  // Filtra los productos que contienen el texto en nombre o descripción
  const resultados = productos.filter((p) =>
    `${p.nombre} ${p.descripcion}`.toLowerCase().includes(texto)
  );

  // Al montar el componente, desactiva cualquier filtro por categoría
  useEffect(() => {
    setCategoriaSeleccionada(null);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Título con el texto buscado */}
      <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
        Resultados para "{texto}"
      </Typography>

      {/* Si no hay resultados, muestra mensaje */}
      {resultados.length === 0 ? (
        <Typography>No se encontraron productos.</Typography>
      ) : (
        // Si hay resultados, los muestra en una lista con estilo flexible
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            listStyle: "none",
            padding: 0,
          }}
        >
          {resultados.map((producto) => (
            <li key={producto.id}>
              <ProductoMin producto={producto} />
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Buscar;