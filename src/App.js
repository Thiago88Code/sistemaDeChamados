
 
import {BrowserRouter} from"react-router-dom"
import Routes from "./routes";
import "./index.css"
import AuthProvider from "./context/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';


function App() {
  return(
      
        <AuthProvider>
          <BrowserRouter>
            <ToastContainer autoclose={3000}/>
            <Routes/>
          </BrowserRouter>
        </AuthProvider>
   
      )

}

export default App;
