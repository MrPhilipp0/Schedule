import React  from 'react';
import Task from './Task';
import { TaskContext } from '../Context/TaskToContext';
import { useLocation } from 'react-router-dom';

const TasksList = () => {

  const location = useLocation();
  const idDay = location.pathname.slice(16);
  
  const {tasksList, setTasksList} = React.useContext(TaskContext);

  const [dayTasks, setDayTasks] = React.useState(tasksList.filter(day => day.idDay === idDay)[0]);

  let array = []; // pomocnicza tablica w celu aktualizacji stanu
  let array2 = [...tasksList];
  let index = null;

  const updateTasksList = () => {
    index = array2.findIndex(item => item.idDay === idDay);
    array2[index].tasks = array;
    setTasksList(tasks => array2);
  }

  const handleSaveTask = (id, shortName, text) => { //aktualizacja stanu tasków
    array = [...dayTasks.tasks];
    index = array.findIndex(item => item.id === id);
    array[index].shortName = shortName;
    array[index].text = text;
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  const handleDeleteTask = (id) => { //usuwanie taska
    array = [...dayTasks.tasks];
    array = array.filter(task => task.id !== id);
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  const handleCheckbox = (id, value) => {
    array = [...dayTasks.tasks];
    index = array.findIndex(item => item.id === id);
    array[index].checked = value;
    setDayTasks(tasks => ({
      idDay: idDay,
      tasks: array,
    }));
    updateTasksList();
  }

  // Wyświetlanie wszystkich zadań (aktualnie wszystkich, później z danego dnia)
  const Tasks = () => dayTasks.tasks.map(task => <Task key={task.id} id={task.id} shortName={task.shortName} text={task.text} checkbox={task.checked} save={handleSaveTask} delete={handleDeleteTask} check={handleCheckbox}/>)

  return (
    <div>
      {dayTasks && Tasks()}
    </div>
  );
}
 
export default TasksList;