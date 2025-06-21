import { List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Add, ShoppingBagOutlined } from "@mui/icons-material";
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LoupeIcon from '@mui/icons-material/Loupe';
import "../css/NavLinkStyle.css";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <List component="div" className="flex items-center">
      <ListItem component="div">
        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/"} className="nav-link">
              <Home /> Home
            </NavLink>
          </Typography>
        </ListItemText>

        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/getProdutos"} className="nav-link">
              <DinnerDiningIcon /> Produtos
            </NavLink>
          </Typography>
        </ListItemText>

        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/createProduto"} className="nav-link">
              <LoupeIcon /> Novo Produto
            </NavLink>
          </Typography>
        </ListItemText>

        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/getPedidos"} className="nav-link">
              <ShoppingBagOutlined /> Pedidos
            </NavLink>
          </Typography>
        </ListItemText>
      </ListItem>

      {user?.role === 'admin' && (
        <ListItemText inset>
          <Typography color="inherit" variant="h6">
            <NavLink to={"/getUsers"} className="nav-link">
              Gerenciar Usuários
            </NavLink>
          </Typography>
        </ListItemText>
      )}

      {user ? (
        <div className="flex items-center gap-4 ml-4">
          <Typography color="inherit" className="text-sm">
            Bem-vindo: {user.nome || user.email}
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={handleLogout}
          >
            Sair
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      )}

    </List>
  );
}

export default NavBar;
