'use strict';
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnShowModal = document.querySelector(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");

// open modal function
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(function () {
        modal.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 1);
}
// close modal function
const closeModal = function () {
    modal.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(function () {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
    }, 300);

};

// open modal by button click
btnShowModal.addEventListener("click", openModal);
// close modal by mouse click 
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// close modal by spressing esc key
document.addEventListener('keydown', function (event) {
    if (event.key == "Escape") {
        closeModal();
        closeModal();
    }
});

$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});