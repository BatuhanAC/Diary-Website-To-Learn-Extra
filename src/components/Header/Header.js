import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from 'assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from 'firebase-config'


const PageHeader = (props) => {
  const navigate = useNavigate()
  const {userName, btnText, btnLogo, btnText2, btnLogo2, btnNav} = props

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])

  const btnNavigation = () => {
    navigate(btnNav)
  }

  const logOut = async () => {
    await signOut(auth)
    navigate("/")
  }
  
  const buttonAnimate = {
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
    <motion.nav 
    
    variants={buttonAnimate}
    initial="hidden"
    animate="visible"
    exit="leave"

    className=" 
    lg:h-[35vh]
    md:h-[25vh]
    grid
    grid-cols-3
    h-[15vh]
    items-center
    ">
    <motion.div className='grid justify-center w-[33.3vw] p-3 '>
      <motion.button 
      
        variants={buttonAnimate}  
        whileHover="hover"

        onClick={btnNavigation}
        className="
        bg-btn__do
        text-white
        border-transparent
        border-[1px]
        rounded-3xl
        gap-2
        min-w-min
        w-[10vw]
        py-2
        px-5
        grid
        grid-flow-col
        justify-center
        items-center
        ">
       {btnLogo}
       {screenSize.dynamicWidth >= 500 && btnText}
      </motion.button>
    </motion.div>
      <motion.h1 
      className='
      cursor-default 
      items-center 
      font-bold 
      text-lg  
      flex 
      flex-col 
      w-[33.3vw] 
      '>
        {userName}
        <motion.img 
        src={Logo}
        className='
        w-[25vw]
        '/>
      </motion.h1>

      {btnText2 === "Çıkış" &&
      <motion.div 
      className='
      flex
      justify-center
      items-center
      w-[33.3vw]
      '>
      <motion.button 

      variants={buttonAnimate}
      whileHover="hover"

      className="
    bg-btn__do
    text-white
      flex
      items-center
      gap-2
      rounded-3xl
      p-3
      self-center
      " 

      onClick={()=>{logOut()}}
      >
        {btnLogo2}
        {screenSize.dynamicWidth >= 500 &&
          btnText2
        }
      </motion.button>
      </motion.div>
      }
    </motion.nav>
  )
}
export default PageHeader