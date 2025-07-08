import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import confirm from '@/images/confirm2.svg'
import transition from '@/components/Transitions/AddTaskTransition'

function Redirect() {
      const navigate = useNavigate()
      const [searchParams] = useSearchParams()
      const edit = searchParams.get('edit')

      const timeout = useRef<NodeJS.Timeout | null>(null)

      const manualRedirect = () => {
            clearTimeout(timeout.current!)
            if(!edit) navigate('/')
            else navigate('/reorder')
      }

      useEffect(() => {
            timeout.current = setTimeout(() => {
                  if(!edit) navigate('/')
                  else navigate('/reorder')
            }, 3000)
      })

      return transition(
            <div id='redirect' className='add-task-style' key='redirect'>
                  <h1>Redirecting...</h1>
                  <p>Click the check mark if it doesn't automatically redirect</p>
                  <img id='redirect-confirm' src={confirm} alt='green confirm' onClick={manualRedirect} />
            </div>
      , 'redirect')
}

export default Redirect