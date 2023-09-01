export const getLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []
  return tasks
}

const generateRandomID = () => Math.round(Math.random() * 1000)

export const saveTasks = (task) => {
  const tasks = getLocalStorage()
  tasks.push({ id: generateRandomID(), task, done: 0 })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export const updateTodoStatusLocalStorage = taskName => {
  const tasks = getLocalStorage()

  tasks.map(todo => todo.task === taskName ? (todo.done = !todo.done) : null)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export const deleteTask = ID => {
  const tasks = getLocalStorage()
  const filteredTasks = tasks.filter(({ id }) => id !== ID)

  localStorage.setItem('tasks', JSON.stringify(filteredTasks))
}

export const editTask = (id, updatedTask) => {
  const tasks = getLocalStorage()
  tasks.map(todo => todo.id === id ? (todo.task = updatedTask) : null)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

