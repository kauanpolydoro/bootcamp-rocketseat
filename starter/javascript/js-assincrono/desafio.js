/* Desafio #1

Crie uma função que recebe a idade de um usuário e retorna uma Promise que depois de 2
segundos retornará se usuário é maior ou não que 18 anos. Se o usuário ter mais que 18 anos de
idade o resultado deve cair no .then, caso contrário, no .catch

*/

function checaIdade(idade) {

    return new Promise(function (resolve, reject) {
        setTimeout((idade >= 18) ? resolve : reject, 2000);
    })
}

checaIdade(20)
    .then(function () {
        console.log("Maior que 18");
    })
    .catch(function () {
        console.log("Menor que 18");
    });

/* Desafio #2

Crie uma tela com um <input> que deve receber o nome de um usuário no Github. Após digitar o
nome do usuário e clicar no botão buscar a aplicação deve buscar pela API do Github (conforme
URL abaixo) os dados de repositórios do usuário e mostrá-los em tela:

URL de exemplo: https://api.github.com/users/diego3g/repos

Basta alterar "diego3g" pelo nome do usuário.

<input type="text" name="user">
<button onclick="">Adicionar</button>

Depois de preencher o input e adicionar, a seguinte lista deve aparecer abaixo:

<ul>
 <li>repo1</li>
 <li>repo2</li>
 <li>repo3</li>
 <li>repo4</li>
 <li>repo5</li>
</ul>

*/

function adicionar() {
    var inputElement = document.querySelector('div#desafio-2 input');
    var inputText = inputElement.value;

    inputElement.value = '';

    //Desafio #3
    var ilElement = document.createElement('li');
    ilElement.appendChild(document.createTextNode('Carregando...'));
    ulElement.appendChild(ilElement);


    axios.get(`https://api.github.com/users/${inputText}/repos`)
        .then(function (resolve) {
            repositorios = resolve.data;

            ulElement.innerHTML = '';

            for (repositorio of repositorios) {
                var ilElement = document.createElement('li');
                ilElement.appendChild(document.createTextNode(repositorio.name));
                ulElement.appendChild(ilElement);
            }
        })
        .catch(function (error) {
            ulElement.innerHTML = '';
            var ilElement = document.createElement('li');
            ilElement.appendChild(document.createTextNode('Usuário não encontrado'));
            ulElement.appendChild(ilElement);
        });
}

document.querySelector('div#desafio-2 button').onclick = adicionar;

var ulElement = document.createElement('ul');
document.querySelector('div#desafio-2').appendChild(ulElement);

/* Desafio #3

A partir do resultado do exemplo anterior adicione um indicador de carregamento em tela no lugar
da lista apenas enquanto a requisição estiver acontecendo:

<li>Carregando...</li>

Além disso, adicione uma mensagem de erro em tela caso o usuário no Github não exista.

*/