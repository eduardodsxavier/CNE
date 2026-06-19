document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.getElementById('tabela-usuarios-corpo');
    const token = localStorage.getItem('jwt');
    const bellButton = document.getElementById('bell-button');
    const bellBadge = document.getElementById('bell-badge');
    const notificationsDropdown = document.getElementById('notifications-dropdown');
    const notificationsList = document.getElementById('notifications-list');
    const markAllReadBtn = document.getElementById('mark-all-read');

    let usuarios = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 
    let notificacoes = [];

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

    // --- ORDENAÇÃO DE DADOS ---
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
            if (valorA > valorB) comparacao = 1;
            else if (valorA < valorB) comparacao = -1;

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

    // --- DELEGAÇÃO DE EVENTOS PARA AÇÕES NA TABELA (EDITAR/EXCLUIR) ---
    tabelaBody.addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        const btnTrash = e.target.closest('.btn-trash');

        if (btnEdit) {
            const tr = btnEdit.closest('tr');
            const ra = tr.querySelector('td:nth-child(1)').textContent.trim();
            const user = usuarios.find(u => u.RA === ra);
            if (user && window.showPopup) {
                window.showPopup(true, user, carregarUsuarios);
            }
        }

        if (btnTrash) {
            const tr = btnTrash.closest('tr');
            const ra = tr.querySelector('td:nth-child(1)').textContent.trim();
            const name = tr.querySelector('td:nth-child(2)').textContent.trim();

            if (confirm(`Deseja realmente inativar (excluir) o usuário "${name}" (Matrícula: ${ra})?`)) {
                fetch(`/user/changeStatus/${ra}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao desativar usuário.');
                    alert('Usuário inativado com sucesso!');
                    carregarUsuarios();
                })
                .catch(err => {
                    console.error(err);
                    alert(err.message);
                });
            }
        }
    });

    // --- GERENCIAMENTO DE NOTIFICAÇÕES (REDEFINIÇÃO DE SENHA) ---
    const carregarNotificacoes = () => {
        fetch('/user/listRequestsToChangePassword', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar notificações.');
            return response.json();
        })
        .then(dados => {
            notificacoes = dados;
            renderizarNotificacoes();
        })
        .catch(err => {
            console.error(err);
        });
    };

    const renderizarNotificacoes = () => {
        notificationsList.innerHTML = '';
        const total = notificacoes.length;

        if (total > 0) {
            bellBadge.style.display = 'block';
            bellBadge.textContent = total;

            notificacoes.forEach(req => {
                const div = document.createElement('div');
                div.className = 'item-notificacao';
                div.innerHTML = `
                    <div class="info-notificacao">
                        <span class="nome-notificacao">${req.name}-${req.RA}</span>
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
                `;
                notificationsList.appendChild(div);
            });
        } else {
            bellBadge.style.display = 'none';
            notificationsList.innerHTML = '<div class="sem-notificacoes">Nenhuma notificação pendente</div>';
        }
    };

    // Toggle Dropdown
    if (bellButton) {
        bellButton.addEventListener('click', (e) => {
            // Only toggle when clicking the bell icon or badge, not inside the dropdown itself
            if (!e.target.closest('#notifications-dropdown')) {
                const isOpen = notificationsDropdown.style.display === 'block';
                notificationsDropdown.style.display = isOpen ? 'none' : 'block';
                e.stopPropagation();
            }
        });
    }

    // Close Dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (notificationsDropdown && !bellButton.contains(e.target)) {
            notificationsDropdown.style.display = 'none';
        }
    });

    // Handle approval and rejection of resets
    notificationsList.addEventListener('click', (e) => {
        const approveBtn = e.target.closest('.btn-notif-approve');
        const rejectBtn = e.target.closest('.btn-notif-reject');

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
    });

    // Mark All as Read (Cancel all reset requests)
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            if (notificacoes.length === 0) return;

            if (confirm('Deseja descartar todos os pedidos de redefinição de senha?')) {
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

    // --- INICIALIZAÇÃO ---
    carregarUsuarios();
    carregarNotificacoes();
});
