import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleLogin from "react-google-login";//para registro con Google
import { gapi } from "gapi-script"; //para registro con Google
import axios from "axios"

const GoogleSignUp =()=>{

    const navigate = useNavigate();

        //Registro con Google
        const googleId="889605891641-navvi2j6f5q2p56v1nojfo9qi0vugusj.apps.googleusercontent.com"// deberia ir en un archivo env?
        useEffect(()=>{
            const start=()=>{
                gapi.auth2.init({
                    clientId:googleId
                })
            }
            gapi.load("client:auth2",start)
        }, [])
        //Envio de respuesta de google al backend y al sessionStorage
        const responseGoogle = async (response)=>{
            console.log(response)
            try {
                await axios.post(`http://localhost:3001/user/googleSingup`, { token:response.tokenId })
                sessionStorage.setItem('token',response.tokenId)
                navigate("/home")
            } catch (error) {
                return error
            }
    
        }



    return(
        <div>
                    <GoogleLogin 
                    clientId={googleId}
                    buttonText="Iniciar sesión con Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}/>
        </div>
    )
}
export default GoogleSignUp