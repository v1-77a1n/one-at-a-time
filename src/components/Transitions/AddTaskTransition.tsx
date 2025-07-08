import { motion } from 'motion/react'
import { type JSX } from 'react'
const transition = (Component: JSX.Element, key: string) => {

      return (
            <motion.div
                  key={key}
                  className='appear'
                  initial={{ opacity: 0, translateY: 100 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 100 }}
                  transition={{duration: 0.5, ease: 'easeIn'}}
            >
                  {Component}
            </motion.div>
      )
}

export default transition