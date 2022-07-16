import avatar from "../../assets/avatar.png"
import { useContext } from "react"
import { AuthContext } from "../../context/auth"
import {FiHome,FiUser,FiSettings} from "react-icons/fi"
import {Link} from "react-router-dom"
import "./index.css"
export default function Header(){

    const{user} = useContext(AuthContext)
    return(
        <div className="sidebar">
            <div>
                <img src = {user.avatarUrl === null? avatar : user.avatarUrl} />
            </div>
            
                 
                    <Link to={"/dashBoard"}>
                        <FiHome color="#FFF" size={24}/>
                        Chamados
                    </Link>
                
                    <Link to={"/costumers"}>
                        <FiUser color="#FFF" size={24}/>
                        Clientes
                    </Link>
                
                    <Link to={"/profile"}>
                        <FiSettings color="#FFF" size={24}/> 
                        Configuraçóes
                    </Link>
        </div>
    )
}