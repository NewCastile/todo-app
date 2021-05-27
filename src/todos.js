import {checkTodoListener, deleteTodoListener, openEditTodoFormListener} from './eventListeners.js'
import {getActive} from './logic.js'
import {projects} from './index.js'

const todoList = document.querySelector('.todo-list')

function renderTodo(todo) {
    let element = document.createElement('div')
    let todoInfo = document.createElement('div')
    let todoButtons = document.createElement('div')
    let todoDescription = document.createElement('span')
    let todoDate = document.createElement('span')
    let todoPriority = document.createElement('span')
    let todoCheckLabel = document.createElement('label')
    let deleteBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    let checkBtn = document.createElement('input')

    todoDescription.innerText = `${todo.description}`
    todoDate.innerText = `${todo.dueDate}`
    todoPriority.innerText = `${todo.priority}`
    deleteBtn.innerText = `Delete`
    editBtn.innerText = `Edit`

    checkBtn.type = 'checkbox'

    element.classList.add('todo')
    todoInfo.classList.add('info')
    todoButtons.classList.add('buttons')
    deleteBtn.classList.add('btn')
    deleteBtn.classList.add('delete-btn')
    editBtn.classList.add('btn')
    editBtn.classList.add('edit-btn')
    checkBtn.classList.add('check-btn')
    element.id = todo.id

    todoInfo.appendChild(todoDescription)
    todoInfo.appendChild(todoDate)
    todoInfo.appendChild(todoPriority)
    
    todoCheckLabel.appendChild(checkBtn)
    if (todo.check) {
        checkBtn.checked = true
        checkBtn.classList.add('checked')
        todoCheckLabel.append(`Done`)
    } else if (!todo.check) {
        checkBtn.checked = false
        todoCheckLabel.append(`Not Done`)
    }

    todoInfo.appendChild(todoCheckLabel)

    todoButtons.appendChild(editBtn)
    todoButtons.appendChild(deleteBtn)    

    element.appendChild(todoInfo)
    element.appendChild(todoButtons)
    return element
}

function renderTodoList() {
    todoList.innerHTML = ``
    let activeProject = getActive()
    let todosProject = projects.findIndex(p => p.id == activeProject.id)
    projects[todosProject].todos.forEach(todo => {
        let item = renderTodo(todo)
        todoList.appendChild(item)
    })
    checkTodoListener()
    deleteTodoListener()
    openEditTodoFormListener()
}

export { renderTodoList }