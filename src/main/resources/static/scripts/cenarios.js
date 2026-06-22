let allCenarios = [];
let sortColumn = null;
let sortDirection = 'asc';

async function initCenarios() {
    const tbody = document.getElementById("tabela-cenarios");
    if (!tbody) return;

    const token = localStorage.getItem("jwt");

    if (!token) {
        alert("Token não encontrado. Faça login novamente.");
        window.location.href = "/login";
        return;
    }

    try {
        const response = await fetch("/cenario/list", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error("Erro ao buscar cenários");

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            allCenarios = await response.json();
            aplicarFiltrosEOrdenacao();
            configurarEventos();
        } else {
            // Se recebeu HTML (redirecionamento de login do Spring), a sessão expirou
            localStorage.removeItem("jwt");
            sessionStorage.removeItem("cne_user_name");
            if (window.location.pathname !== '/login') {
                alert("Sessão expirada. Faça login novamente.");
                window.location.href = "/login";
            }
            return;
        }

    } catch (error) {
        console.error("Erro ao buscar dados dos cenários:", error);
        if (window.location.pathname !== '/login') {
            alert("Falha ao carregar os cenários.");
        }
    }
}

window.initCenarios = initCenarios;
document.addEventListener("DOMContentLoaded", initCenarios);

function renderizarTabela(cenarios) {
    const tbody = document.getElementById("tabela-cenarios");
    if (!tbody) return;
    tbody.innerHTML = ""; 

    if (cenarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: #64748b; padding: 20px;">Nenhum cenário encontrado.</td></tr>';
        return;
    }

    cenarios.forEach(c => {
        const linha = document.createElement("tr");

        const vlrTotal = c.vlr ? `R$ ${parseFloat(c.vlr.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---';
        const statusText = c.status === 'INATIVO' ? 'Inativa' : 'Ativa';
        const statusClass = c.status === 'INATIVO' ? 'status-inativa' : 'status-ativa';

        linha.innerHTML = `
            <td>${c.anoSemestre || '---'}</td>
            <td>${c.unidade?.nome || '---'}</td>
            <td>${c.status || '---'}</td>
            <td>${c.aluno?.nome || '---'}</td>
            <td>${c.disciplina?.nome || '---'} / ${c.responsavelIES?.nome || '---'}</td>
            <td>${vlrTotal}</td>
            <td><span class="${statusClass}">${statusText}</span></td>
            <td>${c.tempo?.diasSemana ?? '---'}</td>
            <td>${c.tempo?.qtdDias ?? '---'}</td>
            <td>${c.tempo?.qtdHoras ? c.tempo.qtdHoras + 'h' : '---'}</td>
        `;

        tbody.appendChild(linha);
    });
}

function parseLocalDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    return new Date(dateStr);
}

function aplicarFiltrosEOrdenacao() {
    let filtrados = [...allCenarios];

    // 1. Filtro de Status (Ativa / Inativa)
    const statusDropdown = document.getElementById('dropdown-status');
    const statusVal = statusDropdown ? statusDropdown.dataset.valorSelecionado || statusDropdown.getAttribute('data-valor-selecionado') : '';
    if (statusVal) {
        if (statusVal === 'ativa') {
            filtrados = filtrados.filter(c => c.status !== 'INATIVO');
        } else if (statusVal === 'inativa') {
            filtrados = filtrados.filter(c => c.status === 'INATIVO');
        }
    }

    // 2. Filtro de Curso
    const cursoDropdown = document.getElementById('dropdown-curso');
    const cursoVal = cursoDropdown ? cursoDropdown.dataset.valorSelecionado || cursoDropdown.getAttribute('data-valor-selecionado') : '';
    if (cursoVal) {
        filtrados = filtrados.filter(c => {
            if (!c.aluno || !c.aluno.curso) return false;
            const cCurso = c.aluno.curso.toLowerCase();
            if (cursoVal === 'engenharia' && (cCurso.includes('engenharia') || cCurso.includes('eng'))) return true;
            if (cursoVal === 'direito' && cCurso.includes('direito')) return true;
            if (cursoVal === 'medicina' && cCurso.includes('medicina')) return true;
            if (cursoVal === 'adm' && (cCurso.includes('adm') || cCurso.includes('administração') || cCurso.includes('administracao'))) return true;
            return false;
        });
    }

    // 3. Filtro de Ano (Exibido na navegação)
    const anoExibidoEl = document.getElementById('ano-exibido');
    const anoVal = anoExibidoEl ? anoExibidoEl.textContent.trim() : '';
    if (anoVal) {
        filtrados = filtrados.filter(c => c.anoSemestre && c.anoSemestre.startsWith(anoVal));
    }

    // 4. Filtro de Semestre
    const semestreDropdown = document.getElementById('dropdown-semestre');
    const semestreVal = semestreDropdown ? semestreDropdown.dataset.valorSelecionado || semestreDropdown.getAttribute('data-valor-selecionado') : '';
    if (semestreVal && semestreVal !== 'Todos' && semestreVal !== '') {
        const suffix = `/${semestreVal}`;
        filtrados = filtrados.filter(c => c.anoSemestre && c.anoSemestre.endsWith(suffix));
    }

    // 5. Filtro de Faixa de Meses (Mês Início até Mês Fim)
    const mesInicioDropdown = document.getElementById('dropdown-mes-inicio');
    const mesFimDropdown = document.getElementById('dropdown-mes-fim');
    const mesInicioVal = mesInicioDropdown ? parseInt(mesInicioDropdown.dataset.valorSelecionado || mesInicioDropdown.getAttribute('data-valor-selecionado')) : NaN;
    const mesFimVal = mesFimDropdown ? parseInt(mesFimDropdown.dataset.valorSelecionado || mesFimDropdown.getAttribute('data-valor-selecionado')) : NaN;

    if (!isNaN(mesInicioVal) || !isNaN(mesFimVal)) {
        filtrados = filtrados.filter(c => {
            if (!c.tempo?.inicioEstagio) return false;
            const start = parseLocalDate(c.tempo.inicioEstagio);
            const end = c.tempo.terminoEstagio ? parseLocalDate(c.tempo.terminoEstagio) : start;
            if (!start) return false;
            
            const cStartMonth = start.getMonth() + 1; // 1-12
            const cEndMonth = end ? end.getMonth() + 1 : cStartMonth; // 1-12

            if (!isNaN(mesInicioVal) && !isNaN(mesFimVal)) {
                return (cStartMonth <= mesFimVal && cEndMonth >= mesInicioVal);
            } else if (!isNaN(mesInicioVal)) {
                return cEndMonth >= mesInicioVal;
            } else if (!isNaN(mesFimVal)) {
                return cStartMonth <= mesFimVal;
            }
            return true;
        });
    }

    // 6. Pesquisa Geral
    const campoPesquisa = document.querySelector('.campo-pesquisa');
    const termo = campoPesquisa ? campoPesquisa.value.toLowerCase().trim() : '';
    if (termo) {
        filtrados = filtrados.filter(c => {
            return (c.aluno?.nome && c.aluno.nome.toLowerCase().includes(termo)) ||
                   (c.aluno?.ra && c.aluno.ra.toLowerCase().includes(termo)) ||
                   (c.unidade?.nome && c.unidade.nome.toLowerCase().includes(termo)) ||
                   (c.disciplina?.nome && c.disciplina.nome.toLowerCase().includes(termo)) ||
                   (c.responsavelIES?.nome && c.responsavelIES.nome.toLowerCase().includes(termo)) ||
                   (c.anoSemestre && c.anoSemestre.toLowerCase().includes(termo));
        });
    }

    // 7. Ordenação
    if (sortColumn) {
        filtrados.sort((a, b) => {
            let valA = obterValorColuna(a, sortColumn);
            let valB = obterValorColuna(b, sortColumn);

            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();

            if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
            if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
            return 0;
        });
    }

    renderizarTabela(filtrados);
    atualizarSetas();
}

function obterValorColuna(cenario, coluna) {
    switch (coluna) {
        case 'anoSemestre': return cenario.anoSemestre || '';
        case 'unidade': return cenario.unidade?.nome || '';
        case 'situacaoTce': return cenario.status || '';
        case 'aluno': return cenario.aluno?.nome || '';
        case 'disciplina': return cenario.disciplina?.nome || '';
        case 'vlr': return cenario.vlr?.total || 0;
        case 'status': return cenario.status || '';
        case 'diasSemana': return cenario.tempo?.diasSemana || '';
        case 'qtdDias': return cenario.tempo?.qtdDias || 0;
        case 'qtdHoras': return cenario.tempo?.qtdHoras || 0;
        default: return '';
    }
}

function configurarEventos() {
    // Escutador da barra de pesquisa
    const campoPesquisa = document.querySelector('.campo-pesquisa');
    if (campoPesquisa) {
        campoPesquisa.removeEventListener('input', aplicarFiltrosEOrdenacao);
        campoPesquisa.addEventListener('input', aplicarFiltrosEOrdenacao);
    }

    // Escutadores para os dropdowns dinâmicos (disparados por CustomEvent 'change' via main.js)
    document.querySelectorAll('.secao-filtros-nova .custom-dropdown').forEach(dropdown => {
        dropdown.removeEventListener('change', aplicarFiltrosEOrdenacao);
        dropdown.addEventListener('change', aplicarFiltrosEOrdenacao);
    });

    // Escutador para navegação de ano via evento customizado
    const anoExibido = document.getElementById('ano-exibido');
    if (anoExibido) {
        anoExibido.removeEventListener('yearchange', aplicarFiltrosEOrdenacao);
        anoExibido.addEventListener('yearchange', aplicarFiltrosEOrdenacao);
    }

    // Configurar ordenação nas colunas
    document.querySelectorAll('th.sortable').forEach(th => {
        th.style.cursor = 'pointer';
        th.removeEventListener('click', lidarCliqueOrdenacao);
        th.addEventListener('click', lidarCliqueOrdenacao);
    });

    // Botão Limpar Filtros
    const btnLimpar = document.getElementById('btn-limpar-filtros');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            const dropdownStatus = document.getElementById('dropdown-status');
            const dropdownCurso = document.getElementById('dropdown-curso');
            const dropdownMesInicio = document.getElementById('dropdown-mes-inicio');
            const dropdownMesFim = document.getElementById('dropdown-mes-fim');
            const dropdownSemestre = document.getElementById('dropdown-semestre');
            const campoPesquisa = document.querySelector('.campo-pesquisa');

            if (dropdownStatus) {
                dropdownStatus.setAttribute('data-valor-selecionado', '');
                dropdownStatus.dataset.valorSelecionado = '';
                const sel = dropdownStatus.querySelector('.custom-dropdown__selected');
                if (sel) sel.textContent = 'Todos';
            }
            if (dropdownCurso) {
                dropdownCurso.setAttribute('data-valor-selecionado', '');
                dropdownCurso.dataset.valorSelecionado = '';
                const sel = dropdownCurso.querySelector('.custom-dropdown__selected');
                if (sel) sel.textContent = 'Todos';
            }
            if (dropdownMesInicio) {
                dropdownMesInicio.setAttribute('data-valor-selecionado', '');
                dropdownMesInicio.dataset.valorSelecionado = '';
                const sel = dropdownMesInicio.querySelector('.custom-dropdown__selected');
                if (sel) sel.textContent = 'Mês';
            }
            if (dropdownMesFim) {
                dropdownMesFim.setAttribute('data-valor-selecionado', '');
                dropdownMesFim.dataset.valorSelecionado = '';
                const sel = dropdownMesFim.querySelector('.custom-dropdown__selected');
                if (sel) sel.textContent = 'Mês';
            }
            if (dropdownSemestre) {
                dropdownSemestre.setAttribute('data-valor-selecionado', '');
                dropdownSemestre.dataset.valorSelecionado = '';
                const sel = dropdownSemestre.querySelector('.custom-dropdown__selected');
                if (sel) sel.textContent = 'Todos';
            }
            const dropdownAno = document.getElementById('dropdown-ano');
            if (dropdownAno) {
                dropdownAno.setAttribute('data-valor-selecionado', '2025');
                dropdownAno.dataset.valorSelecionado = '2025';
                const sel = dropdownAno.querySelector('.custom-dropdown__selected');
                if (sel) sel.textContent = '2025';
            }
            if (campoPesquisa) {
                campoPesquisa.value = '';
            }

            aplicarFiltrosEOrdenacao();
        });
    }
}

function lidarCliqueOrdenacao(e) {
    const th = e.currentTarget;
    const coluna = th.dataset.column;
    if (sortColumn === coluna) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = coluna;
        sortDirection = 'asc';
    }
    aplicarFiltrosEOrdenacao();
}

function atualizarSetas() {
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
}

