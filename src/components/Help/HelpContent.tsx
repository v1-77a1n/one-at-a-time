import { useLocation } from 'react-router'

import { helpModal } from '@/components/Transitions/HelpTransitions'
import Button from '@/components/Shared/Button'

import { type JSX } from 'react'

function HelpContent({setHelpOpen, setRender}: {setHelpOpen: (open: boolean) => void, setRender: (render: boolean) => void}) {
      const location = useLocation()
      const content = new Map<string, JSX.Element>([
            ['/', <>
                  Focus on one task at a time with One At A Time!<br /><br />
                  Use the buttons below the task card to add,shuffle, reorder your tasks, or clear all tasks!<br /><br />
                  Completed a task? Click on the checkmark to complete it.
            </>
            ],
            ['/add-task', <>
                  Adding a task is simple. Give it a name and a short description!<br /><br />
                  You'll also have the option of adding an alert to your task. Choose a sound, time, and a message for your alert.<br /><br />
            </>
            ],
            ['/reorder', <>
                  You can reorder your tasks with drag and drop, delete them, or edit them!<br /><br />
                  Deleting a task will also delete the alert for that task if it exists.
                  <br /><br />
                  While your edits and deletions are instantly saved, your reorder is only saved when you click the green checkmark.
            </>
            ]
      ])

      const handleClose = () => {
            setRender(false);
            setTimeout(() => {
                  setHelpOpen(false)
            }, 1000)
      }

      return helpModal(
            <div id='help-content'>
                  <h1>Help</h1>
                  <p>
                        {content.get(location.pathname)}
                  </p>
                  <Button type='task' id='help-close' color='red' text='Close' onClick={handleClose} />
            </div>
      )
}

export default HelpContent