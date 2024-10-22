import { handleGetProductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

export const handelSearchProductByName =()=>{
    const inputHeader=document.getElementById("inputHeader");
    const products =handleGetProductLocalStorage();
    console.log(products);
    const result= products.filter((el)=>
       // Hamburguesa ==>hamburguesa 
        el.nombre.toLowerCase().includes(inputHeader.value));
        handleRenderList(result);
};