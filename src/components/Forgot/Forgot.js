
import { useState } from "react"
import { auth } from "firebase-config"
import {sendPasswordResetEmail} from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Warn } from "components/Warn/Warn"
const Forgot = () => {
    const navigate = useNavigate()
    const [warn, setWarn] = useState(null)
    const [email, setEmail] = useState("")
    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email)     
        } catch (error) {
            if(error.message === "Firebase: Error (auth/invalid-email)."){
                setWarn("Böyle bir email adresi var olamaz.")
            }
            if(error.message === "Firebase: Error (auth/missing-email)."){
                setWarn("Lütfen email adersinizi giriniz.")
            }
            if(error.message === "Firebase: Error (auth/user-not-found)."){
                setWarn("Girdiğiniz email adresine ait bir kullanıcı bulunmamakta.")
            }
            return
        }
        alert("Emailinizi kontrol edip şifrenizi değiştirdikten sonra giriş yapın.")
        navigate("/")
    }
    const preventRefreshAndSend = (event) => {if(event.key === 'Enter'){event.preventDefault(); handleResetPassword()}}

    return (
        <>
        { warn ?
            (
                <Warn warn={warn} setWarn={setWarn} />
            ) : null
            }
        <motion.div
        className="
        bg-gradient-to-r
        from-enviroment
        via-midenv
        to-enviroment
        h-screen
        w-screen
        gap-y-[3vh]
        flex
        flex-col
        justify-center
        ">
            <motion.input onKeyDown={(event)=>{preventRefreshAndSend(event)}} onChange = {(event) => {setEmail(event.target.value)}} type={"email"} placeholder="Email adresinizi giriniz." 
            
            initial={{opacity:0}}
            animate={{opacity:1, transition: {duration:1.1}}}
            exit= {{opacity:0, transition:{duration:0.65}}}
            whileFocus = {{
                scale: 1.13,
                transition: {duration:0.5}
            }}
            
            className="
            bg-transparent 
            border-2 
            border-enviroment 
            outline-none 
            rounded-2xl 
            text-center
            p-2 
            w-[20vw]
            min-w-min 
            self-center
            "/>

            <motion.button onClick={() => {handleResetPassword()}}

            initial= {{scale:0}}
            animate= {{scale:1, transition:{type:"spring", damping:15}}}
            exit= {{opacity:0, transition:{duration:0.65}}}
            whileHover= {{
                borderWidth: '1px',
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: "rgba(0,0,0,0.7)",
                color:"rgb(255,255,255)",
                scale: 1.12,
                boxShadow: "0px 0px 8px rgb(0,0,0)",
                textShadow: "0px 0px 1px rgb(255,255,255)",
                transition: {duration:0.45}
            }}   

            className="
            bg-btn__do
            text-white
            border-transparent
            border-[1px]
            flex
            rounded-3xl
            self-center
            justify-center
            min-w-min
            py-2
            px-5
            ">Gönder</motion.button>

            <motion.button onClick={() => {navigate('/')}}

            initial= {{scale:0}}
            animate= {{scale:1, transition:{type:"spring", damping:15}}}
            exit= {{opacity:0, transition:{duration:0.65}}}
            whileHover= {{
                borderWidth: '1px',
                borderColor: "rgba(0,0,0,0)",
                backgroundColor: "rgba(0,0,0,0.7)",
                color:"rgb(255,255,255)",
                scale: 1.12,
                boxShadow: "0px 0px 8px rgb(0,0,0)",
                textShadow: "0px 0px 1px rgb(255,255,255)",
                transition: {duration:0.45}
            }}
  

            className="
            bg-btn__do
            text-white
            border-transparent
            border-[1px]
            flex
            rounded-3xl
            self-center
            justify-center
            min-w-min
            py-2
            px-5
            ">Geri</motion.button>
        </motion.div>
        </>
    )
  }
      
  export default Forgot