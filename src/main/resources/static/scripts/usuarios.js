function initUsuarios() {
    const tabelaBody = document.getElementById('tabela-usuarios-corpo');
    if (!tabelaBody) return;

    const token = localStorage.getItem('jwt');
    const campoPesquisa = document.querySelector('.campo-pesquisa-usuarios');

    let usuarios = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 

    // --- CARREGAR USUÁRIOS ---
    const carregarUsuarios = () => {
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
            tabelaBody.innerHTML = '<tr><td colspan="5" class="sem-notificacoes">Erro ao carregar usuários</td></tr>';
        });
    };
    window.carregarUsuarios = carregarUsuarios;

    // --- RENDERIZAR TABELA ---
    const renderizarTabela = (dados) => {
        tabelaBody.innerHTML = ''; 
        if (dados.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">Nenhum usuário encontrado.</td></tr>';
            return;
        }
        dados.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.RA}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.admin ? 'Administrador' : 'Usuário'}</td>
                <td class="celula-acoes">
                    <button class="botao-menu2 btn-edit" aria-label="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button> 
                    <button class="botao-menu2 btn-trash" aria-label="Excluir">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });
    };

    // --- PESQUISA CLIENT-SIDE ---
    if (campoPesquisa) {
        campoPesquisa.addEventListener('input', () => {
            const termo = campoPesquisa.value.toLowerCase().trim();
            const filtrados = usuarios.filter(u => {
                return (u.RA && u.RA.toLowerCase().includes(termo)) ||
                       (u.name && u.name.toLowerCase().includes(termo)) ||
                       (u.email && u.email.toLowerCase().includes(termo)) ||
                       (u.admin ? 'administrador' : 'usuário').includes(termo);
            });
            renderizarTabela(filtrados);
        });
    }

    // --- ORDENAÇÃO DE DADOS ---
    const ordenarDados = (coluna) => {
        if (sortColumn === coluna) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn = coluna;
            sortDirection = 'asc';
        }

        usuarios.sort((a, b) => {
            let valorA = a[coluna];
            let valorB = b[coluna];

            if (coluna === 'admin') {
                valorA = valorA ? 'administrador' : 'usuário';
                valorB = valorB ? 'administrador' : 'usuário';
            }

            valorA = (valorA || '').toString().toLowerCase();
            valorB = (valorB || '').toString().toLowerCase();
            
            let comparacao = 0;
            if (valorA > valorB) comparacao = 1;
            else if (valorA < valorB) comparacao = -1;

            return sortDirection === 'asc' ? comparacao : comparacao * -1; 
        });

        const termo = campoPesquisa ? campoPesquisa.value.toLowerCase().trim() : '';
        const exibidos = termo ? usuarios.filter(u => {
            return (u.RA && u.RA.toLowerCase().includes(termo)) ||
                   (u.name && u.name.toLowerCase().includes(termo)) ||
                   (u.email && u.email.toLowerCase().includes(termo)) ||
                   (u.admin ? 'administrador' : 'usuário').includes(termo);
        }) : usuarios;

        renderizarTabela(exibidos);
        atualizarSetas();
    };
    
    const atualizarSetas = () => {
        document.querySelectorAll('th.sortable i').forEach(seta => {
            const th = seta.parentElement;
            if (th.dataset.column === sortColumn) {
                seta.style.visibility = 'visible'; 
                seta.classList.remove('fa-arrow-up', 'fa-arrow-down');
                seta.classList.add(sortDirection === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down');
            } else {
                seta.style.visibility = 'hidden';
            }
        });
    };

    document.querySelectorAll('th.sortable').forEach(th => {
        const icon = th.querySelector('i');
        if (icon) icon.style.visibility = 'hidden';

        th.addEventListener('click', () => {
            ordenarDados(th.dataset.column);
        });
    });

    // --- DELEGAÇÃO DE EVENTOS PARA AÇÕES NA TABELA (EDITAR/EXCLUIR) ---
    tabelaBody.addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        const btnTrash = e.target.closest('.btn-trash');

        if (btnEdit) {
            const tr = btnEdit.closest('tr');
            const ra = tr.querySelector('td:nth-child(1)').textContent.trim();
            const user = usuarios.find(u => u.RA === ra);
            if (user && window.showPopupUsuario) {
                window.showPopupUsuario(true, user, carregarUsuarios);
            }
        }

        if (btnTrash) {
            const tr = btnTrash.closest('tr');
            const ra = tr.querySelector('td:nth-child(1)').textContent.trim();
            const name = tr.querySelector('td:nth-child(2)').textContent.trim();

            window.confirmCne(`Deseja realmente inativar (excluir) o usuário "${name}" (Matrícula: ${ra})?`).then(confirmed => {
                if (confirmed) {
                    fetch(`/user/changeStatus/${ra}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                    .then(async response => {
                        if (!response.ok) {
                            const errorText = await response.text().catch(() => '');
                            throw new Error(errorText || 'Erro ao desativar usuário.');
                        }
                        alert('Usuário inativado/ativado com sucesso!');
                        carregarUsuarios();
                    })
                    .catch(err => {
                        console.error(err);
                        alert(err.message);
                    });
                }
            });
        }
    });

    // --- INICIALIZAÇÃO ---
    carregarUsuarios();
}

window.initUsuarios = initUsuarios;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUsuarios);
} else {
    initUsuarios();
}
