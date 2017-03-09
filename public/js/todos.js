var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var categoryItem = document.querySelector('#categoryItem')
var dueDate = document.querySelector('#dueDate')
var datePickerUI 

getTodos()

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)
todoButton.addEventListener('click', addTodo)


    datepickerUI = new Pikaday({
        field: document.querySelector('#dueDate')
    })

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value.trim()
    var category = categoryItem.value.trim()
    var dateValue = dueDate.value.trim()

    // Begin form validation
    if (todoTask !== '' && category !== '' && dateValue !== '') {
    
        todoTask.value = ''
        category.value = ''
        dateValue.value = ''

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
    var todoList = 
    `
    <li class="list-group-item"> 
        <div class="checkbox">
            <label>
                <input type="checkbox"/>
                ${todo.todo} 
                <span class="label label-default">${todo.category}</span>
                <span class="label label-default">${moment(todo.due_date).format('MM/DD/YYYY')}</span>
            </label>
        </div>
    
    </li>`

    document.querySelector('#todos').innerHTML = todoList + document.querySelector('#todos').innerHTML;
}