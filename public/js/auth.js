/**
 * Validação do formulário login
 */
const usernameInput = document.getElementById("email");
const passwordInput = document.getElementById("senha");
const submitButton = document.getElementById("sign_in");

usernameInput.addEventListener("input", toggleButton);
passwordInput.addEventListener("input", toggleButton);

function toggleButton() {
    if (usernameInput.value != "" && passwordInput.value != "") {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}


/**
 * Função de registo com email e password
 */
function createLogin() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(function (result) {

            result.user.updateProfile({
                displayName: name
            });

            console.log(result);
            alert('Conta criada com sucesso, ' + name + '!');
            location.reload();

        }).catch(function (error) {
            alert("Lamentamos, mas ocorreu o seguinte erro: " + error);
        });
}

/**
 * Função para login
 */
function loginEmail() {
    var email = document.getElementById('login_email').value;
    var senha = document.getElementById('login_password').value;
    console.log(email);
    // Faz login com email e senha
    firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
        alert('Utilizador com sessão iniciada!');
        location.reload();
    }).catch(error => {
        alert("Lamentamos, mas ocorreu o seguinte erro: " + error);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Observa se há um utilizador e mudanças na autenticação (login e logout)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {


            if (!user.displayName) {
                user.displayName = '';
            }

            let uid = user.uid;
            const database = firebase.database();

            // Obtem referência para o caminho especificado
            const ref = database.ref('score/' + uid);

            // Lê dados uma única vez
            ref.once('value')
                .then((snapshot) => {
                    console.log(snapshot);
                    // Dados lidos com sucesso
                    if (snapshot.val() != null) {
                        console.log(snapshot.val().score);
                        fetchData(snapshot.val().score);
                    } else {
                        fetchData();
                    }

                })
                .catch((error) => {
                    console.log('Erro ao ler os dados:', error);
                });


            function fetchData(score = 0) {

                document.getElementById('welcome-login').innerHTML = "<h3 class='logo'>Bem-vindo(a) " + user.displayName + "! 👋</h3><small style='font-weight: 400; display: ruby-base-container' class='logo'>Atual pontuação: <div style='color:orange'>" + score + " ponto(s)</div></small>";
                document.getElementById('firebaseui-auth').innerHTML = "";
                document.getElementById('play').href = "maps.html";
                document.getElementById('logout').innerHTML = "<li><a style='cursor: pointer' onclick='logout()'><small>🚶‍♂️</small>Sair</a></li>";

            }

        } else {
            console.log('Não há utilizadores com sessão iniciada');
        }
    });


});
