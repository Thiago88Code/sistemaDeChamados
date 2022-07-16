
import Title from "../../components/Title"
import {FiSettings} from "react-icons/fi"

export default function Settings(){
    return(
        <div>
            <Title nome ="Settings">
                <FiSettings size={25}/>
            </Title>
        </div>
    )
}