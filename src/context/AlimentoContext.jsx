/* eslint-disable react/prop-types */
import { createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import { createAlimentoRequest, getAlimentosRequest, 
    deleteAlimentoRequest, getAlimentoRequest, updateAlimentoRequest} from "../api/alimentos";

const AlimentoContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useAlimento = ()=>{
    const context = useContext(AlimentoContext);

    if(!context){
        throw new Error('UseAlimento debe estar definifo en un contexto ');
    }
    return context;
}

export function AlimentoProvider({children}){
    const [alimentos,  setAlimentos] = useState([]);

    const createAlimento = async (alimentos)=>{
        try {
            await createAlimentoRequest(alimentos);
            getAlimentos();
        } catch (error) {
            console.log(error);
        }
       
        
    }
    const getAlimentos = async ()=>{
        try {
            const res = await getAlimentosRequest();
            setAlimentos(res.data);
            
        } catch (error) {
            console.log(error);
        }
           
    }
    // funcion para eliminar un producto de la base de datos 
    const deleteAlimento = async (id) =>{
      try {
        const res = await deleteAlimentoRequest(id);
             // console.log(res.data);
             if(res.status === 200)
                setAlimentos(alimentos.filter(alimentos => alimentos._id != id));
      } catch (error) {
        console.log(error)
        
      }
       
    }

    // funcion para obtener un producto por id de la base de datos 
    const getAlimento = async(id)=>{
        try {
            const res = await getAlimentoRequest(id)
           // console.log(res);
           return res.data
        } catch (error) {
            console.log(error)
        }
    }


    const updateAlimento = async (id, alimentos)=>{
        try {
            await updateAlimentoRequest(id, alimentos);
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <AlimentoContext.Provider value={{
            alimentos,
            createAlimento,
            getAlimentos,
            deleteAlimento,
            getAlimento,
            updateAlimento
            
        }}>
            {children}
        </AlimentoContext.Provider>
    )
}

AlimentoProvider.PropTypes ={
    children:PropTypes.any
}