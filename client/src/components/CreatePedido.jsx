import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import client from "../api/Api";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const CreatePedido = () => {
  let location = useLocation();
  const produtos = location.state.produtos;
  const quantidade = location.state.quantidade;

  if (produtos.length === 0) {
    return (
      <div className="text-center text-red-600 font-semibold">
        Sacola de produtos vazia
      </div>
    );
  }

  const handleSubmit = (data) => client.post("/pedidos", data).then(() => {
    console.log("Pedido criado com sucesso: ", data);
    console.log(data)
    alert("Pedido criado com sucesso! Para mais detalhes consulte o log");
    window.location.href = "http://localhost:5173/getPedidos";
  });

  const validationSchema = Yup.object().shape({
    endereco: Yup.string("Este campo deve ser preenchido com texto").required("Este campo é obrigatório"),
  });

  const initialValues = {
    endereco: "",
    produtos: produtos,
    qtd_items: quantidade
    
  };
  console.log(produtos)

  return (
    <div className="flex justify-center  bg-gray-100 p-1">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h4" className="color-[#2b3e3b] font-semibold text-center mb-6">
          Informe seu endereço para entrega:
        </Typography>
        
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, resetForm }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="endereco" className="form-control">Endereço:</label>
                <Field
                  name="endereco"
                  id="endereco"
                  type="text"
                  className={`form-control ${errors.endereco && touched.endereco ? 'border-red-500' : 'border-gray-300'}`}
                />
                <ErrorMessage name="endereco" component="div" className="invalid-feedback" />
              </div>

              <div className="form-group flex justify-center">
                <button
                  className="py-2 m-4 px-6 bg-[#2b3e3b] text-white font-semibold rounded-lg hover:color transition"
                  type="submit"
                >
                  Enviar
                </button>
                <button
                  className="py-2 m-4 px-6 bg-[#604b35] text-white font-semibold rounded-lg hover:bg-[#654e37] transition"
                  type="button"
                  onClick={resetForm}
                >
                  Limpar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatePedido;
