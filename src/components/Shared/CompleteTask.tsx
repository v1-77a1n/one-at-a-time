import { motion, AnimatePresence } from 'motion/react'
import { type JSX, useEffect, useState } from 'react'

const openConfirm = (Component: JSX.Element) => {
      return (
            <motion.div
                  className='confirm'
                  initial={{ opacity: 0, width: 0, height: 0, borderRadius: 100 }}
                  animate={{ opacity: 1, width: '100vw', height: '100vh', borderRadius: 0, transition: {duration: 0.8, ease: 'easeOut'} }}
                  exit={{ opacity: 0, width: 0, height: 0, borderRadius: 100, transition: {delay: 0.5,duration: 0.5, ease: 'easeOut'} }}
            >
                  <motion.div
                        className='confirm-content'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: 'easeIn'} }}
                        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeIn'} }}
                  >
                        {Component}
                  </motion.div>
            </motion.div>
      )
}

function CompleteTask({setComplete, save}: {setComplete: (boolean: boolean) => void, save?: boolean}) {
      const [show, setShow] = useState<boolean>(true);
      
      save = save ? save : false

      useEffect(() => {
            setTimeout(() => {
                  setShow(false);
            }, 3000)
            setTimeout(() => {
                  setComplete(false);
            }, 6000)
      })

      return (
            <>
                  <AnimatePresence mode='wait'>
                        {show && openConfirm(<h1>{save ? 'Saved Successfully!' : 'Task Completed!'}</h1>)}
                  </AnimatePresence>
            </>
      )
}

export default CompleteTask