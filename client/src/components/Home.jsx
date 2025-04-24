import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "teste7",
  },
  {
    img: "https://img.cybercook.com.br/receitas/313/foccacia-com-tomate-e-mussarela-1.jpeg",
    title: "teste6",
  },
  {
    img: "https://static.itdg.com.br/images/360-240/c850a535e8de2a4793622a50a858a6d3/shutterstock-1488059969.jpg",
    title: "teste5",
  },
  {
    img: "https://www.sabornamesa.com.br/media/k2/items/cache/8097da6161421504ad99a7e5f09e9e69_XL.jpg",
    title: "teste4",
  },
  {
    img: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/01/comidas-da-regiao-do-nordeste-moqueca-maranhense.jpg?w=750",
    title: "teste3",
  },
  {
    img: "https://foodandroad.com/wp-content/uploads/2021/04/virado-paulista-brasil-1-1024x683.jpg",
    title: "teste2",
  },
  {
    img: "https://cdn.blablacar.com/wp-content/uploads/br/2024/08/13143642/bobo-camarao.webp",
    title: "teste1",
  },
  {
    img: "https://www.gastronomia.com.br/wp-content/uploads/2023/07/a-singular-comida-sertaneja.jpg",
    title: "teste",
  },
  {
    img: "https://www.receiteria.com.br/wp-content/uploads/receitas-de-comidas-faceis-de-fazer.png",
    title: "Breakfast",
  },
  {
    img: "https://assets.turismocity.com/cdn-cgi/image/format=auto,width=500,fit=scale-down/img/1718907363177_brigadeiro-comida-tipica-brasileira.jpg",
    title: "Breakfast",
  },
  {
    img: "https://brazilvip.com.br/wp-content/uploads/2018/10/churrasco.png",
    title: "Breakfast",
  },
  {
    img: "https://jpimg.com.br/uploads/2022/12/7-comidas-tipicas-brasileiras-para-experimentar-pelo-pais.jpg",
    title: "Breakfast",
  },
  {
    img: "https://www.revistabula.com/wp/wp-content/uploads/2019/06/coxinha.jpg",
    title: "Breakfast",
  },
  {
    img: "https://www.penaestrada.blog.br/wp-content/uploads/2021/02/comidas-tipicas-do-brasil-cuscuz-nordestino.jpg.webp",
    title: "Breakfast",
  },
  {
    img: "https://www.penaestrada.blog.br/wp-content/uploads/2020/12/IMG_9595.jpg",
    title: "Breakfast",
  },
  {
    img: "https://cdn.deliway.com.br/blog/base/168/082/929/705-485-comidas-tipicas-brasil.jpg",
    title: "Breakfast",
  },
  {
    img: "https://quetzalli.com.br/cdn/shop/articles/comidas-tipicas-mexico-capa.jpg?v=1727961981",
    title: "Breakfast",
  },
  {
    img: "https://brazilvip.com.br/wp-content/uploads/2018/10/churrasco.png",
    title: "Breakfast",
  },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start oklch(86.9% 0.022 252.894) ">
      <div className="w-full max-w-6xl text-center mb-2">
      <h1 className="text-4xl font-bold text-[#2b3e3b] mb-5 mt-5">
          Mandarito Cozinha
        </h1>
        <p className="text-lg text-gray-700 mb-10 px-2 sm:px-12">
          Sabores artesanais inspirados na tradição italiana. No Mandarito
          Cozinha, cada prato é feito com carinho, ingredientes frescos e um
          toque especial da nossa chef.
        </p>
      </div>
      <div>
      <ImageList sx={{ width: 800, height: 600, bgcolor: 'white', p: 0, m: 0 }} cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </div>
  );
}

export default Home;
