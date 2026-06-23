function initUnidades() {
    const tabelaBody = document.getElementById('tabela-unidades-corpo');
    if (!tabelaBody) return;

    const token = localStorage.getItem('jwt');
    const campoPesquisa = document.querySelector('.campo-pesquisa-unidades');

    let unidades = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 

    // --- CARREGAR UNIDADES ---
    const carregarUnidades = () => {
        fetch('/unidade', {
            method: 'GET',
            headers: {
                ...(token && { 'Authorization': 'Bearer ' + token }),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar unidades');
            return response.json();
        })
        .then(dadosRecebidos => {
            // Keep all units (active and inactive/deleted) visible as per mockup requirement
            unidades = dadosRecebidos; 
            renderizarTabela(unidades);
            atualizarSetas();
        })
        .catch(error => {
            console.error(error);
            tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #ef4444; padding: 20px;">Erro ao carregar unidades</td></tr>';
        });
    };
    window.carregarUnidades = carregarUnidades;

    // --- RENDERIZAR TABELA ---
    const renderizarTabela = (dados) => {
        tabelaBody.innerHTML = ''; 
        if (dados.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 20px;">Nenhuma unidade encontrada.</td></tr>';
            return;
        }
        dados.forEach(unidade => {
            const tr = document.createElement('tr');
            const statusClass = unidade.deleted ? 'inativa' : 'ativa';
            const statusText = unidade.deleted ? 'Inativa' : 'Ativa';
            
            tr.innerHTML = `
                <td>${unidade.id}</td>
                <td>${unidade.nome}</td>
                <td>${unidade.interno ? 'Sim' : 'Não'}</td>
                <td>${unidade.convenioPublico ? 'Sim' : 'Não'}</td>
                <td>${unidade.sigla}</td>
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
            const filtrados = unidades.filter(u => {
                return (u.nome && u.nome.toLowerCase().includes(termo)) ||
                       (u.sigla && u.sigla.toLowerCase().includes(termo));
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

        unidades.sort((a, b) => {
            let valorA = a[coluna];
            let valorB = b[coluna];
            
            // Handle booleans/status formatting
            if (coluna === 'interno' || coluna === 'convenioPublico') {
                valorA = valorA ? 'sim' : 'não';
                valorB = valorB ? 'sim' : 'não';
            } else if (coluna === 'deleted') {
                valorA = valorA ? 'inativa' : 'ativa';
                valorB = valorB ? 'inativa' : 'ativa';
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
        const exibidos = termo ? unidades.filter(u => {
            return (u.nome && u.nome.toLowerCase().includes(termo)) ||
                   (u.sigla && u.sigla.toLowerCase().includes(termo));
        }) : unidades;

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
        // Ensure child icons start hidden unless it's the sorted column
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
            const unidade = unidades.find(u => u.id === id);
            if (unidade && window.showPopupUnidade) {
                window.showPopupUnidade(true, unidade, carregarUnidades);
            }
        }

        if (btnTrash) {
            const tr = btnTrash.closest('tr');
            const id = parseInt(tr.querySelector('td:nth-child(1)').textContent.trim());
            const nome = tr.querySelector('td:nth-child(2)').textContent.trim();
            const unidade = unidades.find(u => u.id === id);
            const acao = unidade.deleted ? 'ativar' : 'inativar';

            window.confirmCne(`Deseja realmente ${acao} a unidade "${nome}"?`).then(confirmed => {
                if (confirmed) {
                    fetch(`/unidade/${id}`, {
                        method: 'DELETE',
                        headers: {
                            ...(token && { 'Authorization': 'Bearer ' + token })
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Erro ao alterar status da unidade.');
                        alert(`Unidade ${unidade.deleted ? 'ativada' : 'inativada'} com sucesso!`);
                        carregarUnidades();
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
    carregarUnidades();
}

window.initUnidades = initUnidades;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUnidades);
} else {
    initUnidades();
}
