import {createContext,useEffect, useState} from "react"
import firebase from "../services/firebaseConnection"
import {toast} from "react-toastify"



export const AuthContext = createContext({})


function AuthProvider({children}){

const[user, setUser] = useState(null)
const[loading, setLoading] = useState(true)
const[loadingAuth, setLoadingAuth] = useState(false)

useEffect(()=>{

    function loadStorage(){
        const storageUser = localStorage.getItem("sistemaUser")
    
    if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false)

    }
    setLoading(false)
   }
loadStorage()

},[])

async function signIn(email, password){
    setLoadingAuth(true)
    
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( async(value)=>{
        let uid = value.user.uid
        let email = value.user.email
      
        let profile = await firebase.firestore().collection("users")// aqui tem que usar uma variavael, pq nao sei!
        
        .doc(uid).get()
            
            let data = {
                uid: uid,
                nome: profile.data().nome,
                avatarUrl:profile.data().avatarUrl, 
                email: email,
                
            }
            setUser(data)
            storageUser(data)  
            toast.success("Bem-vindo de  volta!")
            setLoadingAuth(false)
            
            

        })
    
        .catch((error)=>{
        console.log(error)
        toast.error("Ops, algo está errado.")
    })

}


async function signup(email,password,nome){
    setLoadingAuth(true)
   
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(async (value)=>{//value é uma propriedade firebase/auth q temos q usar (como parametro) para criar relação no banco de dados
        let uid = value.user.uid
       
        await firebase.firestore().collection("users")
        .doc(uid)
        .set({
            nome:nome,
            avatarUrl: null,
            email:email
        })
        
            let data = {
                uid:uid,
                nome: nome,
                email: email,
                avatarUrl:null
            }
            setUser(data)
            storageUser(data)  
            setLoadingAuth(false)
            toast.success("Seja bem-vindo!")
            
            
            /*function storageUser (data){
            localStorage.setItem("sistemaUser", JSON.stringify(data))*/ 
             /* Eu poderia deixar essa fuction aqui
            e chamá-la ainda dentro da async signup. Mas por esta ser async eu posso criar a function storageUser 
            fora do escopo da async signup e somente chamá-la dentro do escopo da async signup.*/
                                              
        })
        .catch((error)=>{
            console.log(error)
            toast.error("Ops, algo está errado.")
            setLoadingAuth(false)
        
    })
}


function storageUser (data){
    localStorage.setItem("sistemaUser", JSON.stringify(data))
}

async function signOut(){
    //await firebase.auth().signOut()
    await localStorage.removeItem("sistemaUser")
    setUser(null)
    toast.info("Você saiu do sistema")
};




    return(
        <AuthContext.Provider 
        value={{
            signed: !!user, 
            user, 
            loading, 
            signup,
            signOut,
            signIn,
            setUser,
            storageUser
            }}
            >           
             {children}
        </AuthContext.Provider>

    )
    /*IPC// estes sinais "!!" transformam qualquer valor em boleano //IPC*/


}
export default AuthProvider