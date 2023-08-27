import * as localStorage from './local-storage.js'

const todoForm = document.querySelector('[data-js="todo-form"]')
const todoInput = document.querySelector('[data-js="todo-input"]')
const searchInput = document.querySelector('[data-js="search-input"]')
const todoList = document.querySelector('[data-js="todo-list"]')

const tasks = localStorage.tasks

const addTasksIntoDom = ({ task }, index) => {
  const todo = document.createElement('div')
  todo.classList.add('todo')

  const h3 = document.createElement('h3')
  h3.textContent = `${task}`
  todo.appendChild(h3)

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
  removeBtn.dataset.trash = `${index}`
  removeBtn.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`
  todo.appendChild(removeBtn)

  const fragment = document.createDocumentFragment()

  fragment.append(todo)
  todoList.append(fragment)
}


const handleFormSubmit = event => {
  event.preventDefault()

  const inputValue = todoInput.value.trim()
  const inputIsEmpty = inputValue.length

  if (!inputIsEmpty) {
    alert('vazio')
    return
  }

  localStorage.createTask(inputValue)
  localStorage.updateLocalStorage()
  init()
  todoInput.value = ''

}


const searchTodo = event => {
  const searchValue = event.target.value.toLowerCase().trim()
  const todos = Array.from(todoList.children).map(todo => ({
    todo,
    shouldBeVisible: todo.textContent.toLowerCase().includes(searchValue)
  }))

  todos.forEach(({ todo, shouldBeVisible }) => {
    todo.classList.add(shouldBeVisible ? 'flex' : 'hide')
    todo.classList.remove(shouldBeVisible ? 'hide' : 'flex')
  })

}

const doneTodo = event => {
  const doneBtnWasClicked = event.target.classList.contains('finish-todo')
  const parentElement = event.target.parentElement

  if (doneBtnWasClicked) {
    parentElement.classList.toggle('done')
  }
}

const removeTodo = event => {
  const removeBtnWasClicked = event.target.classList.contains('remove-todo')
  const taskId = event.target.dataset.trash

  if(removeBtnWasClicked) {
    localStorage.deleteTask(taskId)
    init()

  }
}


const init = () => {
  todoList.innerHTML = ''
  tasks.forEach(addTasksIntoDom)
}

init()
todoForm.addEventListener('submit', handleFormSubmit)
searchInput.addEventListener('input', searchTodo)
todoList.addEventListener('pointerdown', doneTodo)
todoList.addEventListener('pointerdown', removeTodo)