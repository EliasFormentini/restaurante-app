import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "./theme/CreateTheme";
import NavBar from "./components/NavBar";
import { useEffect } from "react";

// Components
import GetProdutos from "./components/GetProdutos";
import CreateProduto from "./components/CreateProduto";
import UpdateProduto from "./components/UpdateProduto";
import DeleteProduto from "./components/DeleteProduto";
import GetPedidos from "./components/GetPedidos";
import CreatePedido from "./components/CreatePedido";
import GetOneProduto from "./hooks/GetOneProduto";
import Home from "./components/Home";
import Login from "./components/Login";

function AppWrapper() {
  const location = useLocation();

  // Verifica se a rota atual é /login
  const hideNavBar = location.pathname === "/login";

  return (
    <div className="bg-gray-100 min-h-screen">
      <ThemeProvider theme={DefaultTheme}>
        {!hideNavBar && (
          <AppBar color="primary" position="static" className="bg-green-500 shadow-md">
            <Toolbar className="flex justify-between items-center">
              <Typography variant="h4" color="inherit" className="text-white font-bold">
                Mandarito Cozinha
              </Typography>
              <NavBar />
            </Toolbar>
          </AppBar>
        )}
      </ThemeProvider>

      <div className="p-8">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/getProdutos" Component={GetProdutos} />
          <Route path="/createProduto" Component={CreateProduto} />
          <Route path="/updateProduto/:id" Component={UpdateProduto} />
          <Route path="/deleteProduto/:id" Component={DeleteProduto} />
          <Route path="/produtos/:id" Component={GetOneProduto} />
          <Route path="/getPedidos" Component={GetPedidos} />
          <Route path="/createPedido" Component={CreatePedido} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
