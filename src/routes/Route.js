
//ARQUIVO DE CONFIGURAÇÁO DAS ROTAS//   

import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import {AuthContext} from "../context/auth"

export default function RouteWrapper({//esta function recebe as props por objeto//Isto é um componente configurado que vai substituir o componte Route normal//
    component:
    Component,
    isPrivate,
    ...rest
}){

    //const loading = false//
    //const signed = false//

    const {signed, loading} = useContext(AuthContext)

    if(loading){
        return(
            <div>
                <h2>Carregando</h2>
            </div>
        )
    }

    if (!signed && isPrivate){
        return <Redirect to ="/"/>
    }
    if (signed && !isPrivate){
        return <Redirect to = "/dashboard"/>
    }
    return(
        <Route  render = {props=>(<Component{...props}/>)}/> //sintaxe estranha.Decorar.
    )}
        
        // O render é um método do react-router
                                                             
        /*component é a chave do objeto props que será chamado em
        <RouterWrapper/>("routes/index.js")*/
                                                            
        /*Component(c maiusculo) é a prop que dá nome ao componente
        q funcionará dentro de {Route} em <RouterWrapper/>("routes/index.js")
        por debaixo dos panos*/ 
                                                          
        /*isPrivate é a prop que funcionará como parametro nas condiçoes
        e q será chamada em RouterWrapper("routes/index.js")*/

  

 