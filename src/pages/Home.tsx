import '@/styles/home.css'

import { useNavigate } from 'react-router'
import { useEffect, useState, lazy } from 'react'

import transition from '@/components/Transitions/PageTransition'
import TaskCard from '@/components/Home/TaskCard'
import Button from '@/components/Shared/Button'
import confirm from '@/images/confirm1.svg'

const CompleteTask = lazy(() => import('@/components/Shared/CompleteTask'))

function Home() {
      const [tasks, setTasks] = useState<Task[]>([])
      const [complete, setComplete] = useState<boolean>(false)
      const navigate = useNavigate()
      
      const addClick = () => {
            navigate('/add-task');
      }
      
      const shuffle = (array: Task[]) => {
            if(array.length === 0 || array.length === 1) return
            const shuffled = [...array];
            for(let i = array.length - 1; i > 0; i--) {
                  const j = Math.floor(Math.random() * (i + 1));
                  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            window.localStorage.setItem('tasks', JSON.stringify(shuffled));
            setTasks(shuffled);
      }

      const clearClick = () => {
            localStorage.removeItem('tasks');
            localStorage.removeItem('alerts');
            setTasks([]);
      }

      const completeClick = () => {
            if(tasks.length === 0) return
            setTasks(tasks.slice(1));
            localStorage.setItem('tasks', JSON.stringify(tasks.slice(1)));
            setComplete(true);
      }
      
      const reorderClick = () => navigate('/reorder')

      useEffect(() => {
            const stored = localStorage.getItem('tasks')
            setTasks(stored ? JSON.parse(stored) : []);
      }, [])

      return transition(
            <div id='home-page'>
                  <h1 id='home-title'>One At A Time</h1>
                  {tasks.length > 0 ? <TaskCard task={{name: tasks[0].name, description: tasks[0].description}} /> : <TaskCard task={{name: 'No Tasks!', description: 'Either you have done all that you have set out to do, or you have not added any tasks.'}} />}
                  <div id='home-buttons'>
                        <Button type='home' id='home-add' text='Add' onClick={addClick} />
                        <Button type='home' id='home-shuffle' text='Shuffle' onClick={() => shuffle(tasks)}/>
                        <Button type='home' id='home-clear' text='Clear All' onClick={clearClick}/>
                        <Button type='home' id='home-reorder' text='Reorder' onClick={reorderClick}/>
                        <img id='home-confirm' src={confirm} alt='confirm' onClick={completeClick}/>
                  </div>
                  {complete && <CompleteTask setComplete={setComplete} />}
            </div>
      )
}

export default Home