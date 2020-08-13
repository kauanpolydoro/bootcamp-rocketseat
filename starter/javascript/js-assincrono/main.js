/*Ajax
var xhr = new XMLHttpRequest();

xhr.open('GET', 'http://api.github.com/users/kauanpolydoro');
xhr.send(null);

xhr.onreadystatechange = function () {

    if (xhr.readyState === 4) {
        console.log(JSON.parse(xhr.responseText));
    }
}*/

//Promisse

var myPromise = function () {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.github.com/users/kauanpolydoro');
        xhr.send(null);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Erro na requisição');
                }
            }
        }
    })
}

myPromise()
    .then(function (resolve) {
        console.log(resolve);
    })
    .catch(function (error) {
        console.warn(error);
    });