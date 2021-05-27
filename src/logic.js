import {projects} from './index.js'
import {renderProjectList} from "./projects.js"
import {renderTodoList} from "./todos.js"

export function addProject(project) {
    projects.push(project)
    saveStorage()
    setActive(project)
}

export function deleteProject(projectId) {
    let index = projects.findIndex(p => p.id == projectId)
    let previous = index - 1
    let next = index + 1
    if (projects[previous]) { 
        projects.splice(index, 1)
        saveStorage()
        setActive(projects[previous]) 
    } else if(projects[next]) {
        projects.splice(index, 1)
        saveStorage()
        setActive(projects[index])
    } else {
        return
    }
}

export function editProject(newProject, projectId) {
    let project = projects.findIndex(p => p.id == projectId)
    projects[project].name = newProject.name
    saveStorage()
    renderProjectList()
}

export function addTodo(todo) {
    let activeProject = getActive()
    let project = projects.findIndex(p => p.id == activeProject.id)
    projects[project].todos.push(todo)
    saveStorage()
    renderTodoList()
}

export function deleteTodo(todo) {
    let activeProject = getActive()
    let project = projects.findIndex(p => p.id == activeProject.id)
    console.log(todo.id)
    let todoIndex = projects[project].todos.findIndex(t => t.id == todo.id)
    projects[project].todos.splice(todoIndex, 1)
    saveStorage()
    renderTodoList()
}

export function checkTodo(todo) {
    let activeProject = getActive()
    let project = projects.findIndex(p => p.id == activeProject.id)
    let index = projects[project].todos.findIndex(t => t.id == todo.id)
    toggleCheckValue(projects[project].todos[index])
    saveStorage()
    renderTodoList()
}

export function editTodo(newTodo, editedTodoID) {
    let activeProject = getActive()
    let project = projects.findIndex(p => p.id == activeProject.id)
    let index = projects[project].todos.findIndex(t => t.id == editedTodoID)

    projects[project].todos[index].description = newTodo.description
    projects[project].todos[index].dueDate = newTodo.dueDate
    projects[project].todos[index].priority = newTodo.priority

    saveStorage()
    renderTodoList()
}

function toggleCheckValue(todo) {
    if (todo.check) {
        todo.check = false
    } else if (!todo.check) {
        todo.check = true
    }
}

export function readStorage() {
	if(!sessionStorage.getItem("Projects")) return false
	if(sessionStorage.getItem("Projects").length == 0) return false
	return JSON.parse(sessionStorage.getItem("Projects"))
}

export function saveStorage() {
	sessionStorage.setItem("Projects", JSON.stringify(projects))
}

export function setActive(activeProject) {
    projects.forEach(project => {
        if (project.id == activeProject.id) {
            sessionStorage.setItem("Active", JSON.stringify(project))
            renderProjectList()
            renderTodoList()
        }
    })
}

export function getActive() {
    return JSON.parse(sessionStorage.getItem("Active"))
}

export function protoProject(name, id) {
    return Object.assign({}, {
        name,
        id,
        'todos': []
    })
}

export function protoTodo(description, dueDate, priority, check, id) {
    return Object.assign({}, {description, dueDate, priority, check, id})
}