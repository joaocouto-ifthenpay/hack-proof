

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Observa se há um utilizador e mudanças na autenticação (login e logout)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // alert(user.displayName);

            document.getElementById("player").innerText = user.displayName;
            //<a class='login__link' id='sign_out' onclick='logout()'>Sair</a></div></div";

            // fetch('main.html')
            //     .then(response => response.text())
            //     .then(data => {
            //         console.log(data)
            //         document.getElementById('loginForm').innerHTML = "<div class='user-main'><div class='greeting'>Olá</div><div class='name'>"
            //             + user.displayName + "!</div>" + data;
            //     });

        } else {
            alert("Não há utilizadores com sessão iniciada");

        }
    });


});
