var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var categoryItem = document.querySelector('#categoryItem')
var dueDate = document.querySelector('#dueDate')

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)
todoButton.addEventListener('click', addTodo)

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value
    var category = categoryItem.value
    var dateValue = dueDate.value

    var body = {
        todo: todoTask,
        category: category,
        due_date: dateValue,
        completed: false
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodos)
}

function getTodos() {
    fetch('http://localhost:3000/api/v1/todos')
        .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        loopTodos(response);
    })
}

function loopTodos(todos) {
    todos.forEach(function(todo) {
        showTodos(todo)
    })
}

function showTodos(todo) {
    var todoList = `<li class="list-group-item">${todo.todo} ${todo.category} ${todo.due_date}</li>`

    document.querySelector('#todos').innerHTML = todoList + document.querySelector('#todos').innerHTML;
}