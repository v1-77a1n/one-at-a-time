import '@/styles/help.css'

import { AnimatePresence } from 'motion/react'
import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router'

import HelpBtn from '@/components/Help/HelpBtn'
import HelpContent from '@/components/Help/HelpContent'

function Help() {
      const [helpOpen, setHelpOpen] = useState<boolean>(false)
      const [render, setRender] = useState<boolean>(false)
      const visited = useRef<string[]>([])
      const location = useLocation()

      visited.current = JSON.parse(window.localStorage.getItem('visited') || '[]');

      useEffect(() => {
            const detectFirstVisit = () => {
                  if(!visited.current.includes(location.pathname)) {
                        setHelpOpen(true)
                        setTimeout(() => {
                              setRender(true)
                        }, 600)
                        visited.current.push(location.pathname)
                        window.localStorage.setItem('visited', JSON.stringify(visited.current))
                  }
            }
            detectFirstVisit()
      }, [location.pathname])

      return (
            <>
                  <AnimatePresence mode='wait'>
                        {!helpOpen && <HelpBtn setHelpOpen={setHelpOpen} setRender={setRender} />}
                        {render && <HelpContent setHelpOpen={setHelpOpen} setRender={setRender} />}
                  </AnimatePresence>
            </>
      );
}

export default Help