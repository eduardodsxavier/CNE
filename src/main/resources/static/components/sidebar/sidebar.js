// VERSÃO NOVA E SIMPLIFICADA
function setupSidebar() {
    // 1. Não procuramos mais por '.conteudo-principal'
    const botaoMenu = document.querySelector('.botao-menu');
    const menuLateral = document.querySelector('.menu-lateral');
    const botaoFechar = document.querySelector('.botao-fechar-menu');

    // 2. A verificação agora é mais simples
    if (!botaoMenu || !menuLateral || !botaoFechar) {
        console.error("Não foi possível inicializar a sidebar: botão de menu ou a própria sidebar não encontrados.");
        return;
    }

    // 3. A função de fechar não mexe mais com o conteúdo principal
    function fecharMenu() {
        menuLateral.classList.remove('menu-aberto');
    }

    // 4. O clique no botão de menu só afeta a própria sidebar
    botaoMenu.addEventListener('click', function() {
        menuLateral.classList.toggle('menu-aberto');
    });

    botaoFechar.addEventListener('click', function() {
        fecharMenu();
    });
}