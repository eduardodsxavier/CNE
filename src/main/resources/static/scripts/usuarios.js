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
                <td class="celula-acoes">
                    <button class="botao-menu2" aria-label="Editar">
                        <i class="fa-solid fa-pen-to-square btn-edit"></i>
                    </button> 
                    <button class="botao-menu2" aria-label="Excluir">
                        <i class="fa-solid fa-trash-can btn-trash"></i>
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

