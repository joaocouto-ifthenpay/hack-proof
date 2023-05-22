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

            alert('Conta criada com sucesso, ' + name + '!');
            window.location.href = "./index.html";

        }).catch(function (error) {
            console.log(error);
        });
}

/**
 * Função para login
 */
function loginEmail() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    // Faz login com email e senha
    firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
        alert('Utilizador com sessão iniciada!');
    }).catch(error => {
        console.log('error', error);
    });
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Observa se há um utilizador e mudanças na autenticação (login e logout)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // document.getElementById("loginForm").innerHTML = "<div><h2>Olá " + user.displayName + "!</h2><div class='wrapper'>
            //<a class='login__link' id='sign_out' onclick='logout()'>Sair</a></div></div";
            let uid = user.uid;
            const database = firebase.database();
              
            // Obter uma referência para o caminho especificado
            const ref = database.ref('score/'+uid);

            // Ler os dados uma única vez
            ref.once('value')
            .then((snapshot) => {
                console.log(snapshot);
                // Dados lidos com sucesso
                if(snapshot.val() != null) {
                    console.log(snapshot.val().score);
                    fetchData(snapshot.val().score);
                } else {
                    fetchData();
                }
                
            })
            .catch((error) => {
                console.log('Erro ao ler os dados:', error);
            });
            
            
            function fetchData(score=0) {
                fetch('main.html')
                .then(response => response.text())
                .then(data => {
                    console.log(data)
                    document.getElementById('loginForm').innerHTML = "<div class='user-main'><div class='greeting'>Olá</div><div class='name'>" 
                    + user.displayName + "!</div>" + " A tua atual pontuação: " + score + " ponto(s)" + data;
                });
            }
            // document.getElementById('loading').style.display = 'none';
            // document.getElementById('loaded').style.display = 'block';
            // user ? handleSignedInUser(user) : handleSignedOutUser();

            // Mudando o idioma do firebase
            // firebase.auth().languageCode = 'pt';
            // Muda o idioma
            // firebase.auth().useDeviceLanguage();

            // if (!user.emailVerified) {
                // Envia um email para o utilizador verificar a conta dele.
                // user.sendEmailVerification().then(() => {
                //     alert('email de verificação enviado');
                // });
            // };

            // Envia um email para mudança de password ao email passado por parametro.
            // firebase.auth().sendPasswordResetEmail(user.email).then(() => {
            //     alert('Email para reset de password enviado');
            // })
        } else {
            console.log('Não há utilizadores com sessão iniciada');
        }
    });

    // Obtém dados do user
    // currentUser = firebase.auth().currentUser;

    // if (currentUser) {
    //     console.log('currentUser', currentUser);
    //     Metodos para update de dados do utilizador criado no auth()
    //     currentUser.updateProfile({
    //         displayName: "João Couto",
    //         photoURL: ''
    //     });
        // currentUser.updateEmail('jppcouto@live.com');
        // currentUser.updatePassword('qwerty');
        // currentUser.updatePhoneNumber('+5511xxxxxxxxx');
    // }
});

/**
 * Remove utilizador
 */
function removerUtilizador() {
    if (currentUser) {
        currentUser.delete().then(() => {
            alert('Utilizador foi removido!');
        });
    }
}