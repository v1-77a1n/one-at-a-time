import { useNavigate, useSearchParams } from "react-router"
import transition from '@/components/Transitions/AddTaskTransition'
import Button from "@/components/Shared/Button"

function TaskForm({ setStep, setShow }: AddTaskProps) {
      const [searchParams] = useSearchParams()
      const edit = searchParams.get('edit')
      const task = edit ? JSON.parse(window.localStorage.getItem('tasks') || '[]')[edit] : null
      
      const navigate = useNavigate()
      const cancelClick = () => navigate('/');

      const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const titleCount = document.getElementById('title-count')!;
            titleCount.textContent = `${e.target.value.length}/70`;

            if(e.target.value.length === 70) {
                  titleCount.style.color = 'red';
            } else {
                  titleCount.style.color = 'black';
            }
      }

      const descOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const descCount = document.getElementById('desc-count')!;
            descCount.textContent = `${e.target.value.length}/150`;

            if(e.target.value.length === 150) {
                  descCount.style.color = 'red';
            } else {
                  descCount.style.color = 'black';
            }
      }

      const handleSubmit = (data: FormData) => {
            const tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');

            let alertFound: Alert | undefined

            if(!edit) {
                  tasks.push({ name: data.get('name') as string, description: data.get('description') as string });
                  window.localStorage.setItem('tasks', JSON.stringify(tasks));

            } else {
                  tasks[edit] = { name: data.get('name') as string, description: data.get('description') as string };
                  window.localStorage.setItem('tasks', JSON.stringify(tasks));
      
                  const alerts = JSON.parse(window.localStorage.getItem('alerts') || '[]');
      
                  alertFound = alerts.find((alert: Alert) => alert.task === parseInt(edit!));
      
                  setStep(alertFound ? 2 : 1);
            }

            setShow(false);
            setTimeout(() => {
                  setStep(!edit || (edit && !alertFound) ? 1 : 2);
            }, 500)
      }

      return transition(
            <form action={handleSubmit} id='add-task-form' className='add-task-style'>
            <label htmlFor='name'>name</label>
            <div className='input-group'>
                  <input type='text' id='name' name='name' maxLength={70} defaultValue={task ? task.name : ''} autoComplete="off" required onChangeCapture={titleOnChange}/>
                  <p id='title-count' className='character-count' >0/70</p>
                  <p className='input-limit'>character limit: 70</p>
            </div>
            
            <label htmlFor='description'>description</label>
            <div className='input-group'>
                  <textarea title='description' id='description' name='description' rows={3} maxLength={150} defaultValue={task ? task.description : ''} placeholder='(Optional): Give your task a short description.' autoComplete="off" onChangeCapture={descOnChange}/>
                  <p id='desc-count' className='character-count' >0/150</p>
                  <p className='input-limit'>character limit: 150</p>
            </div>
            
            <div id='add-task-buttons'>
                  <Button type='task' id='add-task-add' color='green' text='Add' submit={true} />
                  <Button type='task' id='add-task-add' color='red' text='Cancel' onClick={cancelClick} />
            </div>
      </form>
      , 'task-form')
}

export default TaskForm