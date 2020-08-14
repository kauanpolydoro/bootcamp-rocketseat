class List {
    constructor() {
        this.data = []
    }

    add(data) {
        this.data.push(data);
        console.log(this.data);
    }
}

class TodoList extends List {

    constructor() {
        super();
        this.usuario = 'Kauan';
    }

    mostraUsuario() {
        console.log(this.usuario);
    }

    /*constructor() {
        this.todos = []
    }

    addTodo() {
        this.todos.push('Novo todo');
        console.log(this.todos);
    }*/
}

const MinhaLista = new TodoList();

document.getElementById('novotodo').onclick = function () {
    //MinhaLista.addTodo();
    MinhaLista.add('Novo todo');
}
MinhaLista.mostraUsuario();

class Matematica {

    static soma(a, b) {
        return a + b;
    }
}

console.log(Matematica.soma(1, 2));