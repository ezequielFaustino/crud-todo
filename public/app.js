import * as localStorage from './local-storage.js'

const readTasks = localStorage.readTasks()
const todoForm = document.querySelector('[data-js="todo-form"]')
const todoInput = document.querySelector('[data-js="todo-input"]')
const todoList = document.querySelector('[data-js="todo-list"]')

const addTasksIntoDom = tasks => {
  const todo = document.createElement('div')
  todo.classList.add('todo')

  const task = document.createElement('h3')
  task.textContent = `${tasks.task}`
  todo.appendChild(task)

  const finishBtn = document.createElement('button')
  finishBtn.classList.add('finish-todo')
  finishBtn.innerHTML = `<i class="fa-sharp fa-solid fa-check"></i>`
  todo.appendChild(finishBtn)

  const editBtn = document.createElement('button')
  editBtn.classList.add('edit-todo')
  editBtn.innerHTML = `<i class="fa-sharp fa-solid fa-pen"></i>`
  todo.appendChild(editBtn)

  const removeBtn = document.createElement('button')
  removeBtn.classList.add('remove-todo')
  removeBtn.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`
  todo.appendChild(removeBtn)

  const fragment = document.createDocumentFragment()
  
  fragment.append(todo)
  todoList.append(fragment)
}

const handleFormSubmit = event => {
  event.preventDefault()

  const inputValue = todoInput.value
  console.log(inputValue);
}

const init = () => {
  readTasks.forEach(addTasksIntoDom)
}

init()
todoForm.addEventListener('submit', handleFormSubmit)