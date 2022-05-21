import { useState, useEffect } from "react"
import { onAuthStateChanged, sendEmailVerification, signOut} from "firebase/auth"
import { auth } from "firebase-config"
import { useNavigate} from "react-router-dom"
import {FiRefreshCcw, FiLogOut} from 'react-icons/fi'

const Verify = (props) => {
    const [warn, setWarn] = useState("Yönlendiriliyorsunuz...")
    const [emailTekrar, setEmailTekrar] = useState("");
    const {setVerified} = props
    const navigate = useNavigate()

    const refresh = () => {
        navigate("/pages");
    }
    const logOut = async () => {
        await signOut(auth)
        navigate("/")
    }
    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser === undefined) {
                setWarn("Lütfen giriş yapınız.")
            }
            if(currentUser !== undefined && !currentUser.emailVerified){
                setWarn("Emailinizi doğruladıktan sonra sayfayı yenileyin...")
                setEmailTekrar("Başka bir doğrulama e-postası almak için tıklayın.")
            }
            else {
                setVerified("verified")
            }       
        } )
        return unsubscribe
    }, [])

    const sendEmail = async () => {
        const user = auth.currentUser
        await sendEmailVerification(user)
    }
    
  return (
    <>
    <div className="
        h-screen
        flex 
        flex-col
        justify-center 
        bg-gradient-to-r 
        from-enviroment
        via-midenv
        to-enviroment
        font-bold
        text-3xl
        text-center
        gap-10
        ">
            {warn}
            <div className="flex justify-center items-center gap-12">
            <button className="flex self-center rounded-3xl bg-black text-white p-3 gap-4" onClick={() => {refresh()}}>
                <div className="self-center">
                    Yenile
                </div>
                <FiRefreshCcw  size={35}/>
            </button>
            <button className="flex self-center rounded-3xl bg-black text-white p-3 gap-4" onClick={() => {logOut()}}>
                <FiLogOut  size={35}/>
                <div className="self-center">
                    Çıkış
                </div>
            </button>
            </div>
            <div className="flex bg-transparent self-center mt-10 text-red-800"  onClick={() => {sendEmail()}}>
                <button className="outline-none">
                {emailTekrar}
                </button>
            </div>
        </div>
    </>
  )
}

export default Verify