import logo from "../../assets/logo.png"
import {useState} from "react"
import {Link} from "react-router-dom"
import "./signin.css"
import {useContext} from "react"
import {AuthContext} from "../../context/auth" 




function SignIn() {
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const{signIn}= useContext(AuthContext)

  function handleSubmit(e){
    if(email !== "" && password !== ""){
      signIn(email, password)
    }
    e.preventDefault()
    
  }

    return(
        <div className="container-center">
          <div className="login">
            <div className="login-area">
              <img src ={logo}/> 
            </div>
            
            
            <form onSubmit={handleSubmit}>
              <h1>Entrar</h1>
              <input type= "text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type= "text" placeholder="*****" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <button type="submit">Acessar</button>
            </form>
            <Link to ="/register">Criar uma conta</Link>
          </div>
     
        </div>
        )
  
  }
  
  export default SignIn;
  