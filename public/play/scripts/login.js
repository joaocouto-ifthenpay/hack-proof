

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Observa se há um utilizador e mudanças na autenticação (login e logout)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // alert(user.displayName);

            document.getElementById("player").innerText = user.displayName;


        } else {
            alert("Não há utilizadores com sessão iniciada");

        }
    });


});
