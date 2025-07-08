import Button from "@/components/Shared/Button";
import { useSearchParams } from "react-router";
import transition from "@/components/Transitions/AddTaskTransition";

function AlertForm({setStep, setShow}: AddTaskProps) {
      const [searchParams] = useSearchParams()

      const edit = searchParams.get('edit')
      const alerts = JSON.parse(window.localStorage.getItem('alerts') || '[]') as Alert[];

      const alert = edit ? alerts.find((alert: Alert) => alert.task === parseInt(edit)) : null

      const currentTime = new Date().toTimeString().slice(0, 5);

      const messageOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const msgCount = document.getElementById('alert-msg-count')!;
            msgCount.textContent = `${e.target.value.length}/70`;

            msgCount.style.color = e.target.value.length === 70 ? 'red' : 'black';
      }

      const handleSubmit = (data: FormData) => {
            const sound = data.get('sound') as string
            const time = data.get('time') as string
            const message = data.get('message') as string
            
            if(!edit) {
                  const tasks = JSON.parse(window.localStorage.getItem('tasks')!);

                  const id = tasks.length - 1

                  alerts.push({ task: id, sound: sound, time: time, message: message });
                  window.localStorage.setItem('alerts', JSON.stringify(alerts));
            } else {
                  const alertIndex = alerts.indexOf(alert as Alert)
                  if(alertIndex < 0) {
                        alerts.push({ task: parseInt(edit), sound: sound, time: time, message: message });
                  } else {
                        alerts[alertIndex] = { task: parseInt(edit), sound: sound, time: time, message: message };
                  }
            }

            window.localStorage.setItem('alerts', JSON.stringify(alerts));
            setShow(false);
            setTimeout(() => setStep(edit ? 4 : 3), 500)
      }

      return transition(
            <form action={handleSubmit} id='add-alert-form' className='add-task-style' key='alert-form'>
                  <label htmlFor='sound'>sound</label>
                  <select id='sound' name='sound' defaultValue={alert ? alert.sound : ''}required>
                        <option>select a sound</option>
                        <option value='silent'>Silent</option>
                        <option value='are-you-sleeping-anastasia-chubarova.mp3'>Are You Sleeping - Anastasia Chubarova</option>
                        <option value='breaking-news-logigram.mp3'>Breaking News - logigram</option>
                        <option value='sci-fi-intro-ribhav-agrawal.mp3'>Sci-Fi Intro - Ribhav Agrawal</option>
                        <option value='sport-motivational-ludr3d.mp3'>Sport Motivational - ludr3d</option>
                  </select>
                  <label htmlFor='message'>set a time</label>
                  <input type='time' id='time' name='time' min={currentTime} max='23:59:59' defaultValue={alert ? alert.time : ''} required />
                  <label htmlFor='message'>message</label>
                  <div className='input-group'>
                        <input type='text' id='message' name='message'
                        maxLength={70} autoComplete="off" placeholder='Leave yourself a little message if you want' defaultValue={alert ? alert.message : ''} onChangeCapture={messageOnChange} />
                        <p className='input-limit'>character limit: 70</p>
                        <p id='alert-msg-count' className='character-count'>0/70</p>
                  </div>
                  <div id='add-task-buttons'>
                        <Button type='task' color='green' text='Set Alert' submit={true} />
                        <Button type='task' color='red' text='Cancel' onClick={() => setStep(3)} />
                  </div>
            </form>
      , 'alert-form')
}

export default AlertForm