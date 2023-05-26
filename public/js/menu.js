/**
 * Alterna a classe 'active' em ambos os elementos quando o botão de alternar for clicado.
 * Isso significa que caso a classe 'active' for aplicada, esta será removida e caso não esteja acionada, será adicionada.
 * Quando o botão de alternar for clicado, os dois elementos exibirão comportamentos.
 * O elemento Showcase irá mover-se cerca de 300px e o elemento menuToggle vai mudar de um menu de sanduíche para um X.
 */

const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
});