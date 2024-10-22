import { categoriaActiva } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

//--------------CATEGORIA---------

//Esta funcion se encarga de filtrar la categoria activa
const handleFilterProductByCategory=(categoryIn)=>{
    const products = handleGetProductLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products)
            break;
        case "Todo":
            handleRenderList(products)
            break;
        case "Hamburguesas":
        case"Papas":
        case"Gaseosas":
        const result=products.filter((el)=>el.categories===categoryIn)
            handleRenderList(result);
        default:
            break;
        case "mayorPrecio":
        const resultPrecioMayor= products.sort((a,b)=>b.precio -a.precio);
        handleRenderList(resultPrecioMayor);
            break;
        case "menorPrecio":
            const resultPrecioMenor= products.sort((a,b)=>a.precio -b.precio);
            handleRenderList(resultPrecioMenor);
            break;
    }
}

//Render de la vista categorias
export const renderCategories =()=>{

    //tomamos elemento de la lista, es decir, el HTML
    const ulList = document.getElementById("listFilter");
    //creamos esos elementos dentro de la lista
    ulList.innerHTML = `
    <li id="Todo">Todos los Productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Gaseosas">Gaseosas</li>
    <li id="mayorPrecio">Mayor Precio</li>
    <li id="menorPrecio">Menor Precio</li>
    `

    //añadimos dinamicamente el evento click
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement)=>{
        liElement.addEventListener('click',()=>{
            console.log("click en", liElement.id)
            handleClick(liElement);
        })
    })
    //verificamos y manejamos el estili del elemento activo
    const handleClick =(elemento)=>{
        handleFilterProductByCategory(elemento.id);
        liElements.forEach((el)=>{
            if(el.classList.contains('liActive')){
                el.classList.remove('liActive')
            }else{
                if(elemento===el){
                    el.classList.add('liActive')
                    
                }
            }
        })

    }
}
