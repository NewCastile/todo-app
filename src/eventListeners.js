import {createProjectForm, createTodoForm} from "./form.js"
import { projects } from "./index.js"
import * as logic from "./logic.js"
import { renderProjectList } from "./projects.js"
import { renderTodoList } from "./todos.js"

const projectItems = document.querySelector('.rendered-list')
const addTodoBtn = document.querySelector('.add-todo-btn')
const addProjectBtn = document.querySelector('.add-project-btn')
const cardContent = document.querySelector('.card-content')
const todoList = document.querySelector('.todo-list')

//Handlers
function addProjectHandler(event) {
    event.preventDefault()
    let form = document.querySelector('.add-project-form')
    let data = new FormData(form)
    if (data.get('name') == '' || undefined) {
        return alert('You must enter a name')
    }
    let project= logic.protoProject(
        data.get('name'),
        Date.now().toString()
    )
    logic.addProject(project)
    form.reset()
    form.remove()
    addProjectBtn.style.display = 'block'
}

function deleteProjectHandler(event) {
    event.preventDefault()
    let selectedProjectId = event.target.parentElement.parentElement.id
    logic.deleteProject(selectedProjectId)
}

function editProjectHandler(editedProjectId) {
    let form = document.querySelector('.edit-project-form')
    let data = new FormData(form)
    let project = {
        'name': data.get('name')
    }
    logic.editProject(project, editedProjectId)
    form.reset()
    form.remove()
}

function addTodoHandler(event) {
    event.preventDefault()
    let form = document.querySelector('.add-todo-form')
    let data = new FormData(form)
    if ([...data.values()].some(d => d == '' || undefined)) {
        return alert('You must complete all fields')
    }
    let todo = logic.protoTodo(
        data.get('description'),
        data.get('dueDate'),
        data.get('priority'),
        false,
        Date.now().toString()
    )
    logic.addTodo(todo)
    form.reset()
    form.remove()
    addTodoBtn.style.display = 'block'
}

function deleteTodoHandler(event) {
    event.preventDefault()
    let selectedTodo = event.target.parentElement.parentElement
    logic.deleteTodo(selectedTodo)
}

function checkTodoHandler(event) {
    event.preventDefault()
    event.target.classList.toggle('checked')
    logic.checkTodo(event.target.parentElement.parentElement.parentElement)
}

function editTodoHandler(id) {
    let form = document.querySelector('.edit-todo-form')
    let data = new FormData(form)
    let todo = {
        'description': data.get('description'),
        'dueDate': data.get('dueDate'),
        'priority': data.get('priority')
    }
    logic.editTodo(todo, id)
    form.reset()
    form.remove()
}

function goBackBtnHandler(event) {
    event.preventDefault()
    let btnForm = event.target.parentElement.parentElement
    let formType = btnForm.classList.item(0)
    btnForm.reset()
    btnForm.remove()
    switch(formType) {
        case 'edit-todo-form':
            renderTodoList()
            break
        case 'edit-project-form':
            renderProjectList()
            break
        case 'add-todo-form':
            addTodoBtn.style.display = 'block'
            break
        case 'add-project-form':
            addProjectBtn.style.display = 'block'
            break
    }
}

function renderActiveProjectHandler(event) {
    if (event.target.classList.contains('project')) {
        logic.setActive(event.target)
    }
}

//Listeners
function addProjectListener() {
    let form = document.querySelector('.add-project-form')
    let button = document.querySelector('.go-back-btn')
    form.addEventListener('submit', addProjectHandler)
    button.addEventListener('click', goBackBtnHandler)
}

function editProjectListener() {
    let form = document.querySelector('.edit-project-form')
    let button = document.querySelector('.go-back-btn')
    let editedProjectId = form.parentElement.id
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        editProjectHandler(editedProjectId)
    })
    button.addEventListener('click', goBackBtnHandler)
}

function addTodoListener() {
    let form = document.querySelector('.add-todo-form')
    let button = document.querySelector('.go-back-btn')
    form.addEventListener('submit', addTodoHandler)
    button.addEventListener('click', goBackBtnHandler)
}

function checkTodoListener() {
    let buttons = document.querySelectorAll('.check-btn')
    buttons.forEach(btn => btn.addEventListener('click', checkTodoHandler))
}

function deleteTodoListener() {
    let buttons = document.querySelectorAll('.todo .delete-btn')
    buttons.forEach(btn => btn.addEventListener('click', deleteTodoHandler))
}

function editTodoListener() {
    let form = document.querySelector('.edit-todo-form')
    let button = document.querySelector('.go-back-btn')
    let editedTodoId = form.parentElement.id
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        editTodoHandler(editedTodoId)
    })
    button.addEventListener('click', goBackBtnHandler)
}

function openEditProjectFormListener() {
    let buttons = document.querySelectorAll('.project .edit-btn')
    buttons.forEach(btn => btn.addEventListener('click', function(e) {
        e.preventDefault()
        let form = createProjectForm('edit-project')
        let project = e.target.parentElement.parentElement
        let projectBtns = project.lastChild
        projectBtns.remove()
        project.appendChild(form)
        editProjectListener()
    }))
}

function openEditTodoFormListener() {
    let buttons = document.querySelectorAll('.todo .edit-btn')
    buttons.forEach(btn => btn.addEventListener('click', function(e) {
        e.preventDefault()
        let form = createTodoForm('edit-todo')
        let todo = e.target.parentElement.parentElement
        let todoCheck = todo.firstChild.lastChild
        let todoBtns = todo.lastChild
        todoCheck.remove()
        todoBtns.remove()
        todo.appendChild(form)
        editTodoListener()
    }))
}

function deleteProjectListener() {
    let buttons = document.querySelectorAll('.project .delete-btn')
    buttons.forEach(btn => btn.addEventListener('click', deleteProjectHandler))
}

addProjectBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let projectForm = createProjectForm('add-project')
    cardContent.appendChild(projectForm)
    addProjectBtn.style.display = 'none'
    addProjectListener()
})

addTodoBtn.addEventListener('click', function(e) {
    e.preventDefault()
    let todoForm = createTodoForm('add-todo')
    todoList.appendChild(todoForm)
    addTodoBtn.style.display = 'none'
    addTodoListener()
})

projectItems.addEventListener('click', renderActiveProjectHandler)

export {
    addProjectListener, 
    addTodoListener, 
    renderActiveProjectHandler, 
    checkTodoListener, 
    deleteTodoListener, 
    deleteProjectListener,
    openEditTodoFormListener,
    openEditProjectFormListener
}

