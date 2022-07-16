import "./index.css"
import { FiX } from "react-icons/fi"



export default function Modal({conteudo,close}){//props
    
    
    
    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={close}>
                   <FiX size={23} color="#fff"/> 
                   Voltar
                </button>
                
                
                <div>
                    <h2>Detalhes do chamado:</h2>
                    
                    <div className="row">
                       <span>
                           Cliente:<i>{conteudo.cliente}</i> 
                       </span> 

                    </div>

                    <div className="row">
                       <span>Assunto:<i>{conteudo.assunto}</i> 
                       </span> 

                    </div>

                    <div className="row">
                       <span>Status: 
                           <i style={{color: "#fff", backgroundColor: conteudo.Status === "aberto"? "#5cb85c" : "#999" }}>
                                {conteudo.status}
                           </i> 
                        </span> 

                    </div>

                    <div className="row">
                       <span>Cadastrado em:<i>{conteudo.createdFormated}</i>
                       </span> 

                    </div>



                    {conteudo.complemento !== "" && (
                         <div className="row">
                            <span> 
                                Complemento: <p>{conteudo.complemento}</p> 
                            </span>
                         </div>
                        )}

                   
                  



                </div>
            </div>
        </div>
    )
}