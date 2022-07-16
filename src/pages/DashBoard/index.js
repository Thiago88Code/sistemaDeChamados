import { useState, useEffect } from "react"
import Header from "../../components/Header"
import { FiMessageSquare, FiPlus } from "react-icons/fi"
import Title from "../../components/Title"
import { Link, useParams } from "react-router-dom"
import "./index.css"
import { FiEdit2, FiSearch } from "react-icons/fi"
import firebase from "firebase"
import {format} from "date-fns"
import Modal from "../../components/Modal"




const listaRef = firebase.firestore().collection("chamados").orderBy("created","asc")

export default function DashBoard() {


    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)
    const [loadingMore,setLoadingMore] = useState(true)
    const [lastDocs,setLastDocs] = useState()

    const [toggle, setToggle] = useState(false)
    const [details, setDetails] = useState([])
    


    useEffect(()=>{
        async function loadingChamados(){

            await listaRef.limit(5)
            .get()
            .then((snapshot)=>{
                updateState(snapshot)
            })
            .catch((error)=>{
                console.log(error)
                setLoadingMore(false)
            })
        }
  
        loadingChamados()
    },[])
    
    
    
    
    async function updateState(snapshot){
        const isCollectionEmpty = snapshot.size === 0 //depois tenter co length//
           
        if(!isCollectionEmpty){
            
            let lista = []
                snapshot.forEach((item)=>{
                    lista.push({
                        id: item.id,
                        assunto: item.data().assunto,
                        cliente: item.data().cliente,
                        clienteId: item.data().clieteId,
                        created: item.data().created,
                        createdFormated:format(item.data().created.toDate(), "dd/MM/yyyy"),//legal
                        status: item.data().status,
                        complemento: item.data().complemento

            })

        })

            const lastDoc = snapshot.docs[snapshot.docs.length -1]
            setChamados(chamados=>[...chamados, ...lista])// entender isso!!
            setLastDocs(lastDoc)
        
        }else{
            setIsEmpty(true)
        }

            setLoadingMore(false)
            setLoading(false)
        }
    
    
        async function handleMore(){
            setLoadingMore(true)
            await listaRef.limit(5).startAfter(lastDocs)
             .get()
            .then((snapshot)=>{
                updateState(snapshot)
                
            })}
    
        if(loading){
            return(
                <div>
                        <Header/>
                    <div className="content">
                        <Title nome=" Atendimentos">
                            <FiMessageSquare />
                        </Title>
                    </div>
                    <div className="container dashboard">
                        <span>Carregando chamados...</span>
                    </div>
                </div>

                )
                }
        
        
        function togglePostModal(item){
           setDetails(item)
           setToggle(!toggle)//fica alternando o boleano
            
        }

            return (
                <div>
                    <Header />

                    <div className="content">
                        <Title nome=" Atendimentos">
                            <FiMessageSquare />
                        </Title>

                        {chamados.length === 0 ? (


                    <div className="container dashboard">
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            Novo chamado
                        </Link>

                    </div>
                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            Novo chamado
                        </Link>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>

                            <tbody>
                                {chamados.map((item,index)=>{
                                    return(
                                        <tr key = {index}>
                                            <td>{item.cliente}</td>
                                            <td>{item.assunto}</td>
                                            <td>
                                                <span className="badge" style={{ backgroundColor: item.status ==="aberto"?
                                                 "#5cb85c" : "#999" }}>{item.status}</span>
                                            </td>
                                            <td>{item.createdFormated}</td>
                                            <td>
                                            <button className="action" style={{ backgroundColor: "#3583f6" }}  onClick={()=>togglePostModal(item)}>
                                                <FiSearch color="#FFF" size={17} />
                                            </button>
                                            <Link  className="action" style={{ backgroundColor: "#f6a935" }} to={`/new/${item.id}`}>
                                                <FiEdit2 color="#FFF" size={17} />
                                            </Link>
                                            </td>
                                        </tr>


                                    )
                                })}
                            </tbody>
                        </table>
                        
                        {!loadingMore && !isEmpty && <button className ="btn-more" onClick={handleMore}>Buscar mais</button>}
                     
                        {toggle && 
                            <div>
                                <Modal conteudo = {details} close = {togglePostModal}/>
                            </div>}
                     </>
                    )}
                </div>
            </div>
            )

        }