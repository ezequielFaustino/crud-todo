const getLocalStorage = JSON.parse(localStorage.getItem('tasks'))

export const tasks = localStorage
  .getItem('tasks') !== null ? getLocalStorage : []

export const createTask = taskName => tasks.push({task: taskName})

export const updateLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks))
