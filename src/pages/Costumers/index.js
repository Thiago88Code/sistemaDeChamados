

import Title from "../../components/Title"
import { FiUser } from "react-icons/fi"
import Header from "../../components/Header"
import { useState } from "react"
import firebase from "firebase"
import { toast } from "react-toastify"
import "./index.css"

export default function Costumers(){

    const[nomeFantasia, setNomeFantasia] = useState("")
    const[cnpj, setCnpj] = useState("")
    const[endereço, setEndereço] = useState("")

    async function handleAdd(e){
        e.preventDefault()
        if(nomeFantasia !== "" && cnpj !== "" &&  endereço !== ""){

            await firebase.firestore().collection("costumers")
        .add({
            nomeFantasia:nomeFantasia,
            cnpj:cnpj,
            endereço:endereço
        })
        .then(()=>{
            setNomeFantasia("")
            setCnpj("")
            setEndereço("")
            toast.success("Dados preenchidos corretamente")
        })
        .catch((error)=>{
            console.log(error)
        })
        
        }else{
            toast.warning("Preencha todos os campos!")
            
        }
        
        
    }

    return(
        <div>

        <Header/>
       
        <div className="content">
            
                <Title nome = "Clientes">
                <FiUser size={25}/> 
                </Title>
            <div className="container">
                <form onSubmit={handleAdd} className="form-profile-costumers">
                    <label>Nome fantasia</label>
                    <input type="text" value={nomeFantasia} placeholder="Nome da sua empresa" onChange={(e)=>setNomeFantasia(e.target.value)} />
                    <label>CNPJ</label>
                    <input type="text" value={cnpj} placeholder="CNPJ da sua empresa" onChange={(e)=>setCnpj(e.target.value)} />
                    <label>Endereço</label>
                    <input type="text" value={endereço} placeholder="Endereço da sua empresa" onChange={(e)=>setEndereço(e.target.value)} />
                    <button type="submit">Cadastrar</button>
                    
                </form>

            </div>
       
            

                    </div>
                        
                    
                    </div>
                
            )
}