import styles from './Tasks.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface TasksProps {
  id: string,
  title: string,
  isCompleted: boolean,
  onDeleteTask: (id: string) => void;
  onToggleCompleted: (taskId: string) => void;
}

export default function Tasks({ id, title, isCompleted, onDeleteTask, onToggleCompleted}: TasksProps) {

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  function handleTaskDone() {
    onToggleCompleted(id)
  }

  return (
        <div className={styles.task}>
          {isCompleted ? <CheckCircleOutlineIcon onClick={handleTaskDone} className={styles.taskChecked}/> : <RadioButtonUncheckedIcon onClick={handleTaskDone} className={styles.taskTodo}/>}
          <p className={isCompleted ? styles.textCompleted : ""}>{title}</p>
          <DeleteIcon onClick={handleDeleteTask} sx={{fontSize: 20}}/>
        </div>
  )
}
