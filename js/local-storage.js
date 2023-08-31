const getLocalStorage = JSON.parse(localStorage.getItem('tasks'))

export const tasks = localStorage
  .getItem('tasks') !== null ? getLocalStorage : []

export const createTask = taskName => tasks.push({task: taskName})

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
