import { useState, useEffect } from 'react';
import {AiFillSave} from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import db from 'firebase-config';
import { onAuthStateChanged} from 'firebase/auth';
import {getDoc, doc, updateDoc} from "@firebase/firestore";
import {auth} from "firebase-config"
import {FaBook} from 'react-icons/fa'
import Verify from 'components/Verify/Verify';
import Header from 'components/Header/Header'

const Page = () => {
  const {date} = useParams()
  const [verified, setVerified] = useState("unverified");
  const [userName, setUserName] = useState()
  const [email, setEmail] = useState()
  let [data, setData] = useState([])
  const [baslik, setBaslik] = useState("")
  const [gun, setGun] = useState("")
  const navigate = useNavigate()
  const tarih = "Tarih: " + date

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const getPage = async () => {
        const userDocRef = doc(db, "users", currentUser.email)
        setEmail(currentUser.email)
        const userData = await getDoc(userDocRef)
        setUserName(userData.data().userName)
        setData(userData.data().userPages)
        const found = userData.data().userPages.find(obj => obj.tarih === date)
        if(found !== undefined){
          setGun(found.bugun)
          setBaslik(found.baslik)
        }    
      }
      getPage() 
    })

    return unsubscribe
  }, [])
  
    

  const kaydet = async () => {
    const found = await data.find(obj => obj.tarih === date)
    if( found !== undefined) {
      data[data.indexOf(found)].bugun = gun
      data[data.indexOf(found)].baslik = baslik
    }
    else {
      const today = {baslik:baslik, tarih:date, bugun:gun}
      data = [...data, today]
    }

    const upDoc = async () => {
      const userDocRef = doc(db, "users", email)
      await updateDoc(userDocRef, {userPages:data})
      navigate("/pages")
    }
    upDoc();
  }

  const animation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {duration:0.65}
    },
    hover: {
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
    }
  }

  return (
    
    <>
    {verified === "unverified" &&
      <Verify setVerified = {setVerified} />
    }
    {verified === "verified" &&
    <motion.div 
    className='
    flex
    flex-col
    justify-center
    items-center
    bg-gradient-to-r 
    from-enviroment 
    via-midenv 
    to-enviroment 
    '>
      <motion.div 

      variants={animation}
      initial="hidden"
      animate="visible"
      exit="leave"

      className="
      flex 
      flex-col 
      fixed 
      justify-center 
      items-center 
      self-center
      bottom-1
      ">
        <motion.div 
          className='
            text-black
            font-semibold
          '>{tarih}
        </motion.div>
        <motion.button 
        onClick={() => {kaydet()}}
        variants={animation}
        whileHover="hover"
        className="
        bg-btn__do
        text-white
        border-transparent
        border-[1px]
        flex
        rounded-3xl
        gap-2
        justify-center
        items-center
        py-2
        px-5
        "> 
          <AiFillSave/>
          Kaydet
        </motion.button>
      </motion.div>
      <Header userName={userName} btnText={"Yazdıklarım"} btnLogo={<FaBook/>} btnNav="/pages"/>
      <motion.div 
      className="
      flex
      flex-col
      gap-3
      pb-[10vh]
      ">
        <motion.input placeholder='BAŞLIK' value={baslik} type={"text"} onChange={(event) => {setBaslik(event.target.value)}} 
        onKeyDown= {(event) => {if(event.key === 'Enter'){event.preventDefault()}}} 

        variants={animation}
        initial="hidden"
        animate="visible"
        exit="leave"

        className="
        bg-transparent
        outline-none
        p-[2vh]
        sm:w-[20vw]
        w-[35vw]
        h-[100%]
        font-semibold
        rounded-3xl
        text-2xl
        text-center
        self-center
        "/>
        <motion.textarea rows="30" value={gun} placeholder='Anlat bakalım...' onChange={(event) => {setGun(event.target.value)}}

        variants={animation}
        initial="hidden"
        animate="visible"
        exit="leave" 

        className="
        sm:w-[55vw]
        md:w-[70vw]
        w-[75vw]
        h-[75vh]
        self-center
        bg-transparent
        resize-none
        font-medium
        rounded-3xl
        p-5
        border-2
        border-enviroment
        outline-0
        "></motion.textarea>
      </motion.div>
    </motion.div>
    }
    </>
  )
}

export default Page