import '@/styles/reorder.css'


import { useEffect, useState, useRef, useTransition } from 'react'
import { useNavigate } from 'react-router'
// @ts-expect-error no types
import Sortable from 'sortablejs'

import transition from "@/components/Transitions/PageTransition";
import TaskItem from '@/components/ReorderTasks/TaskItem'
import CompleteTask from '@/components/Shared/CompleteTask';

import confirm from '@/images/confirm1.svg'
import cancel from '@/images/cancel2.svg'

function ReorderTasks() {
      const navigate = useNavigate()
      
      const [tasks, setTasks] = useState<Task[]>(window.localStorage.getItem('tasks') ? JSON.parse(window.localStorage.getItem('tasks') as string) : []);
      const sortable = useRef<typeof Sortable | null>(null);
      const [complete, setComplete] = useState<boolean>(false);
      const [deleting, startTransition] = useTransition()

      const saveOrder = () => {
            const newList: Task[] = []
            const listItems = document.querySelectorAll('.task-item');

            listItems.forEach((item) => {
                  const task = tasks[parseInt(item.id)];
                  newList.push(task!)
            })

            window.localStorage.setItem('tasks', JSON.stringify(newList))

            setComplete(true);
      }

      useEffect(() => {
            if(!sortable.current) {
                  const list = document.getElementById('reorder-tasks') as HTMLUListElement

                  sortable.current = Sortable.create(list, {
                  handle: '.task-handle',
                  animation: 150
                  })
            }
      }, [])

      return transition(
            <div id='reorder'>
                  <h1 id='reorder-title'>One At A Time</h1>
                  <ul id='reorder-tasks'>
                              {tasks.length > 0 ? tasks.map((task, index) => (
                                    <TaskItem key={index} task={task} index={index} setTasks={setTasks} deleting={deleting} startTransition={startTransition}/>
                              )) : <TaskItem task={{ name: 'You have no tasks!', description: ''}} index={-1} setTasks={setTasks} />}
                  </ul>
                  <div id='reorder-navigation'>
                        <img id='reorder-cancel' src={cancel} alt='red cancel' onClick={()=>navigate('/')}/>
                        <img id='reorder-confirm' src={confirm} alt='green confirm' onClick={saveOrder}/>
                  </div>
                  {complete && <CompleteTask setComplete={setComplete} save={true}/>}
            </div>
      );
}


export default ReorderTasks