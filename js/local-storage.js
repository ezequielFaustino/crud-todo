const getLocalStorage = JSON.parse(localStorage.getItem('tasks'))

export const tasks = localStorage
  .getItem('tasks') !== null ? getLocalStorage : []

export const createTask = taskName => tasks.push({task: taskName})

export const deleteTask = index => {
  const currentTasks = tasks
  currentTasks.splice(index, 1)
  updateLocalStorage()
}

export const editTask = (index,) => {
  let currentTasks = tasks
  console.log(currentTasks[index])
  updateLocalStorage()

}

export const updateLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks))
