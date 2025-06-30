document.addEventListener('DOMContentLoaded', function() {
            const todosDropdowns = document.querySelectorAll('.dropdown-personalizado');

            todosDropdowns.forEach(dropdown => {
                const header = dropdown.querySelector('.dropdown-header');
                const opcoes = dropdown.querySelectorAll('.dropdown-opcao');
                const textoSelecionado = dropdown.querySelector('.dropdown-selecionado');

                header.addEventListener('click', function() {
                    // Fecha outros dropdowns abertos antes de abrir o atual
                    todosDropdowns.forEach(d => {
                        if (d !== dropdown) {
                            d.classList.remove('aberto');
                        }
                    });
                    dropdown.classList.toggle('aberto');
                });

                opcoes.forEach(opcao => {
                    opcao.addEventListener('click', function() {
                        textoSelecionado.textContent = this.textContent;
                        dropdown.setAttribute('data-valor-selecionado', this.getAttribute('data-valor'));
                        dropdown.classList.remove('aberto');
                    });
                });
            });

            window.addEventListener('click', function(e) {
                todosDropdowns.forEach(dropdown => {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('aberto');
                    }
                });
            });
        });

       // Lógica para os dropdowns de data com as novas classes
document.querySelectorAll('.date-picker-dropdown').forEach(dropdown => {
    const header = dropdown.querySelector('.date-picker-dropdown__header');
    const options = dropdown.querySelectorAll('.date-picker-dropdown__option');
    const selectedText = dropdown.querySelector('.date-picker-dropdown__selected');

    header.addEventListener('click', () => {
        dropdown.classList.toggle('aberto');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            selectedText.textContent = option.textContent;
            dropdown.classList.remove('aberto');
        });
    });
});

// Lógica para fechar ao clicar fora
window.addEventListener('click', e => {
    if (!e.target.closest('.date-picker-dropdown')) {
        document.querySelectorAll('.date-picker-dropdown.aberto').forEach(d => d.classList.remove('aberto'));
    }
});