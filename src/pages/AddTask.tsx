import '@/styles/addtask.css'

import { useState, lazy, useEffect } from "react";
import { AnimatePresence } from 'motion/react'

import transition from "@/components/Transitions/PageTransition";
import TaskForm from "@/components/AddTask/TaskForm";
import AlertPrompt from '@/components/AddTask/AlertPrompt';
import Redirect from '@/components/AddTask/Redirect';
import AddMore from '@/components/AddTask/AddMore';

const AlertForm = lazy(() => import('@/components/AddTask/AlertForm'))

function AddTask() {
      const [step, setStep] = useState<number>(0);
      const [show, setShow] = useState<boolean>(true)
      const header = ['Add a Task', 'Add an Alert?', 'Customize Alert', 'Add More?', 'All Done! Redirecting...'];

      const content = [<TaskForm setStep={setStep} setShow={setShow} />, <AlertPrompt setStep={setStep} setShow={setShow} />, <AlertForm setStep={setStep} setShow={setShow} />, <AddMore setStep={setStep} setShow={setShow} />, <Redirect />];

      useEffect(() => {
            if(!show) setTimeout(() => setShow(true), 600)
      }, [show])

      return transition(
            <div id='add-task'>
                  <h1 id='add-task-title'>One At A Time</h1>
                  <div id='add-task-header'>
                        <h3>{header[step]}</h3>
                  </div>
                  <div id='add-task-content'>
                        <AnimatePresence mode='wait'>
                              {show && content[step]}
                        </AnimatePresence>
                  </div>
            </div>
      );
}


export default AddTask
