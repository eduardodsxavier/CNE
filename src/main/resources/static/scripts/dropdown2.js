document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os dropdowns customizados na página
    const allDropdowns = document.querySelectorAll('.custom-dropdown');

    // Adiciona os eventos para cada dropdown
    allDropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.custom-dropdown__header');
        const options = dropdown.querySelectorAll('.custom-dropdown__option');
        const selectedSpan = dropdown.querySelector('.custom-dropdown__selected');

        // 1. Evento para abrir/fechar o dropdown
        header.addEventListener('click', () => {
            // Fecha outros dropdowns abertos antes de abrir o novo
            allDropdowns.forEach(d => {
                if (d !== dropdown) {
                    d.classList.remove('aberto');
                }
            });
            // Alterna a classe 'aberto' no dropdown clicado
            dropdown.classList.toggle('aberto');
        });

        // 2. Evento para selecionar uma opção
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Atualiza o texto do cabeçalho
                selectedSpan.textContent = option.textContent;
                // Armazena o valor selecionado no atributo 'data-valor-selecionado'
                dropdown.dataset.valorSelecionado = option.dataset.valor;
                // Fecha o dropdown
                dropdown.classList.remove('aberto');
            });
        });
    });

    // 3. Evento para fechar o dropdown se clicar fora dele
    document.addEventListener('click', (e) => {
        allDropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('aberto');
            }
        });
    });
});