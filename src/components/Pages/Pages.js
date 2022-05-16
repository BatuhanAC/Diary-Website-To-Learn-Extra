import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import {getDoc, doc, } from "@firebase/firestore"
import { onAuthStateChanged} from 'firebase/auth';
import {auth} from "firebase-config"
import db from "firebase-config"
import { motion } from "framer-motion";
import Verify from "components/Verify/Verify";
import Header from "components/Header/Header"
import {FaBookMedical} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

const Pages = () => {
  const [verified, setVerified] = useState("unverified")
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [userName, setUserName] = useState("")
  const today = new Date();
  const bugun = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const getPages = async () => {
        const userDocRef = doc(db, "users", currentUser.email)
        const userData = await getDoc(userDocRef)
        setData(userData.data().userPages)
        setUserName(userData.data().userName)
      };
      getPages()
    })
    return unsubscribe
  }, [])

  const itemAnimate = {
    hidden: {
      y: '30vh',
      opacity: 0,

    },
    visible: {
      y: 0,
      opacity:1,
      transition: {type:"spring", damping:15,}
      
    },
    hover:{
      backgroundColor: "rgba(0,0,0,0.7)",
      color:"rgb(255,255,255)",
      scale: 1.12,
      boxShadow: "0px 0px 8px rgb(0,0,0)",
      textShadow: "0px 0px 1px rgb(255,255,255)",
      transition: {duration:0.45}
    },
    leave: {
      opacity:0, 
      transition:{duration:0.65}
    },
  }
  
  return (
  <>
    {verified === "unverified" &&
      <Verify setVerified={setVerified} />
    }
    {verified === "verified" &&
      <motion.div 
      
      className='
      bg-gradient-to-r 
      from-enviroment 
      via-midenv 
      to-enviroment 
      min-h-screen 
      h-[100%] 
      w-[100vw]
      '>
        <Header userName = {userName} btnText="Yeni Sayfa" btnLogo={<FaBookMedical/>} btnText2="Çıkış" btnLogo2={<FiLogOut/>} btnNav={"/page/"+ bugun} />
        <motion.div className="
        sm:p-[75px]
        p-[45px]
        items-center
        ">
        <motion.ul className="sm:grid sm:grid-cols-3 grid grid-cols-2 text-center gap-8 ">
          {
            data.map(({tarih, baslik}, index) => {
              return(
                <motion.li key={index} onClick={() => {navigate('/page/'+ tarih)}} 
                
                variants= {itemAnimate}
                initial= "hidden"
                animate= "visible"
                whileHover="hover"
                exit= "leave"

                className="
                items-center
                bg-enviroment
                text-white 
                font-bold 
                cursor-default
                rounded-3xl
                p-3
                ">
                  <motion.p>
                    {baslik}
                    <br/>
                    {tarih}
                  </motion.p>
                </motion.li>
                
            )})
          }
        </motion.ul> 
        </motion.div>
      </motion.div>
    } 
  </>
  ) 
}

export default Pages
