import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import {auth} from "firebase-config"
import { motion } from "framer-motion";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message)
            if(error.message === "Firebase: Error (auth/wrong-password)."){
                alert("Şifre yanlış.")}
            else if (error.message === "Firebase: Error (auth/user-not-found)."){
                alert("Email adresi yanlış.")
            }
            else if (error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."){
                alert("Çok kez yanlış şifre denendiği için hesabınız kısa süreliğine askıya alınmıştır. Lütfen şifrenizi değiştirip tekrar deneyin.")
            }
            else alert("Lütfen tüm alanları doldurun.")
            return
        }
        navigate('pages')
    }
    

    useEffect(() => {
       const unsubscribe =  onAuthStateChanged(auth, async  (currentUser) => {
           if(currentUser.email !== undefined)
            {
                navigate("pages")
            }
        })
        return () => {unsubscribe()} 
    }, [])

    const preventRefresh = (event) => {if(event.key === 'Enter'){event.preventDefault()}}
  
  return (
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

        <motion.input onKeyDown={(event)=>{preventRefresh(event)}} required={true} type={"email"} onChange = {(event) => {setEmail(event.target.value)}} placeholder="Email adresinizi giriniz."
        initial = {{opacity:0}}
        animate = {{opacity:1, transition: {duration:1.1}}}
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
        flex 
        p-2 
        w-[20vw] 
        min-w-min  
        self-center
        "/>

        <motion.input  onKeyDown={(event)=>{preventRefresh(event); if(event.key === 'Enter'){handleLogin()}}} required={true} type={"password"} onChange = {(event) => {setPassword(event.target.value)}} placeholder="Şifrenizi giriniz." 
        
        initial = {{opacity:0}}
        animate = {{opacity:1, transition: {duration:1.1}}}
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
        flex 
        p-2 
        w-[20vw]
        min-w-min 
        self-center
        "/>
        <motion.div 
        className="
        self-center 
        flex 
        flex-col 
        gap-5
        ">
            <motion.button onClick={() => {handleLogin()}} 
            
            initial = {{y:'-45vh', opacity:0}}
            animate = {{y:0, opacity:1}}
            exit= {{opacity:0, transition:{duration:0.65}}}
            transition = {{type:"spring", damping:15}}
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
                ">
                Giriş
            </motion.button>
            <motion.div 
            className="
            flex
            gap-5
             ">
                <motion.button onClick={() => {navigate('signup')}} 
                
                initial = {{x: '-40vw', opacity:0}}
                animate = {{x:0, opacity:1}}
                exit= {{opacity:0, transition:{duration:0.65}}}
                transition = {{type:"spring",damping:15}}
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
                    rounded-3xl
                    min-w-min
                    py-2
                    px-5
                    ">Kayıt Ol
                </motion.button>
                <motion.button onClick={() => {navigate('forgot')}} 
                
                initial = {{x:'40vw', opacity:0}}
                animate = {{x:0, opacity:1}}
                exit= {{opacity:0, transition:{duration:0.65}}}
                transition = {{type:"spring",damping:15}}
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
                    rounded-3xl
                    min-w-min
                    py-2
                    px-5
                    ">Şifrenizi mi Unuttunuz?
                </motion.button>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}
    
export default Login