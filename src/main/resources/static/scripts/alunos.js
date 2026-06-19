document.addEventListener('DOMContentLoaded', () => {
    const tabelaBody = document.getElementById('tabela-alunos-corpo');
    const token = localStorage.getItem('jwt');
    const campoPesquisa = document.querySelector('.campo-pesquisa-alunos');

    let alunos = [];
    let sortColumn = null; 
    let sortDirection = 'asc'; 

    // --- CARREGAR ALUNOS ---
    const carregarAlunos = () => {
        fetch('/aluno', {
            method: 'GET',
            headers: {
                ...(token && { 'Authorization': 'Bearer ' + token }),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar alunos');
            return response.json();
        })
        .then(dadosRecebidos => {
            // Filter out deleted students
            alunos = dadosRecebidos.filter(a => !a.deleted); 
            renderizarTabela(alunos);
            atualizarSetas();
        })
        .catch(error => {
            console.error(error);
            tabelaBody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #ef4444; padding: 20px;">Erro ao carregar alunos</td></tr>';
        });
    };
    window.carregarAlunos = carregarAlunos;

    // --- RENDERIZAR TABELA ---
    const renderizarTabela = (dados) => {
        tabelaBody.innerHTML = ''; 
        if (dados.length === 0) {
            tabelaBody.innerHTML = '<tr><td colspan="8" style="text-align: center; color: #64748b; padding: 20px;">Nenhum aluno encontrado.</td></tr>';
            return;
        }
        dados.forEach(aluno => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${aluno.ra}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.email}</td>
                <td>${aluno.semestre || '-'}</td>
                <td>${aluno.turma}</td>
                <td>${aluno.curso}</td>
                <td>
                    <span class="status-pill ${aluno.status ? aluno.status.toLowerCase() : 'ativo'}">
                        ${aluno.status || 'Ativo'}
                    </span>
                </td>
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
            const filtrados = alunos.filter(a => {
                return (a.ra && a.ra.toLowerCase().includes(termo)) ||
                       (a.nome && a.nome.toLowerCase().includes(termo)) ||
                       (a.email && a.email.toLowerCase().includes(termo)) ||
                       (a.curso && a.curso.toLowerCase().includes(termo));
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

        alunos.sort((a, b) => {
            const valorA = (a[coluna] || '').toString().toLowerCase();
            const valorB = (b[coluna] || '').toString().toLowerCase();
            
            let comparacao = 0;
            if (valorA > valorB) comparacao = 1;
            else if (valorA < valorB) comparacao = -1;

            return sortDirection === 'asc' ? comparacao : comparacao * -1; 
        });

        // If we are filtering, keep the current search term's filter
        const termo = campoPesquisa ? campoPesquisa.value.toLowerCase().trim() : '';
        const exibidos = termo ? alunos.filter(a => {
            return (a.ra && a.ra.toLowerCase().includes(termo)) ||
                   (a.nome && a.nome.toLowerCase().includes(termo)) ||
                   (a.email && a.email.toLowerCase().includes(termo)) ||
                   (a.curso && a.curso.toLowerCase().includes(termo));
        }) : alunos;

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

    // --- DELEGAÇÃO DE EVENTOS PARA AÇÕES NA TABELA (EDITAR/EXCLUIR) ---
    tabelaBody.addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        const btnTrash = e.target.closest('.btn-trash');

        if (btnEdit) {
            const tr = btnEdit.closest('tr');
            const ra = tr.querySelector('td:nth-child(1)').textContent.trim();
            const aluno = alunos.find(a => a.ra === ra);
            if (aluno && window.showPopup) {
                window.showPopup(true, aluno, carregarAlunos);
            }
        }

        if (btnTrash) {
            const tr = btnTrash.closest('tr');
            const ra = tr.querySelector('td:nth-child(1)').textContent.trim();
            const nome = tr.querySelector('td:nth-child(2)').textContent.trim();

            if (confirm(`Deseja realmente inativar (excluir) o aluno "${nome}" (Matrícula: ${ra})?`)) {
                fetch(`/aluno/${ra}`, {
                    method: 'DELETE',
                    headers: {
                        ...(token && { 'Authorization': 'Bearer ' + token })
                    }
                })
                .then(response => {
                    if (!response.ok) throw new Error('Erro ao desativar aluno.');
                    alert('Aluno inativado com sucesso!');
                    carregarAlunos();
                })
                .catch(err => {
                    console.error(err);
                    alert(err.message);
                });
            }
        }
    });

    // --- INICIALIZAÇÃO ---
    carregarAlunos();
});
