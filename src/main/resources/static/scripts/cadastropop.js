document.addEventListener('DOMContentLoaded', () => {

    const dialog = document.querySelector("#ModalDialog");
    const botaoAbrir = document.querySelector(".botao-cadastrar");
    const botaoFechar = document.querySelector("#botao-fechar"); 

    botaoAbrir.addEventListener("click", () => {
        dialog.showModal();
    });

    botaoFechar.addEventListener("click", () => {
        iniciarAnimacaoDeFechamento();
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            iniciarAnimacaoDeFechamento();
        }
    });

    function iniciarAnimacaoDeFechamento() {
        dialog.classList.add("closing");

        dialog.addEventListener("animationend", () => {
            dialog.classList.remove("closing");
            dialog.close();
        }, { once: true });
    }
});