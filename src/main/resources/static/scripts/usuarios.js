document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.getElementById('tabela-usuarios-corpo');
    const token = localStorage.getItem('token');
    

    let usuarios = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 

    const renderizarTabela = (dados) => {
        tabelaBody.innerHTML = ''; 
        dados.forEach(user => {
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
    };


    const ordenarDados = (coluna) => {

        if (sortColumn === coluna) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn = coluna;
            sortDirection = 'asc';
        }


        usuarios.sort((a, b) => {
            const valorA = a[coluna];
            const valorB = b[coluna];
            
            let comparacao = 0;
            if (valorA > valorB) {
                comparacao = 1;
            } else if (valorA < valorB) {
                comparacao = -1;
            }

            return sortDirection === 'asc' ? comparacao : comparacao * -1; 
        });

  
        renderizarTabela(usuarios);

        atualizarSetas();
    };
    

    const atualizarSetas = () => {
        document.querySelectorAll('th.sortable i').forEach(seta => {
            const th = seta.parentElement;
            if (th.dataset.column === sortColumn) {
                seta.style.visibility = 'visible'; 
                seta.classList.remove('fa-arrow-up', 'fa-arrow-down');
                seta.classList.add(sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down');
            } 
        });
    };

    document.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            ordenarDados(th.dataset.column);
        });
    });


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
    .then(dadosRecebidos => {
        usuarios = dadosRecebidos; 
        renderizarTabela(usuarios);
        atualizarSetas();
    })
    .catch(error => {
        console.error(error);
        tabelaBody.innerHTML = '<tr><td colspan="5">Erro ao carregar usuários</td></tr>';
    });
});