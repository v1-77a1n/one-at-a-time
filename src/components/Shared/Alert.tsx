import '@/styles/alert.css'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type AlertContent = {
      title: string,
      message: string
}

function Alert() {
      const queue = useRef<Map<string, Alert[]>>(new Map([]))
      const [show, setShow] = useState<boolean>(false);
      const [alertContent, setAlertContent] = useState<AlertContent | null>();

      useEffect(() => {
            const queueAlerts = () => {
                  const alerts = JSON.parse(window.localStorage.getItem('alerts') || '[]');

                  for(const alert of alerts) {
                        const queuedAlerts = queue.current.get(alert.time.toString()) || []

                        if(!queuedAlerts.includes(alert)) {
                              queuedAlerts.push(alert as Alert)
                              queue.current.set(alert.time.toString(), queuedAlerts)
                        }
                  }
            }

            setInterval(() => {
                  queueAlerts()
                  if(queue.current.size === 0) return 
                  const alerts = JSON.parse(window.localStorage.getItem('alerts') || '[]');
                  const tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');

                  const time = new Date().toTimeString().slice(0, 5);

                  if(queue.current.has(time)) {
                        const queuedAlerts = queue.current.get(time)!
                        for(const alert of queuedAlerts) {
                              const task = tasks[alert.task] as Task
                              const title = alert.message ? `${task.name} Alert!`: 'Alert!'
                              const message = alert.message ? alert.message : `You've set an alert for ${task.name}!`
                              
                              setAlertContent({ title, message });

                              setShow(true)
                              if(alert.sound === 'silent' ) {
                                    setTimeout(() => {
                                          setShow(false)
                                    }, 10000)
                              } else {
                                    const audio = new Audio(`./src/assets/audio/${alert.sound}`);
                                    const audioPromise = audio.play()
                                    audioPromise.then(() => {
                                    setTimeout(() => {
                                          audio.volume = 0.15;
                                          audio.pause()
                                    }, 10000)  
                                    })
                                    .catch((err) => console.error(err))
                              }
                              
                              window.localStorage.setItem('alerts', JSON.stringify(alerts.filter((a: Alert) => a === alert)));
                        }

                        queue.current.delete(time)
                  }
            }, 60000)
      })

      return (
            <AnimatePresence mode='wait'>
                  {show && 
                        <motion.div
                        key='alert-modal'
                        className='modal'
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100vw', opacity: 1, transition: { duration: 0.5, ease: 'easeIn' }}}
                        exit={{ width: 0, opacity: 0, transition: { delay: 0.5, duration: 0.5, ease: 'easeIn' }}}
                        >
                       <motion.div
                              className='alert-content'
                              initial={{ opacity: 0, translateY: 100 }}
                              animate={{ opacity: 1, translateY: 0, transition: { delay: 0.5, duration: 0.5, ease: 'easeIn' }}}
                              exit={{ opacity: 0, translateY: 100, transition: { duration: 0.5, ease: 'easeIn' }}}
                        >
                              <h1 className='alert-title'>{alertContent?.title}</h1>
                              <p>{alertContent?.message}</p>
                        </motion.div>
                  </motion.div>
                  }
            </AnimatePresence>
      )
}

export default Alert