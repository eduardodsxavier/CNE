document.addEventListener('DOMContentLoaded', () => {

    const componentPath = '/components/sidebar/';

    const sidebarPlaceholder = document.createElement('div');
    sidebarPlaceholder.id = 'sidebar-container';
    document.body.prepend(sidebarPlaceholder);

    const sidebarCSS = document.createElement('link');
    sidebarCSS.rel = 'stylesheet';
    sidebarCSS.href = `${componentPath}sidebar.css`;
    document.head.appendChild(sidebarCSS);

    fetch(`${componentPath}sidebar.html`)
        .then(response => response.text())
        .then(html => {
            sidebarPlaceholder.innerHTML = html;

            const sidebarJS = document.createElement('script');
            sidebarJS.src = `${componentPath}sidebar.js`;
            
            sidebarJS.onload = () => {
                setupSidebar();
            };
            
            document.body.appendChild(sidebarJS);
        })
        .catch(error => {
            console.error('Falha ao carregar o componente da sidebar:', error);
        });

    // --- DELEGAÇÃO DE EVENTOS PARA DROPDOWNS ---
    document.body.addEventListener('click', (e) => {
        const header = e.target.closest('.custom-dropdown__header, .dropdown-header, .date-picker-dropdown__header');
        if (header) {
            const dropdown = header.closest('.custom-dropdown, .dropdown-personalizado, .date-picker-dropdown');
            if (dropdown) {
                document.querySelectorAll('.custom-dropdown, .dropdown-personalizado, .date-picker-dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('aberto');
                    }
                });
                dropdown.classList.toggle('aberto');
                e.stopPropagation();
                return;
            }
        }

        const option = e.target.closest('.custom-dropdown__option, .dropdown-opcao, .date-picker-dropdown__option');
        if (option) {
            const dropdown = option.closest('.custom-dropdown, .dropdown-personalizado, .date-picker-dropdown');
            if (dropdown) {
                const selected = dropdown.querySelector('.custom-dropdown__selected, .dropdown-selecionado, .date-picker-dropdown__selected');
                if (selected) {
                    selected.textContent = option.textContent.trim();
                }
                const val = option.getAttribute('data-valor');
                dropdown.setAttribute('data-valor-selecionado', val);
                dropdown.dataset.valorSelecionado = val;
                dropdown.classList.remove('aberto');
                dropdown.dispatchEvent(new CustomEvent('change', { detail: { value: val } }));
                return;
            }
        }

        document.querySelectorAll('.custom-dropdown.aberto, .dropdown-personalizado.aberto, .date-picker-dropdown.aberto').forEach(d => {
            d.classList.remove('aberto');
        });
    });

    // --- DELEGAÇÃO DE EVENTOS PARA NAVEGAÇÃO DE ANO ---
    document.body.addEventListener('click', (e) => {
        const btnProximo = e.target.closest('#btn-proximo');
        const btnAnterior = e.target.closest('#btn-anterior');
        
        if (btnProximo) {
            const anoExibido = document.getElementById('ano-exibido');
            if (anoExibido) {
                let anoAtual = parseInt(anoExibido.textContent);
                anoExibido.textContent = ++anoAtual;
            }
        } else if (btnAnterior) {
            const anoExibido = document.getElementById('ano-exibido');
            if (anoExibido) {
                let anoAtual = parseInt(anoExibido.textContent);
                anoExibido.textContent = --anoAtual;
            }
        }
    });

    // --- ROTEADOR SPA DO CNE ---
    document.body.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        const currentPath = window.location.pathname;

        // Apenas intercepta SPA se a página atual e o destino forem calendário ou cenários
        if (
            (currentPath === '/calendario' || currentPath === '/cenarios') &&
            (href === '/calendario' || href === '/cenarios')
        ) {
            e.preventDefault();
            await navigateTo(href);
        }
    });

    window.addEventListener('popstate', async () => {
        const path = window.location.pathname;
        if (path === '/calendario' || path === '/cenarios') {
            await loadPageContent(path, false);
        }
    });
});

async function navigateTo(url) {
    await loadPageContent(url, true);
}

async function loadPageContent(url, updateHistory = true) {
    const mainEl = document.querySelector('.conteudo-principal, .main-container');
    if (!mainEl) return;

    // Fechar a sidebar se estiver aberta
    const menuLateral = document.querySelector('.menu-lateral');
    if (menuLateral) {
        menuLateral.classList.remove('menu-aberto');
    }

    mainEl.style.transition = 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
    mainEl.style.opacity = '0';
    mainEl.style.transform = 'translateY(8px)';

    await new Promise(resolve => setTimeout(resolve, 200));

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Falha ao requisitar a página');
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        if (updateHistory) {
            history.pushState(null, '', url);
        }
        document.title = doc.title;

        const currentHeader = document.querySelector('.cabecalho-esquerdo');
        const newHeader = doc.querySelector('.cabecalho-esquerdo');
        if (currentHeader && newHeader) {
            const currentSelector = currentHeader.querySelector('.seletor-paginas');
            const newSelector = newHeader.querySelector('.seletor-paginas');
            if (currentSelector && newSelector) {
                const currentItems = currentSelector.querySelectorAll('.seletor-item');
                const newItems = newSelector.querySelectorAll('.seletor-item');
                currentItems.forEach((item, index) => {
                    if (newItems[index]) {
                        if (newItems[index].classList.contains('active')) {
                            item.classList.add('active');
                        } else {
                            item.classList.remove('active');
                        }
                    }
                });
            } else {
                currentHeader.innerHTML = newHeader.innerHTML;
            }
        }

        const newMainEl = doc.querySelector('.conteudo-principal, .main-container');
        if (newMainEl) {
            mainEl.replaceWith(newMainEl);
            newMainEl.style.opacity = '0';
            newMainEl.style.transform = 'translateY(8px)';
            newMainEl.style.transition = 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';

            newMainEl.offsetHeight;

            newMainEl.style.opacity = '1';
            newMainEl.style.transform = 'translateY(0)';

            // Re-inicialização específica por página
            if (url === '/cenarios' && typeof window.initCenarios === 'function') {
                window.initCenarios();
            } else if (url === '/calendario' && typeof window.initCalendario === 'function') {
                window.initCalendario();
            }

            if (typeof window.updateSidebarActiveLink === 'function') {
                window.updateSidebarActiveLink();
            }
        }
    } catch (error) {
        console.error('Erro na navegação dinâmica (SPA):', error);
        window.location.href = url;
    }
}
