import {renderProjectList} from './projects.js'
import {renderTodoList} from './todos.js'
import * as logic from './logic.js'
import './eventListeners.js'

let projects = []

let exampleProject = {
    'name': 'Example Project',
    'id': '312',
    'todos': [
        {
            'description': 'description-1',
            'dueDate': '2021-05-01',
            'priority': 'low',
            'check': true,
            'id': '412'
        },
        {
            'description': 'description-2',
            'dueDate': '2021-05-06',
            'priority': 'medium',
            'check': false,
            'id': '314'
        }
    ],
    'active': true
}

window.addEventListener('load', function () {
	if (!sessionStorage.getItem("Projects")) {
		logic.addProject(exampleProject)
	} else {
        projects = logic.readStorage()
		renderProjectList()
        renderTodoList()
	}	
})



export {projects}