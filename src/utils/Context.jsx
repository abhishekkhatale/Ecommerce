import axios from "./Axios";
import React, { createContext, useState,useEffect } from 'react'

export const productcontext = createContext();

export const Context = (props) => {
    const [products,setProducts]= useState(JSON.parse(localStorage.getItem("products")) || null);

    // const getProducts = async()=> {
    //     try{
    //         const {data} = await axios("/products");
    //         setProducts(data);
    //     }
    //     catch(error){
    //         console.error(error)
    //     }
    // }

    // useEffect(()=>{
    //     getProducts();
    // },[])

  return (
    <productcontext.Provider value={[products,setProducts]}>
      {props.children}
    </productcontext.Provider>
    
  )
}
