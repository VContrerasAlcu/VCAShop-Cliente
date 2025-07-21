import * as React from "react";
import { useEffect, useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { CarroContext } from "../context/CarroContext.js";
import { ClienteContext } from "../context/ClienteContext.js";
import { CategoriaContext } from "../context/CategoriaContext.js";
import StarIcon from "@mui/icons-material/Star";
import ToysIcon from "@mui/icons-material/Toys";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import "@fontsource/inter";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const { carro, setCarro } = useContext(CarroContext);
  const { cliente, setCliente } = useContext(ClienteContext);
  const { setCategoriaSeleccionada } = useContext(CategoriaContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [menuLateralAnchorEl, setMenuLateralAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMenuLateralOpen = Boolean(menuLateralAnchorEl);

  useEffect(() => {
    const clienteGuardado = sessionStorage.getItem("cliente");
    if (clienteGuardado) {
      try {
        const clienteParse = JSON.parse(clienteGuardado);
        setCliente(clienteParse);
      } catch (e) {
        console.warn("Cliente guardado malformado:", clienteGuardado);
      }
    }
  }, []);

  useEffect(() => {
    if (carro) {
      console.log("Barra re-renderizada. Productos en carro:", carro.length);
    }
  }, [carro]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuLateralOpen = (event) => {
    setMenuLateralAnchorEl(event.currentTarget);
  };

  const handleMenuLateralClose = () => {
    setMenuLateralAnchorEl(null);
  };

  const handleLogout = () => {
    setCliente(null);
    setCarro(null);
    sessionStorage.removeItem("carro");
    sessionStorage.removeItem("cliente");
    handleMenuClose();
  };

  const categorias = ["juguetes", "ropa", "electronica", "hogar", "destacados"];

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {cliente ? (
        <>
          <MenuItem component={Link} to="/datosCliente" onClick={handleMenuClose}>
            Mi cuenta
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </>
      ) : (
        <MenuItem component={Link} to="/validacion" onClick={handleMenuClose}>
          Entrar
        </MenuItem>
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" color="inherit" component={Link} to="/carro">
          <Badge badgeContent={carro ? carro.length : 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carro</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="cuenta de usuario"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );



  const renderMenuLateral = (
    <Menu
      anchorEl={menuLateralAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuLateralOpen}
      onClose={handleMenuLateralClose}
      keepMounted
    >
      {/* Juguetes */}
      <MenuItem
        onClick={() => {
          setCategoriaSeleccionada("juguetes");
          handleMenuLateralClose();
        }}
      >
        <ToysIcon sx={{ mr: 1 }} />
        Juguetes
      </MenuItem>

      {/* Ropa */}
      <MenuItem
        onClick={() => {
          setCategoriaSeleccionada("ropa");
          handleMenuLateralClose();
        }}
      >
        <CheckroomIcon sx={{ mr: 1 }} />
        Ropa
      </MenuItem>

      {/* Electrónica */}
      <MenuItem
        onClick={() => {
          setCategoriaSeleccionada("electronica");
          handleMenuLateralClose();
        }}
      >
        <DevicesIcon sx={{ mr: 1 }} />
        Electrónica
      </MenuItem>

      {/* Hogar */}
      <MenuItem
        onClick={() => {
          setCategoriaSeleccionada("hogar");
          handleMenuLateralClose();
        }}
      >
        <HomeIcon sx={{ mr: 1 }} />
        Hogar
      </MenuItem>

      {/* Destacados con estilo especial */}
      <MenuItem
        onClick={() => {
          setCategoriaSeleccionada("destacados");
          handleMenuLateralClose();
        }}
        sx={{
          bgcolor: "warning.main",
          color: "white",
          fontWeight: "bold",
          "&:hover": {
            bgcolor: "warning.dark",
          },
        }}
      >
        <StarIcon sx={{ mr: 1, color: "white" }} />
        Destacados
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="categorías"
            onClick={handleMenuLateralOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton component={Link} to="/" sx={{ p: 0 }}>
            <img
              src="/images/logoTransp.png"
              alt="Logo"
              style={{ height: "90px", cursor: "pointer" }}
            />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "buscar" }}
            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit" component={Link} to="/carro">
              <Badge badgeContent={carro ? carro.length : 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="cuenta de usuario"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="mostrar más"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}
      {renderMenuLateral}
      <Box sx={{ bgcolor: "#8B5E3C", px: 2, py: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 , fontFamily: "Inter, sans-serif",}}>
            {["Juguetes", "Ropa", "Electrónica", "Hogar", "Destacados"].map((cat) => (
              <Typography
                key={cat}
                variant="body2"
                onClick={() => { 
                                const nomCat = cat === "Electrónica" ? "Electronica" : cat;
                                setCategoriaSeleccionada(nomCat.toLowerCase());
                              }}
                sx={{
                  cursor: "pointer",
                  textTransform: "uppercase",
                  fontWeight: cat === "Destacados" ? "bold" : "normal",
                  color: cat === "Destacados" ? "warning.main" : "text.primary",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {cat}
              </Typography>
            ))}
          </Box>
      </Box>
    </Box>
  );
}