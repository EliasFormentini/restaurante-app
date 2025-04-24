import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Home, Add, ShoppingBagOutlined } from "@mui/icons-material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LoupeIcon from '@mui/icons-material/Loupe';
import "../css/NavLinkStyle.css";

function NavBar() {
  return (
    <List component="div">
      <ListItem component="div">
        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/"} className="nav-link">
              <Home />
              Home
            </NavLink>
          </Typography>
        </ListItemText>
        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/getProdutos"} className="nav-link">
              <DinnerDiningIcon />
              Produtos
            </NavLink>
          </Typography>
        </ListItemText>
        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/createProduto"} className="nav-link">
              <LoupeIcon />
              Novo Produto
            </NavLink>
          </Typography>
        </ListItemText>
        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/getPedidos"} className="nav-link">
              <ShoppingBagOutlined />
              Pedidos
            </NavLink>
          </Typography>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default NavBar;

