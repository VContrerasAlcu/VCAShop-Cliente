import React, { useState } from "react";
import { useMediaQuery, IconButton, Dialog, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import BuscadorAutocompleto from "./BuscadorAutocompleto.js";

export default function BuscadorResponsivo() {
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down("sm"));
  const [abierto, setAbierto] = useState(false);

  const abrirBuscador = () => setAbierto(true);
  const cerrarBuscador = () => setAbierto(false);

  return (
    <>
      {esMovil ? (
        <>
          <IconButton onClick={abrirBuscador} color="inherit">
            <SearchIcon />
          </IconButton>

          <Dialog open={abierto} onClose={cerrarBuscador} fullWidth>
            <Box sx={{ p: 2 }}>
              <BuscadorAutocompleto />
            </Box>
          </Dialog>
        </>
      ) : (
        <Box sx={{ width: 300 }}>
          <BuscadorAutocompleto />
        </Box>
      )}
    </>
  );
}