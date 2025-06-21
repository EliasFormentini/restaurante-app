import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "./theme/CreateTheme";
import NavBar from "./components/NavBar";

//Components
import GetProdutos from "./components/GetProdutos";
import CreateProduto from "./components/CreateProduto";
import UpdateProduto from "./components/UpdateProduto";
import DeleteProduto from "./components/DeleteProduto";
import GetPedidos from "./components/GetPedidos";
import CreatePedido from "./components/CreatePedido";
import GetOneProduto from "./hooks/GetOneProduto";
import Home from "./components/Home";
import Login from "./components/Login";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen">
        <ThemeProvider theme={DefaultTheme}>
          <AppBar color="primary" position="static" className="bg-green-500 shadow-md">
            <Toolbar className="flex justify-between items-center">
              <Typography variant="h4" color="inherit" className="text-white font-bold">
                Mandarito Cozinha
              </Typography>
              <NavBar />
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <div className="p-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/getProdutos"
              element={
                <PrivateRoute>
                  <GetProdutos />
                </PrivateRoute>
              }
            />
            <Route
              path="/createProduto"
              element={
                <PrivateRoute>
                  <CreateProduto />
                </PrivateRoute>
              }
            />
            <Route
              path="/updateProduto/:id"
              element={
                <PrivateRoute>
                  <UpdateProduto />
                </PrivateRoute>
              }
            />
            <Route
              path="/deleteProduto/:id"
              element={
                <PrivateRoute>
                  <DeleteProduto />
                </PrivateRoute>
              }
            />
            <Route
              path="/produtos/:id"
              element={
                <PrivateRoute>
                  <GetOneProduto />
                </PrivateRoute>
              }
            />
            <Route
              path="/getPedidos"
              element={
                <PrivateRoute>
                  <GetPedidos />
                </PrivateRoute>
              }
            />
            <Route
              path="/createPedido"
              element={
                <PrivateRoute>
                  <CreatePedido />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
