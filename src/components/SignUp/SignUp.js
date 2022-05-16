import { useState, useEffect} from "react"
import {setDoc, doc} from "@firebase/firestore"
import { createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "@firebase/auth"
import db from "firebase-config"
import {auth} from "firebase-config"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const navigate = useNavigate()    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser.email !== undefined)
             {
                 navigate("/pages")
             }
         })
         return unsubscribe
     }, [])

    const singUp = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        }catch(error) {
            if (error.message === "Firebase: Error (auth/email-already-in-use)."){
                alert("Girdiğiniz email zaten kullanımda.")
            }
            return
        }

        const userDocRef = doc(db, "users", email)
        await setDoc(userDocRef, {userEmail:email, userName:name, userPages: []})
        const user = auth.currentUser
        try {
            console.log(JSON.stringify(user.email))
            await sendEmailVerification(user)
        } catch (error) {
            console.log("Verifikasyonda Sıkıntı: " + error.message)
        }

        navigate("/verify" )
    }

    const preventRefresh = (event) => {if(event.key === 'Enter'){event.preventDefault()}}

    return (
    <div 
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
            <motion.input onChange={(event)=>{setName(event.target.value)}} onKeyDown={(event)=>{preventRefresh(event)}} type={"text"} required={true} placeholder="Günlüğünüze isim verin." 
            
            initial= {{opacity:0}}
            animate= {{opacity:1, transition:{duration:1.1}}}
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
            <motion.input onChange={(event)=>{setEmail(event.target.value)}} onKeyDown={(event)=>{preventRefresh(event)}} required={true} type={"email"} placeholder="Email adresinizi girin."
            
            initial= {{opacity:0}}
            animate= {{opacity:1, transition:{duration:1.1, delay:0.3}}}
            exit= {{opacity:0, transition:{duration:0.65}}}
            whileFocus = {{
                scale: 1.13,
                transition: {duration:0.7}
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
            <motion.input onChange={(event)=>{setPassword(event.target.value)}} onKeyDown={(event)=>{preventRefresh(event)}} type={"password"} required={true} placeholder="Şifrenizi belirleyin." 
            
            initial= {{opacity:0}}
            animate= {{opacity:1, transition:{duration:1.1, delay:0.6}}}
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

        <motion.button onClick={()=>{singUp()}} 

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
        rounded-3xl
        self-center
        justify-center
        min-w-min
        py-2
        px-5
        ">Kayıt Ol</motion.button>
        <motion.button onClick={()=>{navigate('/')}} 

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
        rounded-3xl
        self-center
        justify-center
        min-w-min
        py-2
        px-5
        ">Geri</motion.button>
    </div>
    )
  }
      
  export default SignUp