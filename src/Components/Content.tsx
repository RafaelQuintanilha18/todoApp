import styles from './Content.module.css'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tasks from './Tasks'
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export default function Content() {

  interface TasksProps {
    id: string;
    title: string,
    isCompleted: boolean,
  }

  const [tasks, setTasks] = useState<TasksProps[]>([])

  const [newTaskText, setNewTaskText] = useState('')

  function handleNewTaskText(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newTask = {
      id: uuidv4(),
      title: newTaskText,
      isCompleted: false,
    }
    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  function handleTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Hey, don't forget to add your task here first!")
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id;
    })
    setTasks(tasksWithoutDeletedOne)
  }

  function toggleCompleteTask(taskId: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted
        };
      }
      return task;
    })
    setTasks(updatedTasks)
  }

  const allTasksDone = tasks.filter(task => task.isCompleted)
  return (
    <div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleNewTask}>
          <input
            type="text"
            placeholder='What do you need to-do today?'
            name="title"
            onChange={handleNewTaskText}
            value={newTaskText}
            required
            onInvalid={handleTaskInvalid}
          />
          <button >
            Add Task <AddCircleOutlineIcon sx={{ fontSize: 18}} />
          </button>
        </form>
      </div>

      <div className={styles.tasksContainer}>

        <div className={styles.tasksCounter}>
          <p>Tasks Available <span>{tasks.length}</span></p>
          <p>Completed <span>{allTasksDone.length} of {tasks.length}</span></p>
        </div>

      {tasks.length === 0 ?
        <div className={styles.noTasksContainer}>
          <img src="Clipboard.svg" alt="" />
          <p><strong>You don't have any tasks at the moment</strong> <br />
          Start organizing your to-dos creating a new task 😄</p>
        </div>
        :
        <div className={styles.tasksList}>
        {tasks.map(task => {
          return (
            <Tasks
              key={task.id}
              id={task.id}
              title={task.title}
              isCompleted={task.isCompleted}
              onDeleteTask={deleteTask}
              onToggleCompleted={toggleCompleteTask}

            />
          )
        })}
        </div>
      }
      </div>
    </div>
  )
}
