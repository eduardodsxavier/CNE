// --- OVERRIDE DE ALERT GLOBAL COM TOASTS PREMIUM CNE ---
(function() {
    const toastStyles = `
    #cne-toast-container {
        position: fixed;
        top: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-width: 380px;
        width: 100%;
    }

    .cne-toast {
        display: flex;
        align-items: center;
        background: #ffffff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        border-left: 4px solid #1e5b3e;
        animation: cneToastFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        pointer-events: auto;
        position: relative;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    @keyframes cneToastFadeIn {
        from {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes cneToastFadeOut {
        from {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        to {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
        }
    }

    .cne-toast.success {
        border-left-color: #10b981;
    }

    .cne-toast.error {
        border-left-color: #ef4444;
    }

    .cne-toast.success .cne-toast-icon {
        color: #10b981;
    }

    .cne-toast.error .cne-toast-icon {
        color: #ef4444;
    }

    .cne-toast-icon {
        font-size: 20px;
        color: #1e5b3e;
        margin-right: 12px;
        flex-shrink: 0;
    }

    .cne-toast-content {
        flex: 1;
        padding-right: 10px;
    }

    .cne-toast-message {
        font-size: 13.5px;
        font-weight: 600;
        color: #1e293b;
        line-height: 1.4;
    }

    .cne-toast-close {
        background: none;
        border: none;
        color: #94a3b8;
        font-size: 18px;
        cursor: pointer;
        padding: 4px;
        line-height: 1;
        transition: color 0.15s ease;
        align-self: flex-start;
    }

    .cne-toast-close:hover {
        color: #475569;
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = toastStyles;
    document.head.appendChild(styleSheet);

    window.alert = function(message) {
        let container = document.getElementById('cne-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'cne-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'cne-toast';
        
        let iconClass = 'fa-circle-info';
        let typeClass = 'info';
        
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('erro') || lowerMessage.includes('falha') || lowerMessage.includes('não') || lowerMessage.includes('obrigatório') || lowerMessage.includes('coincidem')) {
            iconClass = 'fa-triangle-exclamation';
            typeClass = 'error';
        } else if (lowerMessage.includes('sucesso') || lowerMessage.includes('cadastrada') || lowerMessage.includes('salvo') || lowerMessage.includes('atualizado') || lowerMessage.includes('redefinida') || lowerMessage.includes('cadastrado') || lowerMessage.includes('ativad') || lowerMessage.includes('inativad')) {
            iconClass = 'fa-circle-check';
            typeClass = 'success';
        }
        
        toast.classList.add(typeClass);
        toast.innerHTML = `
            <i class="fa-solid ${iconClass} cne-toast-icon"></i>
            <div class="cne-toast-content">
                <span class="cne-toast-message">${message}</span>
            </div>
            <button class="cne-toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'cneToastFadeOut 0.4s forwards';
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 4000);
    };
})();

// --- CUSTOM CONFIRM MODAL (confirmCne) ---
window.confirmCne = function(message) {
    return new Promise((resolve) => {
        let styles = document.getElementById('cne-confirm-styles');
        if (!styles) {
            styles = document.createElement('style');
            styles.id = 'cne-confirm-styles';
            styles.innerText = `
                .cne-confirm-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(15, 23, 42, 0.4);
                    backdrop-filter: blur(4px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    animation: cneConfirmFadeIn 0.2s ease;
                }
                .cne-confirm-card {
                    background: #ffffff;
                    border-radius: 16px;
                    width: 420px;
                    max-width: 90%;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    border: 1px solid #e2e8f0;
                    overflow: hidden;
                    animation: cneConfirmZoomIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                    display: flex;
                    flex-direction: column;
                    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                }
                .cne-confirm-header {
                    background: linear-gradient(135deg, #1e5b3e, #123725);
                    color: #ffffff;
                    padding: 18px 24px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .cne-confirm-title {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }
                .cne-confirm-body {
                    padding: 24px;
                    color: #334155;
                    font-size: 0.95rem;
                    font-weight: 500;
                    line-height: 1.5;
                    text-align: left;
                }
                .cne-confirm-footer {
                    padding: 16px 24px;
                    background: #f8fafc;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }
                .cne-confirm-btn {
                    padding: 10px 20px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    border-radius: 8px;
                    cursor: pointer;
                    border: 1.5px solid transparent;
                    transition: all 0.2s;
                }
                .cne-confirm-btn-ok {
                    background-color: #1e5b3e;
                    color: #ffffff;
                }
                .cne-confirm-btn-ok:hover {
                    background-color: #123725;
                }
                .cne-confirm-btn-cancel {
                    background-color: #ffffff;
                    color: #475569;
                    border-color: #cbd5e1;
                }
                .cne-confirm-btn-cancel:hover {
                    background-color: #f1f5f9;
                    border-color: #94a3b8;
                }
                @keyframes cneConfirmFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes cneConfirmZoomIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        const overlay = document.createElement('div');
        overlay.className = 'cne-confirm-overlay';
        overlay.innerHTML = `
            <div class="cne-confirm-card">
                <div class="cne-confirm-header">
                    <i class="fa-solid fa-circle-question" style="font-size: 18px;"></i>
                    <h3 class="cne-confirm-title">Confirmação</h3>
                </div>
                <div class="cne-confirm-body">${message}</div>
                <div class="cne-confirm-footer">
                    <button class="cne-confirm-btn cne-confirm-btn-cancel" id="cne-confirm-btn-cancel">CANCELAR</button>
                    <button class="cne-confirm-btn cne-confirm-btn-ok" id="cne-confirm-btn-ok">CONFIRMAR</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const cleanUp = () => {
            overlay.remove();
        };

        overlay.querySelector('#cne-confirm-btn-ok').addEventListener('click', () => {
            cleanUp();
            resolve(true);
        });

        overlay.querySelector('#cne-confirm-btn-cancel').addEventListener('click', () => {
            cleanUp();
            resolve(false);
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                cleanUp();
                resolve(false);
            }
        });
    });
};

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

                // Propaga o evento yearchange caso seja o dropdown de ano
                if (dropdown.id === 'dropdown-ano') {
                    const anoExibido = dropdown.querySelector('#ano-exibido');
                    if (anoExibido) {
                        anoExibido.dispatchEvent(new CustomEvent('yearchange', { detail: { year: parseInt(val) } }));
                    }
                }

                dropdown.dispatchEvent(new CustomEvent('change', { detail: { value: val } }));
                return;
            }
        }

        document.querySelectorAll('.custom-dropdown.aberto, .dropdown-personalizado.aberto, .date-picker-dropdown.aberto').forEach(d => {
            d.classList.remove('aberto');
        });
    });

    // --- GERENCIAMENTO DE NOTIFICAÇÕES GLOBAL ---
    const token = localStorage.getItem('jwt');
    let notificacoes = [];

    const carregarNotificacoes = () => {
        if (!token) return;
        fetch('/user/listRequestsToChangePassword', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar notificações.');
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
            // Se recebeu HTML (redirecionamento de login do Spring), a sessão expirou
            localStorage.removeItem("jwt");
            sessionStorage.removeItem("cne_user_name");
            if (window.location.pathname !== '/login') {
                window.location.href = "/login";
            }
            throw new Error('Sessão expirada');
        })
        .then(dados => {
            notificacoes = dados;
            renderizarNotificacoes();
        })
        .catch(err => {
            if (err.message !== 'Sessão expirada') {
                console.error(err);
            }
        });
    };
    window.carregarNotificacoes = carregarNotificacoes;

    const renderizarNotificacoes = () => {
        const bellBadge = document.getElementById('bell-badge');
        const notificationsList = document.getElementById('notifications-list');
        if (!notificationsList) return;

        const total = notificacoes.length;

        if (total > 0) {
            if (bellBadge) {
                bellBadge.style.display = 'flex';
                bellBadge.textContent = total;
            }

            notificationsList.innerHTML = notificacoes.map(req => `
                <div class="item-notificacao">
                    <div class="info-notificacao">
                        <span class="nome-notificacao">${req.name} - ${req.RA}</span>
                        <span class="desc-notificacao">Deseja Redefinir a Senha</span>
                    </div>
                    <div class="acoes-notificacao">
                        <button class="btn-notif-action btn-notif-approve" data-ra="${req.RA}" title="Aprovar redefinição">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="btn-notif-action btn-notif-reject" data-ra="${req.RA}" title="Recusar pedido">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            if (bellBadge) bellBadge.style.display = 'none';
            notificationsList.innerHTML = '<div class="sem-notificacoes">Nenhuma notificação pendente</div>';
        }
    };

    // Toggle Dropdown
    document.body.addEventListener('click', (e) => {
        const bellBtn = e.target.closest('#bell-button');
        const dropdown = document.getElementById('notifications-dropdown');
        
        if (bellBtn) {
            if (dropdown && !e.target.closest('#notifications-dropdown')) {
                const isOpen = dropdown.style.display === 'block';
                dropdown.style.display = isOpen ? 'none' : 'block';
                e.stopPropagation();
            }
        } else {
            if (dropdown && !e.target.closest('#notifications-dropdown')) {
                dropdown.style.display = 'none';
            }
        }
    });

    // Ações das notificações
    document.body.addEventListener('click', (e) => {
        const approveBtn = e.target.closest('.btn-notif-approve');
        const rejectBtn = e.target.closest('.btn-notif-reject');
        const markAllReadBtn = e.target.closest('#mark-all-read');

        if (approveBtn) {
            const ra = approveBtn.getAttribute('data-ra');
            fetch(`/user/resetUserPassword/${ra}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao aprovar redefinição.');
                alert('Senha redefinida para a matrícula com sucesso!');
                carregarNotificacoes();
            })
            .catch(err => alert(err.message));
        }

        if (rejectBtn) {
            const ra = rejectBtn.getAttribute('data-ra');
            fetch(`/user/cancelResetRequest/${ra}`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(res => {
                if (!res.ok) throw new Error('Erro ao recusar pedido.');
                carregarNotificacoes();
            })
            .catch(err => alert(err.message));
        }

        if (markAllReadBtn) {
            e.stopPropagation();
            if (notificacoes.length === 0) return;

            window.confirmCne('Deseja descartar todos os pedidos de redefinição de senha?').then(async (confirmed) => {
                if (confirmed) {
                    const promises = notificacoes.map(req => 
                        fetch(`/user/cancelResetRequest/${req.RA}`, {
                            method: 'GET',
                            headers: { 'Authorization': 'Bearer ' + token }
                        })
                    );

                    try {
                        await Promise.all(promises);
                        carregarNotificacoes();
                    } catch (err) {
                        console.error('Erro ao descartar notificações:', err);
                    }
                }
            });
        }
    });

    // Inicialização da notificação e do perfil
    carregarNotificacoes();
    setInterval(carregarNotificacoes, 30000);
    exibirUsuarioLogado();

    // --- ROTEADOR SPA DO CNE ---
    const spaRoutes = ['/calendario', '/cenarios', '/alunos', '/unidades', '/usuarios', '/disciplinas', '/responsaveis'];

    document.body.addEventListener('click', async (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Limpa o token JWT ao clicar no botão de Sair
        if (link.classList.contains('botao-sair')) {
            localStorage.removeItem('jwt');
            sessionStorage.removeItem('cne_user_name');
        }

        const href = link.getAttribute('href');
        const currentPath = window.location.pathname;

        // Intercepta se a rota de destino for uma das rotas SPA
        if (spaRoutes.includes(href)) {
            e.preventDefault();
            await navigateTo(href);
        }
    });

    window.addEventListener('popstate', async () => {
        const path = window.location.pathname;
        if (spaRoutes.includes(path)) {
            await loadPageContent(path, false);
        }
    });
});

async function navigateTo(url) {
    await loadPageContent(url, true);
}

// Injeta o perfil do usuário logado no cabeçalho
function exibirUsuarioLogado() {
    const cabecalhoDireito = document.querySelector('.cabecalho-direito');
    if (!cabecalhoDireito) return;

    let userEl = document.getElementById('usuario-logado-header');
    if (!userEl) {
        userEl = document.createElement('div');
        userEl.id = 'usuario-logado-header';
        userEl.className = 'usuario-logado';
        cabecalhoDireito.insertBefore(userEl, cabecalhoDireito.firstChild);
    }

    const token = localStorage.getItem('jwt');
    if (!token) return;

    let ra = null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        ra = payload.sub;
    } catch (e) {
        console.error("Erro ao decodificar token para obter RA:", e);
    }

    if (!ra) return;

    const cachedName = sessionStorage.getItem('cne_user_name');
    if (cachedName) {
        userEl.innerHTML = `
            <img class="usuario-foto" src="https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cachedName)}&backgroundColor=1e5b3e&textColor=ffffff" alt="Avatar" />
            <span class="usuario-nome">${cachedName}</span>
        `;
        return;
    }

    // Default template while loading
    userEl.innerHTML = `
        <img class="usuario-foto" src="https://api.dicebear.com/7.x/initials/svg?seed=U&backgroundColor=1e5b3e&textColor=ffffff" alt="Avatar" />
        <span class="usuario-nome">Carregando...</span>
    `;

    fetch('/user/list', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if (res.ok) {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }
        }
        // Se a resposta for inválida ou não for JSON (provável expiração de token)
        localStorage.removeItem("jwt");
        sessionStorage.removeItem("cne_user_name");
        if (window.location.pathname !== '/login') {
            window.location.href = "/login";
        }
        throw new Error('Sessão expirada');
    })
    .then(users => {
        const currentUser = users.find(u => u.RA === ra || u.ra === ra);
        if (currentUser) {
            sessionStorage.setItem('cne_user_name', currentUser.name);
            userEl.innerHTML = `
                <img class="usuario-foto" src="https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(currentUser.name)}&backgroundColor=1e5b3e&textColor=ffffff" alt="Avatar" />
                <span class="usuario-nome">${currentUser.name}</span>
            `;
        } else {
            userEl.innerHTML = `
                <img class="usuario-foto" src="https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(ra)}&backgroundColor=1e5b3e&textColor=ffffff" alt="Avatar" />
                <span class="usuario-nome">${ra}</span>
            `;
        }
    })
    .catch(err => {
        if (err.message !== 'Sessão expirada') {
            console.error("Erro ao carregar dados do usuário logado:", err);
            userEl.innerHTML = `
                <img class="usuario-foto" src="https://api.dicebear.com/7.x/initials/svg?seed=Admin&backgroundColor=1e5b3e&textColor=ffffff" alt="Avatar" />
                <span class="usuario-nome">Administrador</span>
            `;
        }
    });
}

async function loadPageScripts(doc) {
    const scripts = Array.from(doc.querySelectorAll('script[src]'));
    const loadPromises = [];

    for (const script of scripts) {
        const src = script.getAttribute('src');
        if (src.includes('main.js')) continue;

        const alreadyLoaded = document.querySelector(`script[src="${src}"]`);
        if (!alreadyLoaded) {
            const newScript = document.createElement('script');
            newScript.src = src;
            newScript.async = false;
            
            const loadPromise = new Promise((resolve, reject) => {
                newScript.onload = () => resolve();
                newScript.onerror = () => reject(new Error(`Falha ao carregar script: ${src}`));
            });
            document.body.appendChild(newScript);
            loadPromises.push(loadPromise);
        }
    }

    if (loadPromises.length > 0) {
        await Promise.all(loadPromises);
    }
}

async function loadPageStylesheets(doc) {
    // 1. Remove stylesheets temporários de outras subpáginas para evitar conflitos
    const existingSubpageStyles = document.querySelectorAll('link[rel="stylesheet"][href*="Interface-"], link[rel="stylesheet"][href*="PopUps/"]');
    existingSubpageStyles.forEach(link => link.remove());

    // 2. Carrega as folhas de estilo da nova página
    const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
    for (const link of links) {
        const href = link.getAttribute('href');
        if (!href) continue;

        // Ignora styles globais e ícones que já estão no base
        if (href.includes('dashboard.css') || href.includes('all.min.css') || href.includes('favicon')) continue;

        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = href;
        document.head.appendChild(newLink);
    }
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

        // Carregar dinamicamente os estilos e depois os scripts da nova página
        await loadPageStylesheets(doc);
        await loadPageScripts(doc);

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
            } else if (url === '/alunos' && typeof window.initAlunos === 'function') {
                window.initAlunos();
            } else if (url === '/unidades' && typeof window.initUnidades === 'function') {
                window.initUnidades();
            } else if (url === '/usuarios' && typeof window.initUsuarios === 'function') {
                window.initUsuarios();
            } else if (url === '/disciplinas' && typeof window.initDisciplinas === 'function') {
                window.initDisciplinas();
            } else if (url === '/responsaveis' && typeof window.initResponsaveis === 'function') {
                window.initResponsaveis();
            }

            if (typeof window.carregarNotificacoes === 'function') {
                window.carregarNotificacoes();
            }

            // Exibir o usuário logado no novo header
            exibirUsuarioLogado();

            if (typeof window.updateSidebarActiveLink === 'function') {
                window.updateSidebarActiveLink();
            }
        }
    } catch (error) {
        console.error('Erro na navegação dinâmica (SPA):', error);
        window.location.href = url;
    }
}
