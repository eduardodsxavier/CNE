let current = 0;

function formatCurrencyInput(input) {
  let value = input.value;
  value = value.replace(/\D/g, '');
  if (value === '') {
    input.value = '';
    return;
  }
  const integerPart = value.slice(0, -2) || '0';
  const decimalPart = value.slice(-2).padStart(2, '0');
  const formattedInteger = parseInt(integerPart, 10).toLocaleString('pt-BR');
  input.value = `R$ ${formattedInteger},${decimalPart}`;
}

function parseCurrencyToFloat(val) {
  if (val === undefined || val === null || val === '') return null;
  if (typeof val === 'number') return val;
  const clean = val.replace(/R\$\s?/g, '').replace(/\./g, '').replace(/,/g, '.').trim();
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? null : parsed;
}

function formatFloatToCurrency(value) {
  if (value === undefined || value === null || value === '') return '';
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatPhoneInput(input) {
  let value = input.value.replace(/\D/g, '');
  if (value.length > 11) value = value.slice(0, 11);
  
  if (value.length > 6) {
    if (value.length > 10) {
      input.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else {
      input.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    }
  } else if (value.length > 2) {
    input.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length > 0) {
    input.value = `(${value}`;
  } else {
    input.value = '';
  }
}

const steps = [
  {
    title: 'Aluno',
    description: 'Informações de matrícula do acadêmico',
    content: `
      <div class="wizard-form-group">
        <label for="aluno-ra" class="wizard-label">RA <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="aluno-ra" class="wizard-input" name="ra" placeholder="Digite o RA" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-id-card"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="aluno-nome" class="wizard-label">Nome Completo <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="aluno-nome" class="wizard-input" name="nome" placeholder="Digite o nome completo" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-user"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="aluno-email" class="wizard-label">E-mail <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="aluno-email" class="wizard-input" name="email" type="email" placeholder="Digite o e-mail" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-envelope"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="aluno-curso" class="wizard-label">Curso <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="aluno-curso" class="wizard-input" name="curso" placeholder="Digite o curso" list="cursos-list" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-graduation-cap"></i></span>
          <datalist id="cursos-list">
            <option value="Administração"></option>
            <option value="Análise e Desenvolvimento de Sistemas (ADS)"></option>
            <option value="Direito"></option>
            <option value="Enfermagem"></option>
            <option value="Engenharia de Software"></option>
            <option value="Fisioterapia"></option>
            <option value="Medicina"></option>
            <option value="Nutrição"></option>
            <option value="Odontologia"></option>
            <option value="Psicologia"></option>
          </datalist>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="aluno-semestre" class="wizard-label">Semestre <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <select id="aluno-semestre" class="wizard-input" name="semestre" required>
            <option value="" disabled selected>Selecione o semestre</option>
            <option value="1º Semestre">1º Semestre</option>
            <option value="2º Semestre">2º Semestre</option>
            <option value="3º Semestre">3º Semestre</option>
            <option value="4º Semestre">4º Semestre</option>
            <option value="5º Semestre">5º Semestre</option>
            <option value="6º Semestre">6º Semestre</option>
            <option value="7º Semestre">7º Semestre</option>
            <option value="8º Semestre">8º Semestre</option>
            <option value="9º Semestre">9º Semestre</option>
            <option value="10º Semestre">10º Semestre</option>
          </select>
          <span class="wizard-input-icon"><i class="fa-solid fa-graduation-cap"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="aluno-turma" class="wizard-label">Turma <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="aluno-turma" class="wizard-input" name="turma" placeholder="Digite a turma" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-users"></i></span>
        </div>
      </div>
    `
  },
  {
    title: 'Disciplina',
    description: 'Componente curricular e professor orientador',
    content: `
      <div class="wizard-form-group">
        <label for="disciplina-nome" class="wizard-label">Nome da Disciplina <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="disciplina-nome" class="wizard-input" name="nomeDisciplina" placeholder="Ex: Estágio Supervisionado I" list="disciplinas-list" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-book"></i></span>
          <datalist id="disciplinas-list">
            <option value="Estágio Supervisionado I"></option>
            <option value="Estágio Supervisionado II"></option>
            <option value="Estágio Supervisionado III"></option>
            <option value="Projeto Integrador I"></option>
            <option value="Projeto Integrador II"></option>
            <option value="Trabalho de Conclusão de Curso (TCC) I"></option>
            <option value="Trabalho de Conclusão de Curso (TCC) II"></option>
            <option value="Prática Jurídica I"></option>
            <option value="Internato Médico I"></option>
          </datalist>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="disciplina-carga" class="wizard-label">Carga Horária <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="disciplina-carga" class="wizard-input" name="cargaHoraria" type="number" placeholder="Ex: 80" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-clock"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="disciplina-orientador" class="wizard-label">Professor Orientador <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="disciplina-orientador" class="wizard-input" name="responsavelNome" placeholder="Digite o nome do professor" list="orientadores-list" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-chalkboard-user"></i></span>
          <datalist id="orientadores-list">
            <option value="Prof. Dr. Ricardo Silva"></option>
            <option value="Profa. Dra. Maria Souza"></option>
            <option value="Prof. Carlos Oliveira"></option>
            <option value="Profa. Ana Costa"></option>
          </datalist>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="disciplina-email-orientador" class="wizard-label">E-mail do Orientador <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="disciplina-email-orientador" class="wizard-input" name="responsavelEmail" type="email" placeholder="Digite o e-mail do professor" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-envelope"></i></span>
        </div>
      </div>
    `
  },
  {
    title: 'Unidade',
    description: 'Local de concessão do estágio',
    content: `
      <div class="wizard-form-group">
        <label for="unidade-nome" class="wizard-label">Nome da Unidade <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="unidade-nome" class="wizard-input" name="nomeUnidade" placeholder="Digite o nome da unidade" list="unidades-list" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-building"></i></span>
          <datalist id="unidades-list">
            <option value="Tribunal de Justiça (TJDFT)"></option>
            <option value="Hospital Regional de Taguatinga (HRT)"></option>
            <option value="Ministério Público"></option>
            <option value="Defensoria Pública"></option>
            <option value="Clínica Integrada"></option>
            <option value="Núcleo de Prática Jurídica (NPJ)"></option>
            <option value="Câmara Legislativa"></option>
          </datalist>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="unidade-sigla" class="wizard-label">Sigla do Órgão <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="unidade-sigla" class="wizard-input" name="sigla" placeholder="Digite a sigla" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-tag"></i></span>
        </div>
      </div>
      <div class="wizard-form-group wizard-form-group-inline">
        <label class="wizard-label">Interno <span class="required-asterisk">*</span></label>
        <label class="wizard-switch">
          <input type="checkbox" name="interno" />
          <span class="wizard-slider"></span>
        </label>
      </div>
      <div class="wizard-form-group wizard-form-group-inline">
        <label class="wizard-label">Convênio Público <span class="required-asterisk">*</span></label>
        <label class="wizard-switch">
          <input type="checkbox" name="convenioPublico" />
          <span class="wizard-slider"></span>
        </label>
      </div>
    `
  },
  {
    title: 'VLR',
    description: 'Valores e taxas financeiras',
    content: `
      <div class="wizard-form-group">
        <label for="vlr-preceptor" class="wizard-label">Preceptor</label>
        <div class="wizard-input-wrapper">
          <input id="vlr-preceptor" class="wizard-input" name="preceptor" type="text" placeholder="R$ 0,00" />
          <span class="wizard-input-icon"><i class="fa-solid fa-dollar-sign"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="vlr-gerenciamento" class="wizard-label">Gerenciamento</label>
        <div class="wizard-input-wrapper">
          <input id="vlr-gerenciamento" class="wizard-input" name="gerenciamento" type="text" placeholder="R$ 0,00" />
          <span class="wizard-input-icon"><i class="fa-solid fa-dollar-sign"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="vlr-total" class="wizard-label">Total</label>
        <div class="wizard-input-wrapper">
          <input id="vlr-total" class="wizard-input" name="total" type="text" placeholder="R$ 0,00" />
          <span class="wizard-input-icon"><i class="fa-solid fa-dollar-sign"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="vlr-total-aluno" class="wizard-label">Total do Aluno</label>
        <div class="wizard-input-wrapper">
          <input id="vlr-total-aluno" class="wizard-input" name="totalAluno" type="text" placeholder="R$ 0,00" />
          <span class="wizard-input-icon"><i class="fa-solid fa-dollar-sign"></i></span>
        </div>
      </div>
    `
  },
  {
    title: 'TCE',
    description: 'Supervisor responsável na unidade concedente',
    content: `
      <div class="wizard-form-group">
        <label for="tce-nome" class="wizard-label">Nome do Responsável <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="tce-nome" class="wizard-input" name="nome" placeholder="Digite o nome do responsável" list="supervisores-list" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-user-tie"></i></span>
          <datalist id="supervisores-list">
            <option value="Dr. Roberto Santos"></option>
            <option value="Dra. Juliana Ferreira"></option>
            <option value="Carlos Eduardo Melo"></option>
            <option value="Mariana Rezende"></option>
          </datalist>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="tce-cargo" class="wizard-label">Cargo <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="tce-cargo" class="wizard-input" name="cargo" placeholder="Digite o cargo" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-briefcase"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="tce-email" class="wizard-label">E-mail <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="tce-email" class="wizard-input" name="email" type="email" placeholder="Digite o e-mail" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-envelope"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="tce-telefone" class="wizard-label">Telefone <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="tce-telefone" class="wizard-input" name="telefone" placeholder="Digite o telefone" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-phone"></i></span>
        </div>
      </div>
    `
  },
  {
    title: 'Data',
    description: 'Vigência e dias de atividade',
    content: `
      <div class="wizard-form-group">
        <label for="data-inicio" class="wizard-label">Início do Estágio <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="data-inicio" class="wizard-input" name="inicioEstagio" type="date" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-calendar-days"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="data-termino" class="wizard-label">Término do Estágio <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="data-termino" class="wizard-input" name="terminoEstagio" type="date" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-calendar-day"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="data-dias" class="wizard-label">Dias da Semana <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="data-dias" class="wizard-input" name="diasSemana" placeholder="Ex: seg, ter, qua" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-calendar-week"></i></span>
        </div>
      </div>
      <div class="wizard-form-group wizard-form-group-inline">
        <label for="data-feriado" class="wizard-label">Feriado</label>
        <label class="wizard-switch">
          <input id="data-feriado" type="checkbox" name="feriado" />
          <span class="wizard-slider"></span>
        </label>
      </div>
    `
  },
  {
    title: 'Horário',
    description: 'Jornada, carga diária e turno',
    content: `
      <div class="wizard-form-group">
        <label for="horario-inicial" class="wizard-label">Horário Inicial <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="horario-inicial" class="wizard-input" name="horarioInicial" type="time" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-clock"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="horario-final" class="wizard-label">Horário Final <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="horario-final" class="wizard-input" name="horarioFinal" type="time" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-clock"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="horario-qtd" class="wizard-label">Quantidade de Horas <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="horario-qtd" class="wizard-input" name="qtdHoras" type="number" placeholder="Ex: 80" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-hourglass-half"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="horario-carga-diaria" class="wizard-label">Carga Diária (Horas/Dia) <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <input id="horario-carga-diaria" class="wizard-input" name="cargaDiaria" type="number" placeholder="Ex: 6" required />
          <span class="wizard-input-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>
        </div>
      </div>
      <div class="wizard-form-group">
        <label for="horario-turno" class="wizard-label">Turno <span class="required-asterisk">*</span></label>
        <div class="wizard-input-wrapper">
          <select id="horario-turno" class="wizard-input" name="turno" required>
            <option value="" disabled selected>Selecione um turno</option>
            <option value="MATUTINO">Matutino</option>
            <option value="VESPERTINO">Vespertino</option>
            <option value="NOTURNO">Noturno</option>
            <option value="DIURNO">Diurno</option>
          </select>
          <span class="wizard-input-icon"><i class="fa-solid fa-sun"></i></span>
        </div>
      </div>
    `
  }
];

const wizardData = {};

let dbAlunos = [];
let dbDisciplinas = [];
let dbUnidades = [];
let dbTces = [];
let dbOrientadores = [];
let dbCarregado = false;

async function carregarDadosFormulario() {
  const token = localStorage.getItem("jwt");
  if (!token) return;

  try {
    const [resAlunos, resDisciplinas, resUnidades, resTces, resUsers] = await Promise.all([
      fetch('/aluno', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/disciplina', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/unidade', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/tce', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/user/list', { headers: { 'Authorization': `Bearer ${token}` } })
    ]);

    if (resAlunos.ok) dbAlunos = (await resAlunos.json()).filter(a => !a.deleted);
    if (resDisciplinas.ok) dbDisciplinas = (await resDisciplinas.json()).filter(d => !d.deleted);
    if (resUnidades.ok) dbUnidades = (await resUnidades.json()).filter(u => !u.deleted);
    if (resTces.ok) dbTces = (await resTces.json()).filter(t => !t.deleted);
    if (resUsers.ok) dbOrientadores = (await resUsers.json());
    dbCarregado = true;
  } catch (err) {
    console.error("Erro ao carregar listas dinâmicas para o formulário:", err);
  }
}

function atualizarDatalistsDinamicas(overlay) {
  const step = steps[current];
  if (!step) return;

  if (step.title === 'Aluno') {
    let raList = overlay.querySelector('#ra-list');
    if (!raList) {
      const inputRa = overlay.querySelector('#aluno-ra');
      if (inputRa) {
        inputRa.setAttribute('list', 'ra-list');
        raList = document.createElement('datalist');
        raList.id = 'ra-list';
        inputRa.parentNode.appendChild(raList);
      }
    }
    if (raList && dbAlunos.length > 0) {
      raList.innerHTML = dbAlunos.map(a => `<option value="${a.ra}">${a.nome}</option>`).join('');
    }

    const cursoList = overlay.querySelector('#cursos-list');
    if (cursoList) {
      const defaultCourses = ["Administração", "Análise e Desenvolvimento de Sistemas (ADS)", "Direito", "Enfermagem", "Engenharia de Software", "Fisioterapia", "Medicina", "Nutrição", "Odontologia", "Psicologia"];
      const existingCourses = dbAlunos.map(a => a.curso).filter(c => c && !defaultCourses.includes(c));
      const allCourses = [...new Set([...defaultCourses, ...existingCourses])];
      cursoList.innerHTML = allCourses.map(c => `<option value="${c}"></option>`).join('');
    }
  }
  
  if (step.title === 'Disciplina') {
    const discList = overlay.querySelector('#disciplinas-list');
    if (discList && dbDisciplinas.length > 0) {
      discList.innerHTML = dbDisciplinas.map(d => `<option value="${d.nome}"></option>`).join('');
    }
    
    const orientList = overlay.querySelector('#orientadores-list');
    if (orientList && dbOrientadores.length > 0) {
      orientList.innerHTML = dbOrientadores.map(u => `<option value="${u.name}"></option>`).join('');
    }
  }
  
  if (step.title === 'Unidade') {
    const uniList = overlay.querySelector('#unidades-list');
    if (uniList && dbUnidades.length > 0) {
      uniList.innerHTML = dbUnidades.map(u => `<option value="${u.nome}"></option>`).join('');
    }
  }
  
  if (step.title === 'TCE') {
    const supList = overlay.querySelector('#supervisores-list');
    if (supList && dbTces.length > 0) {
      supList.innerHTML = dbTces.map(t => `<option value="${t.nome}"></option>`).join('');
    }
  }
}

function configurarAutopreenchimento(overlay) {
  const step = steps[current];
  if (!step) return;

  if (step.title === 'Aluno') {
    const inputRa = overlay.querySelector('#aluno-ra');
    if (inputRa) {
      inputRa.addEventListener('input', () => {
        const raVal = inputRa.value.trim();
        const found = dbAlunos.find(a => a.ra === raVal);
        if (found) {
          const nomeInput = overlay.querySelector('#aluno-nome');
          const emailInput = overlay.querySelector('#aluno-email');
          const cursoInput = overlay.querySelector('#aluno-curso');
          const semestreSelect = overlay.querySelector('#aluno-semestre');
          const turmaInput = overlay.querySelector('#aluno-turma');
          
          if (nomeInput) nomeInput.value = found.nome;
          if (emailInput) emailInput.value = found.email;
          if (cursoInput) cursoInput.value = found.curso;
          if (semestreSelect) semestreSelect.value = found.semestre || '';
          if (turmaInput) turmaInput.value = found.turma;
        }
      });
    }
  }

  if (step.title === 'Disciplina') {
    const inputDisc = overlay.querySelector('#disciplina-nome');
    if (inputDisc) {
      inputDisc.addEventListener('input', () => {
        const discVal = inputDisc.value.trim();
        const found = dbDisciplinas.find(d => d.nome === discVal);
        if (found) {
          const cargaInput = overlay.querySelector('#disciplina-carga');
          const orientInput = overlay.querySelector('#disciplina-orientador');
          const emailInput = overlay.querySelector('#disciplina-email-orientador');
          
          if (cargaInput) cargaInput.value = found.cargaHoraria;
          if (found.responsavel) {
            if (orientInput) orientInput.value = found.responsavel.nome;
            if (emailInput) emailInput.value = found.responsavel.email;
          }
        }
      });
    }

    const inputOrient = overlay.querySelector('#disciplina-orientador');
    if (inputOrient) {
      inputOrient.addEventListener('input', () => {
        const orientVal = inputOrient.value.trim();
        const found = dbOrientadores.find(u => u.name === orientVal);
        if (found) {
          const emailInput = overlay.querySelector('#disciplina-email-orientador');
          if (emailInput) emailInput.value = found.email;
        }
      });
    }
  }

  if (step.title === 'Unidade') {
    const inputUni = overlay.querySelector('#unidade-nome');
    if (inputUni) {
      inputUni.addEventListener('input', () => {
        const uniVal = inputUni.value.trim();
        const found = dbUnidades.find(u => u.nome === uniVal);
        if (found) {
          const siglaInput = overlay.querySelector('#unidade-sigla');
          const internoCheck = overlay.querySelector('input[name="interno"]');
          const convenioCheck = overlay.querySelector('input[name="convenioPublico"]');
          
          if (siglaInput) siglaInput.value = found.sigla;
          if (internoCheck) internoCheck.checked = !!found.interno;
          if (convenioCheck) convenioCheck.checked = !!found.convenioPublico;
        }
      });
    }
  }

  if (step.title === 'TCE') {
    const inputTce = overlay.querySelector('#tce-nome');
    if (inputTce) {
      inputTce.addEventListener('input', () => {
        const tceVal = inputTce.value.trim();
        const found = dbTces.find(t => t.nome === tceVal);
        if (found) {
          const cargoInput = overlay.querySelector('#tce-cargo');
          const emailInput = overlay.querySelector('#tce-email');
          const telInput = overlay.querySelector('#tce-telefone');
          
          if (cargoInput) cargoInput.value = found.cargo;
          if (emailInput) emailInput.value = found.email;
          if (telInput) telInput.value = found.telefone;
        }
      });
    }
  }
}

function destacarCamposInvalidos(modalOverlay) {
  const inputs = modalOverlay.querySelectorAll('input[required], select[required]');
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('wizard-input-error');
      const removerErro = () => {
        input.classList.remove('wizard-input-error');
        input.removeEventListener('input', removerErro);
        input.removeEventListener('change', removerErro);
      };
      input.addEventListener('input', removerErro);
      input.addEventListener('change', removerErro);
    } else {
      input.classList.remove('wizard-input-error');
    }
  });
}

function showNotification(message, type = 'error', customClass = '') {
  // Se não existir o container de toasts na página, cria-o
  let container = document.getElementById('cne-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cne-toast-container';
    container.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 10000;
      pointer-events: none;
      font-family: 'Plus Jakarta Sans', sans-serif;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `cne-toast ${type} ${customClass}`.trim();
  
  // Escolha do ícone e cores conforme o tipo
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  const iconColor = type === 'success' ? '#22c55e' : '#ef4444';
  const bgColor = type === 'success' ? '#f0fdf4' : '#fef2f2';
  const borderColor = type === 'success' ? '#bbf7d0' : '#fecaca';
  const textColor = type === 'success' ? '#166534' : '#991b1b';

  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: ${bgColor};
    border: 1px solid ${borderColor};
    color: ${textColor};
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    font-weight: 600;
    min-width: 300px;
    max-width: 450px;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  toast.innerHTML = `
    <i class="fa-solid ${icon}" style="font-size: 1.25rem; color: ${iconColor};"></i>
    <span style="flex: 1;">${message}</span>
    <button class="cne-toast-close" style="background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px; display: flex; align-items: center; justify-content: center; transition: color 0.2s;"><i class="fa-solid fa-xmark"></i></button>
  `;

  // Ouvinte do botão de fechar
  toast.querySelector('.cne-toast-close').addEventListener('click', () => {
    dismissToast(toast);
  });

  container.appendChild(toast);

  // Gatilho de animação de entrada
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  });

  // Temporizador para remoção automática
  const autoDismissTimeout = setTimeout(() => {
    dismissToast(toast);
  }, 4000);

  function dismissToast(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(-20px) scale(0.95)';
    el.style.maxHeight = '0';
    el.style.paddingTop = '0';
    el.style.paddingBottom = '0';
    el.style.marginTop = '0';
    el.style.marginBottom = '0';
    el.style.borderWidth = '0';
    
    setTimeout(() => {
      el.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 400);
  }
}

function showPopup(isEdit = false, cenario = null, targetDate = null, onFinish = null) {
  current = 0; // Reset step index

  // Prefill wizardData if editing
  if (isEdit && cenario) {
    wizardData.aluno = {
      ra: cenario.aluno?.ra || '',
      nome: cenario.aluno?.nome || '',
      email: cenario.aluno?.email || '',
      curso: cenario.aluno?.curso || '',
      semestre: cenario.aluno?.semestre || '',
      turma: cenario.aluno?.turma || ''
    };
    wizardData.disciplina = {
      nomeDisciplina: cenario.disciplina?.nome || '',
      cargaHoraria: cenario.disciplina?.cargaHoraria || 0,
      responsavelNome: cenario.responsavelIES?.nome || '',
      responsavelEmail: cenario.responsavelIES?.email || ''
    };
    wizardData.unidade = {
      nomeUnidade: cenario.unidade?.nome || '',
      sigla: cenario.unidade?.sigla || '',
      interno: cenario.unidade?.interno || false,
      convenioPublico: cenario.unidade?.convenioPublico || false
    };
    wizardData.vlr = {
      preceptor: cenario.vlr?.preceptor || '',
      gerenciamento: cenario.vlr?.gerenciamento || '',
      total: cenario.vlr?.total || '',
      totalAluno: cenario.vlr?.totalAluno || ''
    };
    wizardData.tce = {
      nome: cenario.responsavelTCE?.nome || '',
      cargo: cenario.responsavelTCE?.cargo || '',
      email: cenario.responsavelTCE?.email || '',
      telefone: cenario.responsavelTCE?.telefone || ''
    };
    wizardData.data = {
      inicioEstagio: cenario.tempo?.inicioEstagio || '',
      terminoEstagio: cenario.tempo?.terminoEstagio || '',
      diasSemana: cenario.tempo?.diasSemana || '',
      feriado: cenario.tempo?.feriado || false
    };
    wizardData.horario = {
      horarioInicial: cenario.tempo?.horarioInicial || '',
      horarioFinal: cenario.tempo?.horarioFinal || '',
      qtdHoras: cenario.tempo?.qtdHoras || '',
      cargaDiaria: cenario.tempo?.cargaDiaria || '',
      turno: cenario.tempo?.turno || ''
    };
  } else {
    // Clear wizardData for new creation, OR keep targetDate
    for (const key in wizardData) {
      delete wizardData[key];
    }
    if (targetDate) {
      wizardData.data = {
        inicioEstagio: targetDate,
        terminoEstagio: '',
        diasSemana: '',
        feriado: false
      };
    }
  }

  // Desparar carregamento dinâmico
  carregarDadosFormulario().then(() => {
    const overlay = document.querySelector('.wizard-overlay');
    if (overlay) {
      atualizarDatalistsDinamicas(overlay);
    }
  });

  const template = document.createElement('template');

  const render = () => {
    const step = steps[current];
    template.innerHTML = `
      <div class="wizard-overlay" role="dialog" aria-modal="true">
        <div class="wizard-card" aria-labelledby="title">
          <div class="wizard-header">
            <div class="wizard-steps">
              ${steps.map((_, i) => `<div class="wizard-step${i <= current ? ' active' : ''}" data-step="${i}" style="cursor: pointer;"></div>`).join('')}
            </div>
            <div class="wizard-header-text">
              <span class="wizard-title" id="title">
                Passo ${current + 1} de ${steps.length}: ${step.title}
              </span>
              <p class="wizard-subtitle">${step.description}</p>
            </div>
          </div>
          <div class="wizard-notification-container"></div>
          <div class="wizard-body">${step.content}</div>
          <div class="wizard-footer">
            <button id="back" class="wizard-btn wizard-btn-cancel" ${current === 0 ? 'disabled' : ''}>
              <span class="icon"><i class="fa-solid fa-arrow-left"></i></span> VOLTAR
            </button>
            <button id="next" class="wizard-btn wizard-btn-next">
              <span class="icon">${current === steps.length - 1 ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-arrow-right"></i>'}</span> ${current === steps.length - 1 ? 'CONCLUIR' : 'AVANÇAR'}
            </button>
          </div>
        </div>
      </div>`;

    const overlay = template.content.firstElementChild;
    document.body.appendChild(overlay);

    // Prepopulate inputs from wizardData
    const inputs = overlay.querySelectorAll('.wizard-body input, .wizard-body select');
    inputs.forEach(input => {
      const name = input.getAttribute('name');
      if (!name) return;

      let value = undefined;
      const etapa = step.title;

      if (etapa === 'Aluno' && wizardData.aluno) {
        value = wizardData.aluno[name];
      } else if (etapa === 'Disciplina' && wizardData.disciplina) {
        value = wizardData.disciplina[name];
      } else if (etapa === 'Unidade' && wizardData.unidade) {
        value = wizardData.unidade[name];
      } else if (etapa === 'VLR' && wizardData.vlr) {
        value = wizardData.vlr[name];
      } else if (etapa === 'TCE' && wizardData.tce) {
        value = wizardData.tce[name];
      } else if (etapa === 'Data' && wizardData.data) {
        value = wizardData.data[name];
      } else if (etapa === 'Horário' && wizardData.horario) {
        value = wizardData.horario[name];
      }

      if (value !== undefined) {
        if (input.type === 'checkbox') {
          input.checked = !!value;
        } else {
          if (etapa === 'VLR' && value !== null) {
            input.value = formatFloatToCurrency(value);
          } else if (name === 'telefone' && value) {
            input.value = value;
            formatPhoneInput(input);
          } else {
            input.value = value;
          }
        }
      }
    });

    // Atualizar listas e configurar autopreenchimento
    if (dbCarregado) {
      atualizarDatalistsDinamicas(overlay);
    }
    configurarAutopreenchimento(overlay);

    // --- MÁSCARAS E CÁLCULO DE VALORES EM TEMPO REAL ---
    if (step.title === 'VLR') {
      const preceptorInput = overlay.querySelector('#vlr-preceptor');
      const gerenciamentoInput = overlay.querySelector('#vlr-gerenciamento');
      const totalInput = overlay.querySelector('#vlr-total');
      const totalAlunoInput = overlay.querySelector('#vlr-total-aluno');

      const calculateTotal = () => {
        const preceptorVal = parseCurrencyToFloat(preceptorInput.value) || 0;
        const gerenciamentoVal = parseCurrencyToFloat(gerenciamentoInput.value) || 0;
        const totalVal = preceptorVal + gerenciamentoVal;
        totalInput.value = formatFloatToCurrency(totalVal);
      };

      [preceptorInput, gerenciamentoInput, totalInput, totalAlunoInput].forEach(input => {
        if (input) {
          input.addEventListener('input', () => {
            formatCurrencyInput(input);
            if (input === preceptorInput || input === gerenciamentoInput) {
              calculateTotal();
            }
          });
        }
      });
    }

    // --- MÁSCARA DE TELEFONE (TCE) ---
    if (step.title === 'TCE') {
      const inputTelefone = overlay.querySelector('#tce-telefone');
      if (inputTelefone) {
        inputTelefone.addEventListener('input', () => {
          formatPhoneInput(inputTelefone);
        });
      }
    }

    // --- LIMITES E VALIDAÇÃO DE DATA SEGURA (DATA) ---
    if (step.title === 'Data') {
      const inputInicio = overlay.querySelector('#data-inicio');
      const inputTermino = overlay.querySelector('#data-termino');

      const validateDateInput = (input) => {
        if (!input.value) return;
        const dateParts = input.value.split('-'); // Formato: YYYY-MM-DD
        if (dateParts.length === 3) {
          const year = parseInt(dateParts[0], 10);
          if (year > 2099) {
            input.value = `2025-${dateParts[1]}-${dateParts[2]}`;
            showNotification('O ano da data não pode ser superior a 2099.', 'error', 'data-invalida');
          } else if (year < 2000) {
            input.value = `2025-${dateParts[1]}-${dateParts[2]}`;
            showNotification('O ano da data não pode ser inferior a 2000.', 'error', 'data-invalida');
          }
        }
      };

      [inputInicio, inputTermino].forEach(input => {
        if (input) {
          input.setAttribute('min', '2000-01-01');
          input.setAttribute('max', '2099-12-31');
          input.addEventListener('change', () => validateDateInput(input));
          input.addEventListener('blur', () => validateDateInput(input));
        }
      });
    }

    // --- RESTRIÇÃO DE ENTRADA (NÚMEROS APENAS) ---
    if (step.title === 'Aluno') {
      const inputRa = overlay.querySelector('#aluno-ra');
      if (inputRa) {
        inputRa.addEventListener('input', () => {
          inputRa.value = inputRa.value.replace(/\D/g, '');
        });
      }
    }
    if (step.title === 'Disciplina') {
      const inputCarga = overlay.querySelector('#disciplina-carga');
      if (inputCarga) {
        inputCarga.addEventListener('input', () => {
          inputCarga.value = inputCarga.value.replace(/\D/g, '');
        });
      }
    }
    if (step.title === 'Horário') {
      const inputQtdHoras = overlay.querySelector('#horario-qtd');
      const inputCargaDiaria = overlay.querySelector('#horario-carga-diaria');
      if (inputQtdHoras) {
        inputQtdHoras.addEventListener('input', () => {
          inputQtdHoras.value = inputQtdHoras.value.replace(/\D/g, '');
        });
      }
      if (inputCargaDiaria) {
        inputCargaDiaria.addEventListener('input', () => {
          inputCargaDiaria.value = inputCargaDiaria.value.replace(/\D/g, '');
        });
      }
    }

    // Click listeners para o Stepper (pontos de progresso)
    overlay.querySelector('.wizard-steps').addEventListener('click', (e) => {
      const stepDiv = e.target.closest('.wizard-step');
      if (!stepDiv) return;
      const targetStep = parseInt(stepDiv.getAttribute('data-step'));
      if (targetStep === current) return;

      if (targetStep < current) {
        salvarDadosEtapa(overlay);
        overlay.remove();
        current = targetStep;
        render();
      } else {
        if (!validarCamposObrigatorios(overlay)) {
          showNotification('Preencha todos os campos obrigatórios.', 'error', 'validacao-falhou');
          destacarCamposInvalidos(overlay);
          return;
        }
        salvarDadosEtapa(overlay);
        overlay.remove();
        current = targetStep;
        render();
      }
    });

    overlay.querySelector('#back').addEventListener('click', () => {
      overlay.remove();
      current--;
      render();
    });

    overlay.querySelector('#next').addEventListener('click', () => {
      if (!validarCamposObrigatorios(overlay)) {
        showNotification('Preencha todos os campos obrigatórios.', 'error', 'validacao-falhou');
        destacarCamposInvalidos(overlay);
        return;
      }

      salvarDadosEtapa(overlay);

      if (current === steps.length - 1) {
        enviarTodosDados(isEdit, cenario ? cenario.id : null, onFinish);
        overlay.remove();
      } else {
        overlay.remove();
        current++;
        render();
      }
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.remove();
    });

    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', esc);
      }
    });
  };

  render();
}

function validarCamposObrigatorios(modalOverlay) {
  const inputs = modalOverlay.querySelectorAll('input[required], select[required]');
  for (const input of inputs) {
    if (!input.value.trim()) return false;
  }
  return true;
}

function salvarDadosEtapa(modalOverlay) {
  const inputs = modalOverlay.querySelectorAll('input[name], select[name]');
  const dados = {};
  inputs.forEach(input => {
    dados[input.name] = input.type === 'checkbox' ? input.checked : input.value.trim();
  });

  const etapa = steps[current].title;

  if (etapa === 'Aluno') {
    wizardData.aluno = {
      ra: dados.ra,
      nome: dados.nome,
      email: dados.email,
      curso: dados.curso,
      semestre: dados.semestre,
      turma: dados.turma
    };
  } else if (etapa === 'Disciplina') {
    wizardData.disciplina = {
      nomeDisciplina: dados.nomeDisciplina,
      cargaHoraria: Number(dados.cargaHoraria),
      responsavelNome: dados.responsavelNome,
      responsavelEmail: dados.responsavelEmail
    };
  } else if (etapa === 'Unidade') {
    wizardData.unidade = {
      nomeUnidade: dados.nomeUnidade,
      sigla: dados.sigla,
      interno: dados.interno || false,
      convenioPublico: dados.convenioPublico || false
    };
  } else if (etapa == 'VLR') {
    wizardData.vlr = {
      preceptor: parseCurrencyToFloat(dados.preceptor),
      gerenciamento: parseCurrencyToFloat(dados.gerenciamento),
      total: parseCurrencyToFloat(dados.total),
      totalAluno: parseCurrencyToFloat(dados.totalAluno)
    };
  } else if (etapa === 'TCE') {
    wizardData.tce = {
      nome: dados.nome,
      cargo: dados.cargo,
      email: dados.email,
      telefone: dados.telefone
    };
  } else if (etapa === 'Data') {
    wizardData.data = {
      inicioEstagio: dados.inicioEstagio,
      terminoEstagio: dados.terminoEstagio,
      diasSemana: dados.diasSemana,
      feriado: dados.feriado || false
    };
  } else if (etapa === 'Horário') {
    wizardData.horario = {
      horarioInicial: dados.horarioInicial,
      horarioFinal: dados.horarioFinal,
      qtdHoras: dados.qtdHoras,
      cargaDiaria: Number(dados.cargaDiaria),
      turno: dados.turno
    };
  }
}

function enviarTodosDados(isEdit = false, cenarioId = null, onFinish = null) {
  const dadosCenario = {
    aluno: wizardData.aluno,
    disciplina: wizardData.disciplina,
    unidade: wizardData.unidade,
    vlr: wizardData.vlr,
    tce: wizardData.tce,
    tempo: {...wizardData.data, ...wizardData.horario},
  };

  const token = localStorage.getItem('jwt'); 
  const url = isEdit ? `/cenario/${cenarioId}` : '/cenario';
  const method = isEdit ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(dadosCenario)
  })
    .then(res => {
      if (!res.ok) throw new Error(isEdit ? 'Erro ao atualizar cenário' : 'Erro ao cadastrar cenário');
      return res.json();
    })
    .then(cenarioSalvo => {
      showNotification(isEdit ? 'Cenário atualizado com sucesso!' : 'Cenário cadastrado com sucesso!', 'success', 'cadastro-sucesso');
      if (onFinish) onFinish(cenarioSalvo);
    })
    .catch(err => {
      console.error(err);
      showNotification('Erro: ' + err.message, 'error', 'cadastro-erro');
    });
}

window.showPopup = showPopup;

document.body.addEventListener('click', (e) => {
  if (e.target.closest('#openPopup')) {
    const path = window.location.pathname;
    if (path === '/cenarios' || path === '/calendario') {
      showPopup();
    }
  }
});
