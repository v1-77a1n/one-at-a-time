import '@/styles/taskcard.css'

function TaskCard({ task }: { task: Task }) {
      const taskDesc = task.description.length > 0 ? task.description : 'No description';
      return (
            <div id='task-card'>
                  <h1 id='task-name'>{task.name}</h1>
                  <p id='task-description'>{taskDesc}</p>
            </div>
      )
}

export default TaskCard