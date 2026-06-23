function initDisciplinas() {
    const tabelaBody = document.getElementById('tabela-disciplinas-corpo');
    if (!tabelaBody) return;

    const token = localStorage.getItem('jwt');
    const campoPesquisa = document.querySelector('.campo-pesquisa-disciplinas');

    let disciplinas = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 

    // --- CARREGAR DISCIPLINAS ---
    const carregarDisciplinas = () => {
        fetch('/disciplina', {
            method: 'GET',
            headers: {
                ...(token && { 'Authorization': 'Bearer ' + token }),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar disciplinas');
            return response.json();
        })
        .then(dadosRecebidos => {
            disciplinas = dadosRecebidos; 
            renderizarTabela(disciplinas);
            atualizarSetas();
        })
        .catch(error => {
            console.error(error);
            tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #ef4444; padding: 20px;">Erro ao carregar disciplinas</td></tr>';
        });
    };
    window.carregarDisciplinas = carregarDisciplinas;

    // --- RENDERIZAR TABELA ---
    const renderizarTabela = (dados) => {
        tabelaBody.innerHTML = ''; 
        if (dados.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 20px;">Nenhuma disciplina encontrada.</td></tr>';
            return;
        }
        dados.forEach(disciplina => {
            const tr = document.createElement('tr');
            const statusClass = disciplina.deleted ? 'inativa' : 'ativa';
            const statusText = disciplina.deleted ? 'Inativa' : 'Ativa';
            
            const responsavelNome = disciplina.responsavel ? disciplina.responsavel.nome : '---';
            const responsavelEmail = disciplina.responsavel ? disciplina.responsavel.email : '---';
            
            tr.innerHTML = `
                <td>${disciplina.id}</td>
                <td>${disciplina.nome}</td>
                <td>${disciplina.cargaHoraria}h</td>
                <td>${responsavelNome}</td>
                <td>${responsavelEmail}</td>
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
            const filtrados = disciplinas.filter(d => {
                const responsavelNome = d.responsavel ? d.responsavel.nome.toLowerCase() : '';
                const responsavelEmail = d.responsavel ? d.responsavel.email.toLowerCase() : '';
                return (d.nome && d.nome.toLowerCase().includes(termo)) ||
                       (d.id && d.id.toString().includes(termo)) ||
                       responsavelNome.includes(termo) ||
                       responsavelEmail.includes(termo);
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

        disciplinas.sort((a, b) => {
            let valorA = '';
            let valorB = '';

            if (coluna === 'responsavelNome') {
                valorA = a.responsavel ? a.responsavel.nome : '';
                valorB = b.responsavel ? b.responsavel.nome : '';
            } else if (coluna === 'responsavelEmail') {
                valorA = a.responsavel ? a.responsavel.email : '';
                valorB = b.responsavel ? b.responsavel.email : '';
            } else if (coluna === 'cargaHoraria') {
                valorA = a.cargaHoraria;
                valorB = b.cargaHoraria;
                return sortDirection === 'asc' ? valorA - valorB : valorB - valorA;
            } else if (coluna === 'id') {
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
        const exibidos = termo ? disciplinas.filter(d => {
            const responsavelNome = d.responsavel ? d.responsavel.nome.toLowerCase() : '';
            const responsavelEmail = d.responsavel ? d.responsavel.email.toLowerCase() : '';
            return (d.nome && d.nome.toLowerCase().includes(termo)) ||
                   (d.id && d.id.toString().includes(termo)) ||
                   responsavelNome.includes(termo) ||
                   responsavelEmail.includes(termo);
        }) : disciplinas;

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
            const disciplina = disciplinas.find(d => d.id === id);
            if (disciplina && window.showPopup) {
                window.showPopup(true, disciplina, carregarDisciplinas);
            }
        }

        if (btnTrash) {
            const tr = btnTrash.closest('tr');
            const id = parseInt(tr.querySelector('td:nth-child(1)').textContent.trim());
            const nome = tr.querySelector('td:nth-child(2)').textContent.trim();
            const disciplina = disciplinas.find(d => d.id === id);
            const acao = disciplina.deleted ? 'ativar' : 'inativar';

            window.confirmCne(`Deseja realmente ${acao} a disciplina "${nome}"?`).then(confirmed => {
                if (confirmed) {
                    fetch(`/disciplina/${id}`, {
                        method: 'DELETE',
                        headers: {
                            ...(token && { 'Authorization': 'Bearer ' + token })
                        }
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Erro ao alterar status da disciplina.');
                        alert(`Disciplina ${disciplina.deleted ? 'ativada' : 'inativada'} com sucesso!`);
                        carregarDisciplinas();
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
    carregarDisciplinas();
}

window.initDisciplinas = initDisciplinas;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDisciplinas);
} else {
    initDisciplinas();
}
