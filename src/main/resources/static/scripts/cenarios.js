document.addEventListener("DOMContentLoaded", async function () {
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

        const cenarios = await response.json();
        renderizarTabela(cenarios);

    } catch (error) {
        console.error("Erro ao buscar dados dos cenários:", error);
        alert("Falha ao carregar os cenários.");
    }
});

function renderizarTabela(cenarios) {
    const tbody = document.querySelector(".tabela-dados tbody");
    tbody.innerHTML = ""; 

    cenarios.forEach(c => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${c.anoSemestre}</td>
            <td>---</td>
            <td>${c.unidade.nome}</td>
            <td>${c.status}</td>
            <td>${c.aluno.nome}</td>
            <td>${c.disciplina.nome} / ${c.responsavelTCE.nome}</td>
            <td>R$ ${c.vlr ? c.vlr.valor : '---'}</td>
            <td><span class="${c.status === 'INATIVO' ? 'status-inativa' : 'status-ativa'}">${c.status === 'INATIVO' ? 'Inativa' : 'Ativa'}</span></td>
            <td>---</td>
        `;

        tbody.appendChild(linha);
    });
}

