//Obtendo os elementos que serão modificados via JavaScript
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var todos = [
    'Fazer café',
    'Estudar JavaScript',
    'Finalizar o módulo todo-app'
];

function renderTodos() {

    listElement.innerHTML = '';

    for (todo of todos) {
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        var linkText = document.createTextNode('Excluir');

        var position = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + position + ')');

        linkElement.setAttribute('href', '#');
        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }

}

renderTodos();

function addTodo() {
    var todoText = inputElement.value;

    todos.push(todoText);
    inputElement.value = '';
    renderTodos();
}

buttonElement.onclick = addTodo;

function deleteTodo(position) {
    todos.splice(position, 1);
    renderTodos();
}