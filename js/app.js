// import * as localStorage from './local-storage.js'

const todoForm = document.querySelector('[data-js="todo-form"]')
const editForm = document.querySelector('[data-js="edit-form"]')
const todoInput = document.querySelector('[data-js="todo-input"]')
const editInput = document.querySelector('[data-js="edit-input"]')
const editBtn = document.querySelector('[data-js="edit-btn"]')
const searchInput = document.querySelector('[data-js="search-input"]')
const filterSelect = document.querySelector('[data-js="filter-select"]')
const todoList = document.querySelector('[data-js="todo-list"]')
const alertDiv = document.querySelector('.alert-item')

// const tasks = localStorage.tasks
const saveTask = () => localStorage.setItem('tasks', todoList.innerHTML)
const showTask = () => todoList.innerHTML = localStorage.getItem('tasks')


const toggleForms = () => {
  todoForm.classList.toggle('hide')
  editForm.classList.toggle('hide')
  todoList.classList.toggle('hide')
}

const addTasksIntoDom = (task) => {
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
  // editBtn.dataset.edit = `${index}`
  editBtn.innerHTML = `<i class="fa-sharp fa-solid fa-pen"></i>`
  todo.appendChild(editBtn)

  const removeBtn = document.createElement('button')
  removeBtn.classList.add('remove-todo')
  // removeBtn.dataset.trash = `${index}`
  removeBtn.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`
  todo.appendChild(removeBtn)

  const fragment = document.createDocumentFragment()

  fragment.append(todo)
  todoList.append(fragment)
  saveTask()
}

const handleAddTodoForm = event => {
  event.preventDefault()

  const inputValue = todoInput.value.trim()
  const inputIsEmpty = inputValue.length

  if (!inputIsEmpty) {
    alertDiv.classList.remove('hide')
    setTimeout(() => alertDiv.classList.add('hide'), 3000)
    return
  }

  addTasksIntoDom(inputValue)
  todoInput.value = ''
  todoInput.focus()

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

const filterTodo = event => {
  const optionValue = event.target.value

  const todos = Array.from(todoList.children)

  switch (optionValue) {
    case 'all':
      todos.forEach(todo => todo.style.display = 'flex')
      break

    case 'done':
      const doneTasks = todos.map(todo => ({
        todo,
        done: todo.classList.contains('done')
      }))
      doneTasks.forEach(({ todo, done }) => todo.style.display = done ? 'flex' : 'none')
      break

    case 'pending':
      const pendingTasks = todos.map(todo => ({
        todo,
        pending: !todo.classList.contains('done')
      }))
      pendingTasks.forEach(({ todo, pending }) =>
        todo.style.display = pending ? 'flex' : 'none')
      break
  }


}

const doneTodo = event => {
  const doneBtnWasClicked = event.target.classList.contains('finish-todo')
  const parentElement = event.target.parentElement

  if (doneBtnWasClicked) {
    parentElement.classList.toggle('done')
    saveTask()
  }

}

const editTodo = event => {
  const editBtnWasClicked = event.target.classList.contains('edit-todo')
  const parentEl = event.target.parentElement
  const firstElementChild = parentEl.firstElementChild
  const taskInputValue = firstElementChild.textContent
  const todoId = event.target.dataset.edit

  editInput.value = taskInputValue

  if (editBtnWasClicked) {
    toggleForms()

    editBtn.addEventListener('pointerdown', () => {
      const updatedTask = editInput.value
      localStorage.editTask(todoId, updatedTask)
    })
  }
}

const removeTodo = event => {
  const removeBtnWasClicked = event.target.classList.contains('remove-todo')
  const taskId = event.target.dataset.trash

  if (removeBtnWasClicked) {
    localStorage.deleteTask(taskId)
    // init()

  }
}

/*
const init = () => {
  todoList.innerHTML = ''
  tasks.forEach(addTasksIntoDom)
}
*/

showTask()

todoForm.addEventListener('submit', handleAddTodoForm)
searchInput.addEventListener('input', searchTodo)
filterSelect.addEventListener('change', filterTodo)
todoList.addEventListener('pointerdown', doneTodo)
todoList.addEventListener('pointerdown', editTodo)
todoList.addEventListener('pointerdown', removeTodo)