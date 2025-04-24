import { Grid, Card, CardContent, CardMedia, Button, Typography, CardActions, Fab } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import DefaultTheme from "../theme/CreateTheme";
import client from "../api/Api";
import { NavLink } from "react-router-dom";
import DeleteProduto from "./DeleteProduto";

const GetProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [totalProdutos, setTotalProdutos] = useState(0)

  const listProdutos = async () => {
    try {
      const res = await client.get("/produtos")
      if (res.data) {
        setProdutos(res.data.produtos)
      } else {
        setProdutos([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    listProdutos()
  }, [])
  console.log(produtos)


  return (
    <ThemeProvider theme={DefaultTheme}>
      <div style={{ marginTop: 20, padding: 30 }}>
        <div className="fixed bottom-8 right-12">
          <NavLink to={"/createPedido"} state={{ produtos: sacola, quantidade: totalProdutos }}>
            <Fab color="primary" aria-label="Sacola">
              <ShoppingBag />
            </Fab>
          </NavLink>

          <Fab color="secondary" aria-label="Quantidade" size="small" style={{ position: "absolute", left: "35px", bottom: "25px" }}>
            {totalProdutos}
          </Fab>
        </div>

        <Grid container spacing={15} justify="center">
          {produtos.map(produto => (
            <Grid item key={produto.id}>
              <Card className="max-w-[360px]">
                <>
                  <CardMedia component="img" alt={produto.nome} height="140" image={produto.imagem} title={produto.nome} className="h-[240px]" />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{produto.nome}</Typography>
                    <Typography component="p">{produto.descricao}</Typography>
                    <Typography component="p"><b>Preço: </b>R${produto.preco}</Typography>
                  </CardContent>
                </>
                <CardActions>
                  <div className="flex justify-between w-full">
                    <div>
                      <Button size="small" color="primary" variant="contained" onClick={() => {
                        let novaQuantidade = totalProdutos
                        novaQuantidade++
                        setTotalProdutos(novaQuantidade)
                        sacola.push(produto)
                      }}>
                        Adicionar
                      </Button>
                    </div>
                    <div>
                      <NavLink to={"/updateProduto/" + produto.id}>
                        <Button size="small" color="primary">Editar</Button>
                      </NavLink>
                      {/* <NavLink to={"/deleteProduto/" + produto._id}>
                        <Button size="small" color="primary">Deletar</Button>
                      </NavLink> */}
                      <DeleteProduto id={produto.id} />
                    </div>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default GetProdutos