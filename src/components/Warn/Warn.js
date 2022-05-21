import { useEffect, useState } from "react"
import { motion } from "framer-motion"


export const Warn = ({warn, setWarn}) => {
    useEffect(() => {
        setTimeout(() => {setWarn(null)}, 2900)
    }, [])

    return(
        
        <motion.div
            animate= {{
                opacity:[0, 1, 0],
                transition: {
                    duration: 3
                }
            }}

            className="
            absolute
            top-[20%]
            left-[50%]
            -translate-x-1/2
            border-2
            border-red-600
            font-bold
            text-red-500
            h-[8vh]
            rounded-3xl
            p-[15px]
            ">
                {warn}
            </motion.div>
    )
}