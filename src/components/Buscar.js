import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productosContext } from "../context/productosContext.js";
import ProductoMin from "./ProductoMin.js";
import { Box, Typography } from "@mui/material";
import { CategoriaContext } from "../context/CategoriaContext.js";
import BuscadorAutocompleto from "./BuscadorAutocompleto.js"; // 👈 Asegúrate de la ruta correcta

const Buscar = () => {
  const { productos } = useContext(productosContext);
  const { setCategoriaSeleccionada } = useContext(CategoriaContext);
  const [searchParams] = useSearchParams();
  const texto = searchParams.get("texto")?.toLowerCase() || "";

  const resultados = productos.filter((p) =>
    `${p.nombre} ${p.descripcion}`.toLowerCase().includes(texto)
  );

  useEffect(() => {
    setCategoriaSeleccionada(null); // ✅ Evita filtros por categoría al buscar
  }, []);

  return (
    <Box sx={{ p: 3 }}>
     

      <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
        Resultados para "{texto}"
      </Typography>

      {resultados.length === 0 ? (
        <Typography>No se encontraron productos.</Typography>
      ) : (
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