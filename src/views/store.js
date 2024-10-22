
//---------------STORE-----------

import { setProductoActivo } from "../../main";
import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { openModal } from "./modal";

//funcion que se encarga de traer los elementos y llamar al render del main
export const handleGetProductsToStore =()=>{
    const products= handleGetProductLocalStorage();
    handleRenderList(products);

};

//se encarga de filtrar y de renderizar la seccion con todos sus respectivos elementos
export const handleRenderList =(productosIn) =>{
   
    //Filtradod e arrays por categoria
    const burgers = productosIn.filter((el)=>el.categories==="Hamburguesas");
    const papas = productosIn.filter((el)=>el.categories==="Papas");
    const gaseosas = productosIn.filter((el)=>el.categories==="Gaseosas");

    //funcion que renderiza los elementos de la seccion
    const renderProductGroup=(productos, title)=>{
        
        if(productos.length>0){
            const productosHTML =productos.map((producto,index)=>{
                return`<div class='containerTargetItem' id='product-${producto.categories}-${index}'>
                <div>
                <img src='${producto.imagen}'/>
                <div>
                <h2>${producto.nombre}</h2>
                </div>
                <div class='targetProps'>
                <p><b>Precio:</b> $${producto.precio}</p>
                </div>
                </div>
                </div>`
            });
            //retorna la seccion con todos los elementos dentro
            return `
            <section class='sectionStore'>
            <div class='containerTitleSection'><h3>${title}</h3></div>
            <div class='containerProductStore'>${productosHTML.join("")}</div>
            </section>
            `;
        

            /*EL JOIN: SI RECIBO [1,2,3,4] join("") => recibo 1234  */
        }else{
            return ""
        }
    };

    //renderizar cada uno de los productos dentro de su categoria, porque no sabemos cuantos son los productos que vamos a crear
    const appContainer =document.getElementById("storeContainer");
    appContainer.innerHTML=`
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    
    `
   

//añaden los eventos de manera dinamica
const addEvents =(productsIn)=>{
    if(productsIn){
        productsIn.forEach((element , index)=> {
            const productContainer = document.getElementById(`product-${element.categories}-${index}`);
            productContainer.addEventListener("click", ()=>{
                setProductoActivo(element);
                openModal();
            });
        });
    }
};
addEvents(burgers);
addEvents(papas);
addEvents(gaseosas);

};
 