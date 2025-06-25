document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.querySelector('.tabela tbody');
    const token = localStorage.getItem('token');

    fetch('/user/list', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        return response.json();
    })
    .then(usuarios => {
        tabelaBody.innerHTML = ''; 
        usuarios.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.RA}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.admin ? 'Administrador' : 'Usuário'}</td>
                <td>
                    <button class="botao-menu2" aria-label="Mais opções">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error(error);
        tabelaBody.innerHTML = '<tr><td colspan="5">Erro ao carregar usuários</td></tr>';
    });
});

