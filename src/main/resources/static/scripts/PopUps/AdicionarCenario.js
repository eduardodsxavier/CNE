let current = 0;

const steps = [
  {
    title: 'Aluno',
    content: `
      <div class="wizard-form-group">
        <label for="aluno-ra" class="wizard-label">RA:<span class="required-asterisk">*</span></label>
        <input id="aluno-ra" class="wizard-input" name="ra" placeholder="Digite o RA" required />
      </div>
      <div class="wizard-form-group">
        <label for="aluno-nome" class="wizard-label">Nome:<span class="required-asterisk">*</span></label>
        <input id="aluno-nome" class="wizard-input" name="nome" placeholder="Digite o nome completo" required />
      </div>
      <div class="wizard-form-group">
        <label for="aluno-email" class="wizard-label">E-mail:<span class="required-asterisk">*</span></label>
        <input id="aluno-email" class="wizard-input" name="email" type="email" placeholder="Digite o e-mail" required />
      </div>
      <div class="wizard-form-group">
        <label for="aluno-curso" class="wizard-label">Curso:<span class="required-asterisk">*</span></label>
        <input id="aluno-curso" class="wizard-input" name="curso" placeholder="Digite o curso" required />
      </div>
      <div class="wizard-form-group">
        <label for="aluno-turma" class="wizard-label">Turma:<span class="required-asterisk">*</span></label>
        <input id="aluno-turma" class="wizard-input" name="turma" placeholder="Digite a turma" required />
      </div>
    `
  },
  {
    title: 'Disciplina',
    content: `
      <div class="wizard-form-group">
        <label for="disciplina-nome" class="wizard-label">Nome:<span class="required-asterisk">*</span></label>
        <input id="disciplina-nome" class="wizard-input" name="nomeDisciplina" placeholder="Ex: Engenharia de Software" required />
      </div>
      <div class="wizard-form-group">
        <label for="disciplina-carga" class="wizard-label">Carga Horária:<span class="required-asterisk">*</span></label>
        <input id="disciplina-carga" class="wizard-input" name="cargaHoraria" type="number" placeholder="Ex: 80" required />
      </div>
      <div class="wizard-form-group">
        <label for="disciplina-orientador" class="wizard-label">Professor Orientador:<span class="required-asterisk">*</span></label>
        <input id="disciplina-orientador" class="wizard-input" name="responsavelNome" placeholder="Digite o nome do professor" required />
      </div>
      <div class="wizard-form-group">
        <label for="disciplina-email-orientador" class="wizard-label">E-mail Orientador:<span class="required-asterisk">*</span></label>
        <input id="disciplina-email-orientador" class="wizard-input" name="responsavelEmail" type="email" placeholder="Digite o e-mail do professor" required />
      </div>
    `
  },
  {
    title: 'Unidade',
    content: `
      <div class="wizard-form-group">
        <label for="unidade-nome" class="wizard-label">Nome:<span class="required-asterisk">*</span></label>
        <input id="unidade-nome" class="wizard-input" name="nomeUnidade" placeholder="Digite o nome da unidade" required />
      </div>
      <div class="wizard-form-group">
        <label for="unidade-sigla" class="wizard-label">Sigla do Órgão:<span class="required-asterisk">*</span></label>
        <input id="unidade-sigla" class="wizard-input" name="sigla" placeholder="Digite a sigla" required />
      </div>
      <div class="wizard-form-group wizard-form-group-inline">
        <label class="wizard-label">Interno:<span class="required-asterisk">*</span></label>
        <label class="wizard-switch">
          <input type="checkbox" name="interno" />
          <span class="wizard-slider"></span>
        </label>
      </div>
      <div class="wizard-form-group wizard-form-group-inline">
        <label class="wizard-label">Convênio Público:<span class="required-asterisk">*</span></label>
        <label class="wizard-switch">
          <input type="checkbox" name="convenioPublico" />
          <span class="wizard-slider"></span>
        </label>
      </div>
    `
  },
  {
    title: 'VLR',
    content: `
      <div class="wizard-form-group">
        <label for="vlr-preceptor" class="wizard-label">Preceptor:</label>
        <input id="vlr-preceptor" class="wizard-input" name="preceptor" type="number" step="0.01" placeholder="R$" />
      </div>
      <div class="wizard-form-group">
        <label for="vlr-gerenciamento" class="wizard-label">Gerenciamento:</label>
        <input id="vlr-gerenciamento" class="wizard-input" name="gerenciamento" type="number" step="0.01" placeholder="R$" />
      </div>
      <div class="wizard-form-group">
        <label for="vlr-total" class="wizard-label">Total:</label>
        <input id="vlr-total" class="wizard-input" name="total" type="number" step="0.01" placeholder="R$" />
      </div>
      <div class="wizard-form-group">
        <label for="vlr-total-aluno" class="wizard-label">Total do Aluno:</label>
        <input id="vlr-total-aluno" class="wizard-input" name="totalAluno" type="number" step="0.01" placeholder="R$" />
      </div>
    `
  },
  {
    title: 'TCE',
    content: `
      <div class="wizard-form-group">
        <label for="tce-nome" class="wizard-label">Nome do Responsável:<span class="required-asterisk">*</span></label>
        <input id="tce-nome" class="wizard-input" name="nome" placeholder="Digite o nome do responsável" required />
      </div>
      <div class="wizard-form-group">
        <label for="tce-cargo" class="wizard-label">Cargo:<span class="required-asterisk">*</span></label>
        <input id="tce-cargo" class="wizard-input" name="cargo" placeholder="Digite o cargo" required />
      </div>
      <div class="wizard-form-group">
        <label for="tce-email" class="wizard-label">E-mail:<span class="required-asterisk">*</span></label>
        <input id="tce-email" class="wizard-input" name="email" type="email" placeholder="Digite o e-mail" required />
      </div>
      <div class="wizard-form-group">
        <label for="tce-telefone" class="wizard-label">Telefone:<span class="required-asterisk">*</span></label>
        <input id="tce-telefone" class="wizard-input" name="telefone" placeholder="Digite o telefone" required />
      </div>
    `
  },
  {
    title: 'Data',
    content: `
      <div class="wizard-form-group">
        <label for="data-inicio" class="wizard-label">Início do Estágio:<span class="required-asterisk">*</span></label>
        <input id="data-inicio" class="wizard-input" name="inicioEstagio" type="date" required />
      </div>
      <div class="wizard-form-group">
        <label for="data-termino" class="wizard-label">Término do Estágio:<span class="required-asterisk">*</span></label>
        <input id="data-termino" class="wizard-input" name="terminoEstagio" type="date" required />
      </div>
      <div class="wizard-form-group">
        <label for="data-dias" class="wizard-label">Dias da Semana:<span class="required-asterisk">*</span></label>
        <input id="data-dias" class="wizard-input" name="diasSemana" placeholder="Ex: seg, ter, qua" required />
      </div>
      <div class="wizard-form-group wizard-form-group-inline">
        <input id="data-feriado" type="checkbox" name="feriado" />
        <label for="data-feriado" class="wizard-label">Feriado</label>
      </div>
    `
  },
  {
    title: 'Horário',
    content: `
      <div class="wizard-form-group">
        <label for="horario-inicial" class="wizard-label">Horário Inicial:<span class="required-asterisk">*</span></label>
        <input id="horario-inicial" class="wizard-input" name="horarioInicial" type="time" required />
      </div>
      <div class="wizard-form-group">
        <label for="horario-final" class="wizard-label">Horário Final:<span class="required-asterisk">*</span></label>
        <input id="horario-final" class="wizard-input" name="horarioFinal" type="time" required />
      </div>
      <div class="wizard-form-group">
        <label for="horario-qtd" class="wizard-label">Quantidade de Horas:<span class="required-asterisk">*</span></label>
        <input id="horario-qtd" class="wizard-input" name="qtdHoras" type="number" placeholder="Ex: 80" required />
      </div>
      <div class="wizard-form-group">
        <label for="horario-carga-diaria" class="wizard-label">Carga Diária:<span class="required-asterisk">*</span></label>
        <input id="horario-carga-diaria" class="wizard-input" name="cargaHoraria" type="time"  required />
      </div>
      <div class="wizard-form-group">
        <label for="horario-turno" class="wizard-label">Turno:<span class="required-asterisk">*</span></label>
        <select id="horario-turno" class="wizard-input" name="turno" required>
          <option value="" disabled selected>Selecione um turno</option>
          <option value="MATUTINO">Matutino</option>
          <option value="VESPERTINO">Vespertino</option>
          <option value="NOTURNO">Noturno</option>
          <option value="DIURNO">Diurno</option>
        </select>
      </div>
    `
  }
];

const wizardData = {};
function showNotification(message, type = 'error', customClass = '') {
  const notification = document.createElement('div');

  notification.className = `notification ${type} ${customClass}`.trim();
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

function showPopup() {
  const template = document.createElement('template');

  const render = () => {
    const step = steps[current];
    template.innerHTML = `
      <div class="wizard-overlay" role="dialog" aria-modal="true">
        <div class="wizard-card" aria-labelledby="title">
          <div class="wizard-header">
            <div class="wizard-steps">
              ${steps.map((_, i) => `<div class="wizard-step${i <= current ? ' active' : ''}"></div>`).join('')}
            </div>
            <span class="wizard-title" id="title">
              Passo ${current + 1} de ${steps.length}: ${step.title}
            </span>
          </div>
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

    overlay.querySelector('#back').addEventListener('click', () => {
      overlay.remove();
      current--;
      render();
    });

    overlay.querySelector('#next').addEventListener('click', () => {
      if (!validarCamposObrigatorios(overlay)) {
        showNotification('Preencha todos os campos obrigatórios.', 'error', 'validacao-falhou');
        return;
      }

      salvarDadosEtapa(overlay);

      if (current === steps.length - 1) {
        enviarTodosDados();
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
      turma: dados.turma
    };
  } else if (etapa === 'Disciplina') {
    wizardData.disciplina = {
      nome: dados.nomeDisciplina,
      cargaHoraria: Number(dados.cargaHoraria),
      responsavelNome: dados.responsavelNome,
      responsavelEmail: dados.responsavelEmail
    };
  } else if (etapa === 'Unidade') {
    wizardData.unidade = {
      nome: dados.nomeUnidade,
      sigla: dados.sigla,
      interno: dados.interno || false,
      convenioPublico: dados.convenioPublico || false
    };
  } else if (etapa == 'VLR') {
    wizardData.vlr = {
      preceptor: parseFloat(dados.preceptor),
      gerenciamento: parseFloat(dados.gerenciamento),
      total: parseFloat(dados.total),
      totalAluno: parseFloat(dados.totalAluno)
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
      cargaHoraria: Number(dados.cargaHoraria),
      turno: dados.turno
    };
  }
}

function enviarTodosDados() {
  const dadosCenario = {
    aluno: wizardData.aluno,
    disciplina: wizardData.disciplina,
    unidade: wizardData.unidade,
    vlr: wizardData.vlr,
    tce: wizardData.tce,
    tempo: {...wizardData.data, ...wizardData.horario},
  };

  const token = localStorage.getItem('jwt'); 

  fetch('/cenario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(dadosCenario)
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao cadastrar cenário');
      return res.json();
    })
    .then(cenarioSalvo => {
      showNotification('Cenário cadastrado com sucesso!', 'success', 'cadastro-sucesso');
    })
    .catch(err => {
      console.error(err);
      showNotification('Erro durante o cadastro: ' + err.message, 'error', 'cadastro-erro');
    });
}
document.body.addEventListener('click', (e) => {
  if (e.target.closest('#openPopup')) {
    showPopup();
  }
});
