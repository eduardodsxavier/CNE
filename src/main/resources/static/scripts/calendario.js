
let allCalendarioCenarios = [];
let currentMonth = new Date().getMonth() + 1; // 1-12
let currentYear = new Date().getFullYear();

function openModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.style.display = "none";
}

window.onclick = (event) => {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    closeModal();
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

async function fetchCenarios() {
  const token = localStorage.getItem("jwt");
  if (!token) {
    console.error("JWT token not found in localStorage.");
    return;
  }
  try {
    const response = await fetch("/cenario/list", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        allCalendarioCenarios = await response.json();
      } else {
        localStorage.removeItem("jwt");
        sessionStorage.removeItem("cne_user_name");
        if (window.location.pathname !== '/login') {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "/login";
        }
        return;
      }
    } else {
      console.error("Error fetching scenarios:", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching scenarios:", err);
  }
}

function parseLocalDate(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return new Date(dateStr);
}

function matchesDayOfWeek(date, diasSemanaStr) {
  if (!diasSemanaStr) return true;
  const daysMap = {
    0: ['dom', 'domingo'],
    1: ['seg', 'segunda', 'segunda-feira'],
    2: ['ter', 'terça', 'terça-feira'],
    3: ['qua', 'quarta', 'quarta-feira'],
    4: ['qui', 'quinta', 'quinta-feira'],
    5: ['sex', 'sexta', 'sexta-feira'],
    6: ['sab', 'sábado', 'sabado']
  };
  const dayNum = date.getDay();
  const lowerStr = diasSemanaStr.toLowerCase();
  const searchTerms = daysMap[dayNum];
  return searchTerms.some(term => lowerStr.includes(term));
}

function renderCalendar() {
  const calendarGrid = document.getElementById("calendar-grid");
  if (!calendarGrid) return;

  calendarGrid.innerHTML = "";

  const mesVal = document.getElementById("dropdown-mes")?.dataset.valorSelecionado;
  const semestreVal = document.getElementById("dropdown-semestre")?.dataset.valorSelecionado;
  
  if (mesVal && !isNaN(parseInt(mesVal))) {
    currentMonth = parseInt(mesVal);
  }
  
  const yrText = document.getElementById("ano-exibido")?.textContent;
  if (yrText && !isNaN(parseInt(yrText))) {
    currentYear = parseInt(yrText);
  }

  const firstDay = new Date(currentYear, currentMonth - 1, 1);
  const startDayOfWeek = firstDay.getDay();
  
  const lastDay = new Date(currentYear, currentMonth, 0);
  const totalDays = lastDay.getDate();

  const prevMonthLast = new Date(currentYear, currentMonth - 1, 0);
  const prevMonthTotalDays = prevMonthLast.getDate();

  const cells = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const day = prevMonthTotalDays - i;
    const date = new Date(currentYear, currentMonth - 2, day);
    cells.push({ day, date, otherMonth: true });
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(currentYear, currentMonth - 1, day);
    cells.push({ day, date, otherMonth: false });
  }

  const finalCount = cells.length <= 35 ? 35 : 42;
  const nextDaysNeeded = finalCount - cells.length;
  for (let day = 1; day <= nextDaysNeeded; day++) {
    const date = new Date(currentYear, currentMonth, day);
    cells.push({ day, date, otherMonth: true });
  }

  const statusFilter = document.getElementById("dropdown-status")?.dataset.valorSelecionado;
  const cursoFilter = document.getElementById("dropdown-curso")?.dataset.valorSelecionado;

  const filteredCenarios = allCalendarioCenarios.filter(c => {
    if (semestreVal && semestreVal !== "") {
      const expectedSem = `/${semestreVal}`;
      if (!c.anoSemestre || !c.anoSemestre.endsWith(expectedSem)) {
        return false;
      }
    }

    if (statusFilter && statusFilter !== "") {
      if (statusFilter === "ativa") {
        if (c.status === "FINALIZADO") return false;
      } else if (statusFilter === "inativa") {
        if (c.status !== "FINALIZADO") return false;
      }
    }

    if (cursoFilter && cursoFilter !== "") {
      if (!c.aluno || !c.aluno.curso) return false;
      const cCurso = c.aluno.curso.toLowerCase();
      
      let match = false;
      if (cursoFilter === "engenharia" && (cCurso.includes("engenharia") || cCurso.includes("eng"))) match = true;
      else if (cursoFilter === "direito" && cCurso.includes("direito")) match = true;
      else if (cursoFilter === "medicina" && cCurso.includes("medicina")) match = true;
      else if (cursoFilter === "adm" && (cCurso.includes("adm") || cCurso.includes("administração") || cCurso.includes("administracao"))) match = true;
      
      if (!match) return false;
    }

    return true;
  });

  const today = new Date();
  cells.forEach(cell => {
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    if (cell.otherMonth) {
      dayCell.classList.add("other-month");
    }
    
    if (
      cell.date.getDate() === today.getDate() &&
      cell.date.getMonth() === today.getMonth() &&
      cell.date.getFullYear() === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    const dayNumberEl = document.createElement("div");
    dayNumberEl.className = "day-number";
    dayNumberEl.textContent = cell.day;
    dayCell.appendChild(dayNumberEl);

    const dayScenarios = filteredCenarios.filter(c => {
      if (!c.tempo) return false;
      const start = parseLocalDate(c.tempo.inicioEstagio);
      const end = parseLocalDate(c.tempo.terminoEstagio);
      if (!start) return false;

      const cellTime = cell.date.getTime();
      const startTime = start.getTime();
      const endTime = end ? end.getTime() : startTime;

      if (cellTime < startTime || cellTime > endTime) {
        return false;
      }

      return matchesDayOfWeek(cell.date, c.tempo.diasSemana);
    });

    const dayEventsContainer = document.createElement("div");
    dayEventsContainer.className = "day-events";

    dayScenarios.forEach(c => {
      const eventEl = document.createElement("div");
      const isBlue = c.aluno?.curso && (c.aluno.curso.toLowerCase().includes("medicina") || c.aluno.curso.toLowerCase().includes("direito"));
      eventEl.className = `event ${isBlue ? 'event-blue' : 'event-purple'}`;
      eventEl.textContent = c.aluno?.nome || c.cenario || "Estágio";
      
      eventEl.addEventListener("click", (e) => {
        e.stopPropagation();
        showDayScenariosModal(cell.date, dayScenarios, c.id);
      });

      dayEventsContainer.appendChild(eventEl);
    });

    dayCell.appendChild(dayEventsContainer);

    dayCell.addEventListener("click", () => {
      showDayScenariosModal(cell.date, dayScenarios, null);
    });

    calendarGrid.appendChild(dayCell);
  });
}

function showDayScenariosModal(date, scenarios, selectedId = null) {
  const modal = document.getElementById("modal");
  const headerDate = document.getElementById("modal-header-date");
  const bodyContent = document.getElementById("modal-body-content");
  const btnCriar = document.getElementById("modal-btn-criar");
  const btnEditar = document.getElementById("modal-btn-editar");

  if (!modal || !headerDate || !bodyContent) return;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  headerDate.textContent = `Dia ${day}/${month}/${year}`;

  const formattedTargetDate = `${year}-${month}-${day}`;
  btnCriar.dataset.date = formattedTargetDate;

  if (scenarios.length === 0) {
    bodyContent.innerHTML = `<p style="text-align: center; color: #64748b; padding: 20px 0;">Nenhum cenário cadastrado para este dia.</p>`;
    btnEditar.style.display = "none";
  } else {
    btnEditar.style.display = "block";
    
    let currentCenario = scenarios[0];
    if (selectedId) {
      currentCenario = scenarios.find(c => c.id == selectedId) || scenarios[0];
    }

    const renderDetails = (cenario) => {
      btnEditar.dataset.cenarioId = cenario.id;
      const vlrTotal = cenario.vlr ? `R$ ${parseFloat(cenario.vlr.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '---';
      
      return `
        <div class="info-item">
          <span class="info-label">Unidade:</span> ${cenario.unidade?.nome || '---'}
        </div>
        <div class="info-item">
          <span class="info-label">Semestre:</span> ${cenario.aluno?.semestre || '---'}
        </div>
        <div class="info-item">
          <span class="info-label">Situação TCE:</span> ${cenario.status || '---'}
        </div>
        <div class="info-item">
          <span class="info-label">Nome do Aluno:</span> ${cenario.aluno?.nome || '---'}
        </div>
        <div class="info-item">
          <span class="info-label">Disciplina/Orientador:</span> ${cenario.disciplina?.nome || '---'} / ${cenario.responsavelIES?.nome || '---'}
        </div>
        <div class="info-item">
          <span class="info-label">Vlr Total:</span> ${vlrTotal}
        </div>
      `;
    };

    if (scenarios.length === 1) {
      bodyContent.innerHTML = renderDetails(currentCenario);
    } else {
      let selectHtml = `
        <div class="modal-select-wrapper">
          <label class="info-label" for="modal-scenario-select">Selecione o Cenário:</label>
          <select id="modal-scenario-select" class="modal-select">
            ${scenarios.map(c => `
              <option value="${c.id}" ${c.id == currentCenario.id ? 'selected' : ''}>
                ${c.aluno?.nome || 'Sem Nome'} - ${c.disciplina?.nome || 'Sem Disciplina'}
              </option>
            `).join('')}
          </select>
        </div>
        <div id="modal-scenario-details">
          ${renderDetails(currentCenario)}
        </div>
      `;
      bodyContent.innerHTML = selectHtml;

      const selector = document.getElementById("modal-scenario-select");
      if (selector) {
        selector.addEventListener("change", (e) => {
          const selectedCenario = scenarios.find(c => c.id == e.target.value);
          if (selectedCenario) {
            document.getElementById("modal-scenario-details").innerHTML = renderDetails(selectedCenario);
          }
        });
      }
    }
  }

  openModal();
}

async function initCalendario() {
  const calendarGrid = document.getElementById("calendar-grid");
  if (!calendarGrid) return;

  const anoExibidoEl = document.getElementById("ano-exibido");
  if (anoExibidoEl) {
    currentYear = parseInt(anoExibidoEl.textContent) || currentYear;
  }

  const mesDropdown = document.getElementById("dropdown-mes");
  if (mesDropdown && !mesDropdown.getAttribute("data-valor-selecionado")) {
    mesDropdown.setAttribute("data-valor-selecionado", currentMonth);
    const selectedEl = mesDropdown.querySelector(".date-picker-dropdown__selected");
    if (selectedEl) {
      const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
      ];
      selectedEl.textContent = monthNames[currentMonth - 1];
    }
  }

  await fetchCenarios();
  renderCalendar();

  document.querySelectorAll("#dropdown-mes, #dropdown-semestre, #dropdown-status, #dropdown-curso, #dropdown-ano").forEach(dropdown => {
    dropdown.addEventListener("change", () => {
      renderCalendar();
    });
  });

  const btnLimparCal = document.getElementById('btn-limpar-filtros-cal');
  if (btnLimparCal) {
    btnLimparCal.addEventListener('click', () => {
      const dropdownStatus = document.getElementById('dropdown-status');
      const dropdownCurso = document.getElementById('dropdown-curso');
      const dropdownMes = document.getElementById('dropdown-mes');
      const dropdownSemestre = document.getElementById('dropdown-semestre');
      const dropdownAno = document.getElementById('dropdown-ano');

      if (dropdownStatus) {
        dropdownStatus.setAttribute('data-valor-selecionado', '');
        dropdownStatus.dataset.valorSelecionado = '';
        const sel = dropdownStatus.querySelector('.dropdown-selecionado');
        if (sel) sel.textContent = 'Todos';
      }
      if (dropdownCurso) {
        dropdownCurso.setAttribute('data-valor-selecionado', '');
        dropdownCurso.dataset.valorSelecionado = '';
        const sel = dropdownCurso.querySelector('.dropdown-selecionado');
        if (sel) sel.textContent = 'Todos';
      }
      if (dropdownSemestre) {
        dropdownSemestre.setAttribute('data-valor-selecionado', '');
        dropdownSemestre.dataset.valorSelecionado = '';
        const sel = dropdownSemestre.querySelector('.date-picker-dropdown__selected');
        if (sel) sel.textContent = 'Todos';
      }
      if (dropdownMes) {
        const now = new Date();
        const currentMonthNum = now.getMonth() + 1;
        dropdownMes.setAttribute('data-valor-selecionado', currentMonthNum);
        dropdownMes.dataset.valorSelecionado = currentMonthNum;
        const sel = dropdownMes.querySelector('.date-picker-dropdown__selected');
        if (sel) {
          const monthNames = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ];
          sel.textContent = monthNames[currentMonthNum - 1];
        }
      }
      if (dropdownAno) {
        dropdownAno.setAttribute('data-valor-selecionado', '2025');
        dropdownAno.dataset.valorSelecionado = '2025';
        const sel = dropdownAno.querySelector('.date-picker-dropdown__selected');
        if (sel) sel.textContent = '2025';
      }

      renderCalendar();
    });
  }

  const anoExibido = document.getElementById("ano-exibido");
  if (anoExibido) {
    anoExibido.addEventListener("yearchange", (e) => {
      currentYear = e.detail.year;
      renderCalendar();
    });
  }

  const btnCriar = document.getElementById("modal-btn-criar");
  if (btnCriar) {
    btnCriar.addEventListener("click", () => {
      const dateStr = btnCriar.dataset.date;
      closeModal();
      if (typeof window.showPopup === "function") {
        window.showPopup(false, null, dateStr, () => {
          fetchCenarios().then(() => renderCalendar());
        });
      }
    });
  }

  const btnEditar = document.getElementById("modal-btn-editar");
  if (btnEditar) {
    btnEditar.addEventListener("click", () => {
      const cenarioId = btnEditar.dataset.cenarioId;
      if (!cenarioId) return;
      const cenario = allCalendarioCenarios.find(c => c.id == cenarioId);
      if (!cenario) return;
      closeModal();
      if (typeof window.showPopup === "function") {
        window.showPopup(true, cenario, null, () => {
          fetchCenarios().then(() => renderCalendar());
        });
      }
    });
  }
}

window.initCalendario = initCalendario;
document.addEventListener("DOMContentLoaded", initCalendario);
