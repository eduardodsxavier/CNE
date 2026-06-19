// VERSÃO NOVA E SIMPLIFICADA
function updateSidebarActiveLink() {
    const menuLateral = document.querySelector('.menu-lateral');
    if (!menuLateral) return;
    const currentPath = window.location.pathname;
    const links = menuLateral.querySelectorAll('ul li a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('ativo');
        } else {
            link.classList.remove('ativo');
        }
    });
}
window.updateSidebarActiveLink = updateSidebarActiveLink;

function setupSidebar() {
    const menuLateral = document.querySelector('.menu-lateral');
    if (!menuLateral) {
        console.error("Não foi possível inicializar a sidebar: menu lateral não encontrado.");
        return;
    }

    function fecharMenu() {
        menuLateral.classList.remove('menu-aberto');
    }

    // Usar delegação global no document para evitar perda de listener ao substituir o header via SPA
    document.addEventListener('click', function(e) {
        const btnMenu = e.target.closest('.botao-menu');
        const btnFechar = e.target.closest('.botao-fechar-menu');

        if (btnMenu) {
            e.stopPropagation();
            menuLateral.classList.toggle('menu-aberto');
        } else if (btnFechar) {
            e.stopPropagation();
            fecharMenu();
        } else {
            // Fechar ao clicar fora se o menu estiver aberto
            if (menuLateral.classList.contains('menu-aberto') && !menuLateral.contains(e.target)) {
                fecharMenu();
            }
        }
    });

    // Destaca a página ativa inicialmente
    updateSidebarActiveLink();
}