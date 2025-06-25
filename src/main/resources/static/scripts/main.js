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
});
