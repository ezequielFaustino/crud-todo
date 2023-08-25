const getLocalStorage = () => JSON.parse(localStorage.getItem('tasks')) ?? []
const setLocalStorage = tasks => localStorage.setItem('tasks', JSON.stringify(tasks))

export const readTasks = () => getLocalStorage()

export const createTask = task => {
  const newTask = getLocalStorage()
  newTask.push(task)
  setLocalStorage(newTask)
}