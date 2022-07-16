import logo from "../../assets/logo.png"
import {useState} from "react"
import {Link} from "react-router-dom"
import "./signup.css"
import {useContext} from "react"
import {AuthContext} from "../../context/auth" 



function SignUp() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [nome, setNome] = useState("")

  const{signup}=useContext(AuthContext)


  

  function handleSubmit(e){
    if(email !== "" && password !== "" && nome !== ""){
      signup(email,password,nome)//essas são as values dos inputs q se tornam states aqui. 
      //Mas na origem da signup eles servem de parametros para fazer Data Base Genial!!//
    }
    
    e.preventDefault()
    alert("clicou")
  }

    return(
        <div className="container-center">
          <div className="login">
            <div className="login-area">
              <img src ={logo}/> 
            </div>
            
            
            <form onSubmit={handleSubmit }>
              <h1>Cadastre-se</h1>
              <input type ="text" placeholder="nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
              <input type= "text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <input type= "text" placeholder="*****" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <button type="submit">Acessar</button>
            </form>
            <Link to ="/">Já possui uma conta?</Link>
          </div>
     
        </div>
        )
  
  }
  
  export default SignUp;