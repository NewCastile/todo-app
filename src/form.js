//Todo Form
function createTodoForm(type) {
    let form = document.createElement('form')
    let footer = document.createElement('div')
    let description = document.createElement('input')
    let dueDate = document.createElement('input')
    let priority = document.createElement('input')
    let goBackBtn = document.createElement('button') 
    let formSubmitBtn = document.createElement('button') 

    description.type = 'text'
    description.name = 'description'
    description.placeholder = 'Description'

    dueDate.type = 'date'
    dueDate.name = 'dueDate'
    dueDate.placeholder = 'Due Date'

    priority.type = 'text'
    priority.name = 'priority'
    priority.placeholder = 'Priority'
    
    goBackBtn.type = 'button'
    formSubmitBtn.type = 'submit'

    goBackBtn.innerText = 'Go Back'
    formSubmitBtn.innerText = 'Submit'

    if (type == 'add-todo') {
        form.classList.add('add-todo-form')
    } else if (type == 'edit-todo') {
        form.classList.add('edit-todo-form')
    }
    
    goBackBtn.classList.add('btn')
    goBackBtn.classList.add('go-back-btn')
    formSubmitBtn.classList.add('btn')
    formSubmitBtn.classList.add('form-submit-btn')
    
    footer.appendChild(goBackBtn)
    footer.appendChild(formSubmitBtn)
    form.appendChild(description)
    form.appendChild(dueDate)
    form.appendChild(priority)
    form.appendChild(footer)
    return form
}

//project Form
function createProjectForm(type) {
    let form = document.createElement('form')
    let footer = document.createElement('div')
    let name = document.createElement('input')
    let goBackBtn = document.createElement('button') 
    let formSubmitBtn = document.createElement('button') 

    name.type ='text'
    name.name = 'name'
    name.placeholder = 'Name'
    goBackBtn.innerText = 'Go Back'
    formSubmitBtn.innerText = 'Submit'

    formSubmitBtn.type = 'submit'

    form.classList.add('add-project-form') 
    if (type == 'add-project') {
        form.classList.add('add-project-form')    
    } else if (type == 'edit-project') {
        form.classList.add('edit-project-form')
    }

    goBackBtn.classList.add('btn')
    goBackBtn.classList.add('go-back-btn')
    formSubmitBtn.classList.add('btn')
    formSubmitBtn.classList.add('form-submit-btn')
    
    footer.appendChild(goBackBtn)
    footer.appendChild(formSubmitBtn)
    form.appendChild(name)
    form.appendChild(footer)
    return form
}

export {createTodoForm, createProjectForm}