const saveTodo = (todos, todo) => {
    todos.push(todo)
    let s = JSON.stringify(todos)
    localStorage.saveTodos = s
}

const deleteTodo = (container, todoCell) => {   
    for (let i = 0; i < container.children.length; i++) {
        var cell = container.children[i]
        if (cell === todoCell) {    
            todoCell.remove()
            let todos = loadTodos()
            todos.splice(i, 1)
            let s = JSON.stringify(todos)
            localStorage.saveTodos = s
        }
    }
}

const loadTodos = () => {
    let t = localStorage.saveTodos
    if (t === undefined) {
        return []
    } else {
        let ts = JSON.parse(t)
        return ts
    }
}

const insertTodos = (todos) => {
    var todoContainer = e("#id-ul-container")
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        let t = todoTemplate(todo)
        appendHtml(todoContainer, t)
    }
}

const todoTemplate = (todo) => {
    let t = `
        <li class='todo-cell'>
            <span class="todo-delete">✘</span>
            <span class="todo-done">✔</span>
            <span class="todo-text">${todo}</span>
        </li>
    `
    return t
}

const bindEventAdd = (todos) => {
    let ele = e('#id-button-add')
    bindEvent(ele, 'click', () => {
        let todo = e('input').value
        if (todo !== '') {
            saveTodo(todos, todo)
            let v = todoTemplate(todo)
            let element = e('ul')
            appendHtml(element, v)
        } else {
            alert('请输入文本')
        }
    })
}

const bindEventDelegate = () => {
    let element = e('#id-ul-container')
    bindEvent(element, 'click', (event) => {
        let target = event.target
        let item = target.closest(".todo-cell")
        if (target.classList.contains("todo-delete")) {
            deleteTodo(element, item)
        }
        if (target.classList.contains('todo-done')) {
            let itemClicked = item.querySelector('.todo-text')
            itemClicked.classList.toggle('completed')
        }
    })
}

const bindEvents = (todos) => {
    bindEventAdd(todos)
    bindEventDelegate()
}

const __main = () => {
    let todos = loadTodos()
    
    bindEvents(todos)
    insertTodos(todos)
}

__main()