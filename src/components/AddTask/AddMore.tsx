import confirm from '@/images/confirm2.svg'
import cancel from '@/images/cancel1.svg'
import transition from '@/components/Transitions/AddTaskTransition'

function AddMore({setStep, setShow}: AddTaskProps) {
      const handleClick = (step: number) => {
            setShow(false);
            setTimeout(() => setStep(step), 500)
      }
      return transition(
            <div className='add-task-style' key='more'>
            <h1>add another task?</h1>
            <div id='alert-prompt-btns'>
                  <img id='add-alert-confirm' src={confirm} alt='green confirm' onClick={handleClick.bind(null, 0)} />
                  <img id='add-alert-cancel' src={cancel} alt='red cancel' onClick={handleClick.bind(null, 4)} />
            </div>
      </div>
      , 'add-more')
}

export default AddMore