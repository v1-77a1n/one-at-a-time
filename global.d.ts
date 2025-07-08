declare global {
      type Task = {
            name: string,
            description: string
      }

      type Alert = {
            task: number,
            sound: string,
            time: string,
            message?: string
      }

      type AddTaskProps = {
            setStep: (step: number) => void,
            setShow: (show: boolean) => void
      }
}

export {}