import { ErrorMessage, Field, Form, Formik } from "formik"
import * as Yup from "yup"
import client from "../api/Api"
import { Typography } from "@mui/material"
import "../css/Form.css"
import { useParams } from "react-router-dom"
import GetOneProduto from "../hooks/GetOneProduto"

function UpdateProduto() {
  const { id } = useParams()
  const { produto, loading, error } = GetOneProduto(id)

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  
  const handleSubmit = (data) => client.put(`/produtos/${id}`, data).then(() => {
    console.log("Produto editado com sucesso: ", data);
    alert("Produto editado com sucesso! Para mais detalhes consulte o log")
    window.location.href = "http://localhost:5173/getProdutos";
  })
  
  const validationSchema = Yup.object().shape({
    nome: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
    descricao: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
    preco: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
    imagem: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
  })

  const initialValues = {
    nome: produto.nome,
    descricao: produto.descricao,
    preco: produto.preco,
    imagem: produto.imagem 
  }
  
  
  return (
    <div className="form-area">
      <div className="form">
        <Typography variant="h4">
          Formulário de Edição de Produto
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, resetForm }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="nome">Nome: </label>
                <Field name="nome" id="nome" type="text" className={'form-control' + (errors.nome && touched.nome ? 'is-invalid' : '')} />
                <ErrorMessage name="nome" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="descricao">Descrição: </label>
                <Field name="descricao" id="descricao" type="text" className={'form-control' + (errors.descricao && touched.descricao ? 'is-invalid' : '')} />
                <ErrorMessage name="descricao" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="preco">Preço: </label>
                <Field name="preco" id="preco" type="text" className={'form-control' + (errors.preco && touched.preco ? 'is-invalid' : '')} />
                <ErrorMessage name="preco" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="imagem">Imagem URL: </label>
                <Field name="imagem" id="imagem" type="text" className={'form-control' + (errors.imagem && touched.imagem ? 'is-invalid' : '')} />
                <ErrorMessage name="imagem" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group flex justify-center">
                <button className="py-[7px] px-[15px] hover:bg-red-500 hover:text-white" type="submit">Enviar</button>
                <button className="py-[7px] px-[15px] hover:bg-red-500 hover:text-white" type="button" onClick={resetForm}>Limpar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UpdateProduto;

