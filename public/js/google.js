function loginGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(resposta => {
        console.log('utilizador', resposta.user);
        console.log('token', resposta.credential.accessToken);
    }).catch(erro => {
        console.log('erro', erro);
    })
}