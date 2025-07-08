import help from '@/images/help.svg'
import { btnTransition } from '@/components/Transitions/HelpTransitions'

function HelpBtn({setHelpOpen, setRender}: {setHelpOpen: (open: boolean) => void, setRender: (render: boolean) => void}) {

      const handleClick = () => {
            setHelpOpen(true);
            setTimeout(() => {
                  setRender(true)
            }, 600)
      }
      return btnTransition(
            <img id='help-btn' src={help} alt='help' onClick={handleClick}/>
      )
}

export default HelpBtn