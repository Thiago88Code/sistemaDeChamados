import{useContext,useState,useEffect} from "react"
import { AuthContext } from "../../context/auth"
import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiPlusCircle } from "react-icons/fi"
import "./index.css"
import firebase from "firebase"
import { toast } from "react-toastify"
import { useParams, useHistory } from "react-router-dom"




export default function New(){

const {id} = useParams()
const history = useHistory()

const{user} = useContext(AuthContext)

const[assunto, setAssunto] = useState("suporte")
const[status, setStatus] = useState("aberto")
const[complemento,setComplemento] = useState("")

const[costumers, setCostumers]= useState([])
const[loadingCostumers, setLoadingCostumers]= useState(true)
const[costumersSelected, setCostumersSelected]= useState(0)//este state vai ser o index do state [] costumer//
const[idCostumer, setIdCostumer] = useState(false)

useEffect(()=>{
    async function loadCostumers(){
        await firebase.firestore().collection("costumers")
        .get()
        .then((snapshot)=>{
            let lista = []
            snapshot.forEach(item => {
                lista.push({
                    id: item.id,
                    nomeFantasia: item.data().nomeFantasia
                })
            });
            if(lista.length === 0){
                console.log("Nenhuma empresa encontrada")
                setCostumers([{id:1, nomeFantasia: "FREELA"}])
                setLoadingCostumers(false)
                return
            }

            setCostumers(lista)
            setLoadingCostumers(false)

            
                
            

             })
            .catch((error)=>{
            console.log(error)
            setLoadingCostumers(false)
            })

    }
    loadCostumers()
    
},[])


    



    function handleChangeSelectAssunto(e){
        setAssunto(e.target.value)
       // console.log(e.target.value)
        console.log(assunto)

    }

    function handleChangeStatus(e){
        setStatus(e.target.value)
        console.log(e.target.value)
        console.log(status)
        
    }

    async function handleRegister(e){
        e.preventDefault()
        
        await firebase.firestore().collection("chamados")
        .add({
            created: new Date(),
            cliente: costumers[costumersSelected].nomeFantasia,//IPC,costumers[costumersSelected].nomeFantasia//muito maneiro!!//
            //Uso o primeiro parametro do map(item) e o segundo(index) para relacionar as informções no firebase
            clienteId : costumers[costumersSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userUid: user.uid

        })
        .then(()=>{
            toast.success("Chamado criado com sucesso")
            setComplemento("")
            setCostumersSelected(0)
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Ops, algo está errado")
        })
        

    }
    function handleChangeSelectCostumers(e){
        //console.log("index do cliente selecionado:", e.target.value)
        //console.log("cliente selecionado", costumers[e.target.value])
        setCostumersSelected(e.target.value)


    }


    

    return(
     
        <div>
            <Header/> 
            <div className="content">
               <Title nome="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title> 

                <div className="container">
                    <form onSubmit={handleRegister}>
                        <label>Cliente:</label>
                        
                        {loadingCostumers?(
                                <input type = "text" disabled={true} value="Carregando"/>
                            ):(
                                <select value={costumersSelected}  onChange={handleChangeSelectCostumers}>{/* no select, o value tem q tá emtere chaves{} */}

                          
                                {costumers.map((item,index)=>{
                                    return(
                                        <option key={item.id} value={index}>{/*O constumersSelected será mo index do Costumers*/}
                                            {item.nomeFantasia}
                                        </option>
                                    )})}
                           
                            </select>
                        )}
                        
                        
                        <label>Assunto:</label>
                        <select value ={assunto} onChange={handleChangeSelectAssunto}>
                           <option value = "suporte">Suporte</option> 
                           <option value = "Visita técnica">Visita técnica</option> 
                           <option value = "Financeiro">Financeiro</option> 
                        </select>
                        {/* Na tag <select> não posso setar o estado inline*/} 
                        
                        <label>Status:</label>
                        <div className="status">
                        
                        <input 
                        type="radio"
                        name="radio"
                        value="aberto"
                        checked={status === "aberto"}
                        onChange={handleChangeStatus}/>
                        <span>Em aberto</span>
                        {/*No input Type radio não posso setar o estado inline. Posso usar a proprieda "checked"
                        e usar uma condição, ou posso fazer conforme o exemplo abaixo do "value={"progresso"}"*/}
                       
                        <input 
                        type="radio"
                        name="radio"
                        value={"progresso"} 
                        //Sem usar a propriedade checked setando o value assim: "value={"progresso"}"
                        onChange={handleChangeStatus}/>
                        <span>Em progresso</span>
                        
                        <input 
                        type="radio"
                        name="radio"
                        value="atendido"
                        checked={status === "atendido"}
                        onChange={handleChangeStatus}/>
                        <span>Atendido</span>
                        </div>

                       <label className="label">Complemento:</label> 
                    
                       <textarea type = "text" placeholder="Descreva seu problema"
                        value={complemento} onChange={(e)=>{setComplemento(e.target.value)}}></textarea>
                        <button type="submit">Salvar</button>
                    </form>

                </div>
                
            </div>
            
        </div>
    )
}