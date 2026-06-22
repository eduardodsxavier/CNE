document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.getElementById('tabela-responsaveis-corpo');
    const token = localStorage.getItem('jwt');
    const campoPesquisa = document.querySelector('.campo-pesquisa-responsaveis');

    let responsaveis = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 

    // --- CARREGAR RESPONSÁVEIS TCE ---
    const carregarResponsaveis = () => {
        fetch('/tce', {
            method: 'GET',
            headers: {
                ...(token && { 'Authorization': 'Bearer ' + token }),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar responsáveis TCE');
            return response.json();
        })
        .then(dadosRecebidos => {
            responsaveis = dadosRecebidos; 
            renderizarTabela(responsaveis);
            atualizarSetas();
        })
        .catch(error => {
            console.error(error);
            tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #ef4444; padding: 20px;">Erro ao carregar responsáveis TCE</td></tr>';
        });
    };
    window.carregarResponsaveis = carregarResponsaveis;

    // --- RENDERIZAR TABELA ---
    const renderizarTabela = (dados) => {
        tabelaBody.innerHTML = ''; 
        if (dados.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 20px;">Nenhum responsável TCE encontrado.</td></tr>';
            return;
        }
        dados.forEach(resp => {
            const tr = document.createElement('tr');
            const statusClass = resp.deleted ? 'inativa' : 'ativa';
            const statusText = resp.deleted ? 'Inativa' : 'Ativa';
            
            tr.innerHTML = `
                <td>${resp.id}</td>
                <td>${resp.nome}</td>
                <td>${resp.cargo}</td>
                <td>${resp.email}</td>
                <td>${resp.telefone}</td>
                <td>
                    <span class="status-pill ${statusClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="celula-acoes">
                    <button class="botao-menu2 btn-edit" aria-label="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button> 
                    <button class="botao-menu2 btn-trash" aria-label="Alterar Status">
                        <i class="fa-solid fa-sync-alt" style="font-size: 16px;"></i>
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
            const filtrados = responsaveis.filter(r => {
                return (r.nome && r.nome.toLowerCase().includes(termo)) ||
                       (r.cargo && r.cargo.toLowerCase().includes(termo)) ||
                       (r.email && r.email.toLowerCase().includes(termo)) ||
                       (r.telefone && r.telefone.toLowerCase().includes(termo)) ||
                       (r.id && r.id.toString().includes(termo));
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

        responsaveis.sort((a, b) => {
            let valorA = '';
            let valorB = '';

            if (coluna === 'id') {
                valorA = a.id;
                valorB = b.id;
                return sortDirection === 'asc' ? valorA - valorB : valorB - valorA;
            } else if (coluna === 'deleted') {
                valorA = a.deleted ? 'inativa' : 'ativa';
                valorB = b.deleted ? 'inativa' : 'ativa';
            } else {
                valorA = a[coluna];
                valorB = b[coluna];
            }

            valorA = (valorA || '').toString().toLowerCase();
            valorB = (valorB || '').toString().toLowerCase();
            
            let comparacao = 0;
            if (valorA > valorB) comparacao = 1;
            else if (valorA < valorB) comparacao = -1;

            return sortDirection === 'asc' ? comparacao : comparacao * -1; 
        });

        // Reapply current search text if any
        const termo = campoPesquisa ? campoPesquisa.value.toLowerCase().trim() : '';
        const exibidos = termo ? responsaveis.filter(r => {
            return (r.nome && r.nome.toLowerCase().includes(termo)) ||
                   (r.cargo && r.cargo.toLowerCase().includes(termo)) ||
                   (r.email && r.email.toLowerCase().includes(termo)) ||
                   (r.telefone && r.telefone.toLowerCase().includes(termo)) ||
                   (r.id && r.id.toString().includes(termo));
        }) : responsaveis;

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

    // --- DELEGAÇÃO DE EVENTOS PARA AÇÕES NA TABELA (EDITAR/ALTERAR STATUS) ---
    tabelaBody.addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        const btnTrash = e.target.closest('.btn-trash');

        if (btnEdit) {
            const tr = btnEdit.closest('tr');
            const id = parseInt(tr.querySelector('td:nth-child(1)').textContent.trim());
            const resp = responsaveis.find(r => r.id === id);
            if (resp && window.showPopup) {
                window.showPopup(true, resp, carregarResponsaveis);
            }
        }

        if (btnTrash) {
            const tr = btnTrash.closest('tr');
            const id = parseInt(tr.querySelector('td:nth-child(1)').textContent.trim());
            const nome = tr.querySelector('td:nth-child(2)').textContent.trim();
            const resp = responsaveis.find(r => r.id === id);
            const acao = resp.deleted ? 'ativar' : 'inativar';

            window.confirmCne(`Deseja realmente ${acao} o responsável TCE "${nome}"?`).then(confirmed => {
                if (confirmed) {
                    fetch(`/tce/${id}`, {
                        method: 'DELETE',
                        headers: {
                            ...(token && { 'Authorization': 'Bearer ' + token })
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Erro ao alterar status do responsável TCE.');
                        alert(`Responsável TCE ${resp.deleted ? 'ativado' : 'inativado'} com sucesso!`);
                        carregarResponsaveis();
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
    carregarResponsaveis();
});
