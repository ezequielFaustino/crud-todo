export const getLocalStorage = () => JSON.parse(localStorage.getItem('tasks')) || []

export const saveTasks = task => {
  const todos = getLocalStorage()
  todos.push({task, done: 0})

  localStorage.setItem('tasks', JSON.stringify(todos))
  
  return todos
} 

// export const deleteTask = index => {
//   const currentTasks = tasks
//   currentTasks.splice(index, 1)
//   updateLocalStorage()
// }

// export const editTask = (index, updatedTask) => {
//   let currentTask = tasks
//   currentTask[index] = {task: updatedTask}
//   updateLocalStorage()

// }

// export const updateLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks))
