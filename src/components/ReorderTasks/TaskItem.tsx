import '@/styles/taskitem.css'

import { useNavigate } from 'react-router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import handle from '@/images/handle.svg'
import trash from '@/images/delete.svg'
import edit from '@/images/edit.svg'

type TaskItemProps = {
      task: Task,
      index: number,
      setTasks: (tasks: Task[]) => void,
      deleting?: boolean,
      startTransition?: React.TransitionStartFunction
}

function TaskItem({task, index, setTasks, deleting, startTransition }: TaskItemProps) {
      const navigate = useNavigate()
      const [show, setShow] = useState<boolean>(true);

      deleting = deleting ? deleting : false
      startTransition = startTransition ? startTransition : () => {}

      const deleteTask = () => {
            setShow(false);
            const stored = window.localStorage.getItem('tasks')
            const storedAlerts = window.localStorage.getItem('alerts')

            const tasks = stored ? JSON.parse(stored) : [];
            if(!stored) return

            const alerts = storedAlerts ? JSON.parse(storedAlerts) : []

            const filtered = tasks.filter((_task: Task, tIndex: number) => tIndex !== index)

            const filteredAlerts = alerts.filter((alert: Alert) => alert.task !== index);

            window.localStorage.setItem('tasks', JSON.stringify(filtered));
            window.localStorage.setItem('alerts', JSON.stringify(filteredAlerts));

            setTimeout(() => {
                  if(filtered.length === 0) setTasks([]);
            }, 1000)
      }

      const editTask = () => navigate(`/add-task?edit=${index}`);

      return (
            <AnimatePresence mode='wait'>
                  {show && 
                        <motion.li
                              key={index} 
                              id={index.toString()} 
                              className='task-item'
                              initial={{ opacity: 0, translateY: 100 }}
                              animate={{ opacity: 1, translateY:  0}}
                              exit={{ opacity: 0, translateY: 100}}
                              transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                        <img className='task-handle' src={handle} alt='handle' />
                        <div className='task-body'>
                              <p>{task.name}</p>
                              {index !== -1 ? <div className='task-item-actions'>
                                    <img className='task-delete-icon' src={trash} alt='delete'  {...!deleting ? {onClick: () => startTransition(deleteTask)} : {}} />
                                    <img className='task-edit-icon' src={edit} alt='edit' {...!deleting ? { onClick: () => editTask() } : {}}/>
                              </div> : null}
                        </div>
                  </motion.li>}
            </AnimatePresence>
      )
}

export default TaskItem