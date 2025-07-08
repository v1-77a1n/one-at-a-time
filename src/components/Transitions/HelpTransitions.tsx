import { motion } from 'motion/react'
import type { JSX } from 'react'

const btnTransition = (Button: JSX.Element) => {
      return (
            <motion.div
                  key='help-btn'
                  className='btn-transition'
                  initial={{ opacity: 0, rotate: 0}}
                  animate={{ opacity: 1, rotate: 360 }}
                  exit={{ opacity: 0, rotate: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
                  {Button}
            </motion.div>
      )
}

const helpModal = (Component: JSX.Element) => {
      return (
            <motion.div
                  key='help-modal'
                  className='modal'
                  initial={{ width: 0 }}
                  animate={{ width: '100vw', transition: { duration: 0.5, ease: 'easeIn'} }}
                  exit={{ width: 0, transition: { delay: 0.5, duration: 0.5, ease: 'easeIn'} }}
            >
                  <motion.div
                        key='help-modal-content'
                        className='help-modal-content'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.3,duration: 0.5, ease: 'easeIn'} }}
                        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeIn'} }}
                  >
                        {Component}
                  </motion.div>
            </motion.div>
      )
}

export {btnTransition, helpModal}