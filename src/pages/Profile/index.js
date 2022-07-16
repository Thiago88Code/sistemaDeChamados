
import Title from "../../components/Title"
import { FiSettings, FiUpload } from "react-icons/fi"
import Header from "../../components/Header"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth"
import avatar from "../../assets/avatar.png"
import firebase from "../../services/firebaseConnection"
import "./index.css"




export default function Profile(){

const{user,signOut,setUser,storageUser}=useContext(AuthContext)

const[nome, setNome] = useState(user && user.nome)
const[email, setEmail] = useState(user && user.email)

const[avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
const[imageAvatar, setImageAvatar] = useState(null)



function handleFile(e){
    if(e.target.files[0]){
        let image = e.target.files[0]
        if(image.type === "image/jpeg" || image.type === "image/png"){
            setImageAvatar(image)
            setAvatarUrl(URL.createObjectURL(image))
            console.log(image)
        }else{
            alert("envie uma imagem dos tipos: jpeg ou png")
            setImageAvatar(null)
            return null
        }

    }
}


async function handleUpload(){
    const currentUid = user.uid
    const uploadTask = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`) //name é um das propriedades da foto.poderi usar qqum deles
    .put(imageAvatar)
    .then(async ()=>{
        await firebase.storage()
        .ref(`images/${currentUid}`)
        .child(`${imageAvatar.name}`)//Ipc .não esquecer.
        .getDownloadURL()
        .then(async(url)=>{// Este parametro pode ter qq nome. Ele significa a url criada por getDownloadUrl
            let urlFoto = url
            await firebase.firestore().collection("users")
            .doc(user.uid)
            .update({
                avatarUrl:urlFoto,
                nome:nome
            })
            .then(()=>{
                let data ={
                    ...user,
                    avatarUrl:urlFoto,
                    nome:nome
                }
                setUser(data)
                storageUser(data)

            })
        })
        
    
    })
    .catch((error)=>{
        console.log(error)
    })
}


async function handleSave(e){
    e.preventDefault()

    if(imageAvatar === null && nome !== ""){
        await firebase.firestore().collection("users")
        .doc(user.uid)
        .update({
            nome:nome
        })
        .then(()=>{
            let data={
                ...user,
                nome:nome
            }
            setUser(data)
            storageUser(data)
            
        })
        .catch((error)=>{
            console.log(error)
        })
     }
     else if(nome !== "" && imageAvatar !== null){
         handleUpload()
     }
        
        

    }







    return(
      <div>
         <Header/>
        <div className="content">
            <Title nome = "Meu Pefil">
                <FiSettings size={25}/>
            </Title>
        

        <div className="container">
            <form className="form-profile" onSubmit={handleSave}>
                <label className = "label-avatar">
                    <span>
                        <FiUpload  size={25}/>
                    </span>
                    
                    <input type="file" accept="image/*" onChange={handleFile}/>
                    {avatarUrl === null?
                        <img src = {avatar} width={250} height={250} alt="foto de perfil" />   
                        :
                        <img src = {avatarUrl} width={250} height={250} alt="foto de perfil" />   
                        }
                </label>
                    
                    
                    
                    
                    <label>Nome: </label>
                    <input type="text" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                    
                    <label>Email</label>
                    <input type="text" value ={email} disabled={true}/>
                    
                    <button type="submit">Salvar</button>
              </form>
        </div>
         
         <div className="container">
             <button className="logout-btn" onClick={signOut}>
                 Sair
             </button>
         </div>
        
        </div> 

      </div>
       
    )
}