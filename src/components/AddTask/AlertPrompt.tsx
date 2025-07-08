import { useSearchParams } from 'react-router'
import confirm from '@/images/confirm2.svg'
import cancel from '@/images/cancel1.svg'
import transition from '@/components/Transitions/AddTaskTransition'

function AlertPrompt({setStep, setShow}: AddTaskProps) {
      const [searchParams] = useSearchParams()

      const handleClick = (step: number) => {
            setShow(false)

            setTimeout(() => setStep(step), 500)
      }

      const edit = searchParams.get('edit')

      return transition(
            <div className='add-task-style'>
                  <h1>add an alert?</h1>
                  <div id='alert-prompt-btns'>
                        <img id='add-alert-confirm' src={confirm} alt='green confirm' onClick={handleClick.bind(null, 2)} />
                        <img id='add-alert-cancel' src={cancel} alt='red cancel' onClick={handleClick.bind(null, edit ? 4 : 3)} />
                  </div>
            </div>
      , 'alert-prompt')
}

export default AlertPrompt
