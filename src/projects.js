import {projects} from './index.js'
import {getActive} from './logic.js'
import {deleteProjectListener, openEditProjectFormListener} from './eventListeners.js'

const projectsItem = document.querySelector('.rendered-list');

function renderProject(project) {
    let active = getActive()
    let element = document.createElement('li')
    let projectButtons = document.createElement('span')
    let deleteBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    deleteBtn.innerText = `Delete`
    editBtn.innerText = `Edit`
    deleteBtn.classList.add('btn')
    deleteBtn.classList.add('delete-btn')
    editBtn.classList.add('btn')
    editBtn.classList.add('edit-btn')
    element.classList.add('project')
    element.id = project.id
    if (element.id == active.id) {
        element.classList.add('active')
    }
    projectButtons.appendChild(deleteBtn)
    projectButtons.appendChild(editBtn)
    element.append(project.name)
    element.appendChild(projectButtons)
    return element
}

function renderProjectList() {
    projectsItem.innerHTML = ``
    projects.forEach(project => {
        let item = renderProject(project)
        projectsItem.appendChild(item)
    })
    deleteProjectListener()
    openEditProjectFormListener()
}

export { renderProjectList }