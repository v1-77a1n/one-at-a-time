import { motion } from 'motion/react'
import type { JSX } from 'react'

const transition = (Component: JSX.Element) => {
      return (
            <>
                  {Component}
                  <motion.div 
                        className='swipe'
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0}}
                        exit={{ scaleX: 0}}
                        transition={{ duration: 1, ease: 'easeOut' }}
                  />
            </>
      )
}

export default transition