function loginFacebook() {
    // cria uma nova instancia do provedor de login do Facebook.
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(resposta => {
        console.log('utilizador', resposta.user);
        console.log('token', resposta.credential.accessToken);
    }).catch(erro => {
        console.log('erro', erro);
    })
}
// SERVE A APLICAÇÃO VIA NPM
// http-server: npm i -g http-server
// cd até/pasta/do/arquivo; http-server