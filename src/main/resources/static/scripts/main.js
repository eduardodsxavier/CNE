document.addEventListener('DOMContentLoaded', () => {
    // Caminho para a pasta do nosso componente
    const componentPath = '/components/sidebar/';

    // 1. Cria um placeholder no body para injetar o HTML da sidebar
    const sidebarPlaceholder = document.createElement('div');
    sidebarPlaceholder.id = 'sidebar-container';
    document.body.prepend(sidebarPlaceholder); // Adiciona no início do <body>

    // 2. Carrega o CSS do componente e o adiciona ao <head>
    const sidebarCSS = document.createElement('link');
    sidebarCSS.rel = 'stylesheet';
    sidebarCSS.href = `${componentPath}sidebar.css`;
    document.head.appendChild(sidebarCSS);

    // 3. Carrega o HTML do componente e o injeta no placeholder
    fetch(`${componentPath}sidebar.html`)
        .then(response => response.text())
        .then(html => {
            sidebarPlaceholder.innerHTML = html;

            // 4. Carrega o JS do componente
            const sidebarJS = document.createElement('script');
            sidebarJS.src = `${componentPath}sidebar.js`;
            
            // 5. IMPORTANTE: Só executa a função de setup DEPOIS que o script for carregado
            sidebarJS.onload = () => {
                setupSidebar();
            };
            
            document.body.appendChild(sidebarJS);
        })
        .catch(error => {
            console.error('Falha ao carregar o componente da sidebar:', error);
        });
});
