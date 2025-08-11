let current = 0;

const steps = [
  {
    title: 'Aluno',
    content: `
      <div class="form-group">
        <label for="aluno-ra" class="label">RA:<span class="required-asterisk">*</span></label>
        <input id="aluno-ra" class="input" name="ra" placeholder="Digite o RA" required />
      </div>
      <div class="form-group">
        <label for="aluno-nome" class="label">Nome:<span class="required-asterisk">*</span></label>
        <input id="aluno-nome" class="input" name="nome" placeholder="Digite o nome completo" required />
      </div>
      <div class="form-group">
        <label for="aluno-email" class="label">E-mail:<span class="required-asterisk">*</span></label>
        <input id="aluno-email" class="input" name="email" type="email" placeholder="Digite o e-mail" required />
      </div>
      <div class="form-group">
        <label for="aluno-curso" class="label">Curso:<span class="required-asterisk">*</span></label>
        <input id="aluno-curso" class="input" name="curso" placeholder="Digite o curso" required />
      </div>
      <div class="form-group">
        <label for="aluno-turma" class="label">Turma:<span class="required-asterisk">*</span></label>
        <input id="aluno-turma" class="input" name="turma" placeholder="Digite a turma" required />
      </div>
    `
  },
  {
    title: 'Disciplina',
    content: `
      <div class="form-group">
        <label for="disciplina-nome" class="label">Nome:<span class="required-asterisk">*</span></label>
        <input id="disciplina-nome" class="input" name="nomeDisciplina" placeholder="Ex: Engenharia de Software" required />
      </div>
      <div class="form-group">
        <label for="disciplina-carga" class="label">Carga Horária:<span class="required-asterisk">*</span></label>
        <input id="disciplina-carga" class="input" name="cargaHoraria" type="number" placeholder="Ex: 80" required />
      </div>
      <div class="form-group">
        <label for="disciplina-orientador" class="label">Professor Orientador:<span class="required-asterisk">*</span></label>
        <input id="disciplina-orientador" class="input" name="responsavelNome" placeholder="Digite o nome do professor" required />
      </div>
      <div class="form-group">
        <label for="disciplina-email-orientador" class="label">E-mail Orientador:<span class="required-asterisk">*</span></label>
        <input id="disciplina-email-orientador" class="input" name="responsavelEmail" type="email" placeholder="Digite o e-mail do professor" required />
      </div>
    `
  },
  {
    title: 'Unidade',
    content: `
      <div class="form-group">
        <label for="unidade-nome" class="label">Nome:<span class="required-asterisk">*</span></label>
        <input id="unidade-nome" class="input" name="nomeUnidade" placeholder="Digite o nome da unidade" required />
      </div>
      <div class="form-group">
        <label for="unidade-sigla" class="label">Sigla do Órgão:<span class="required-asterisk">*</span></label>
        <input id="unidade-sigla" class="input" name="sigla" placeholder="Digite a sigla" required />
      </div>
      <div class="form-group form-group-inline">
        <label class="label">Interno:<span class="required-asterisk">*</span></label>
        <label class="switch">
          <input type="checkbox" name="interno" />
          <span class="slider"></span>
        </label>
      </div>
      <div class="form-group form-group-inline">
        <label class="label">Convênio Público:<span class="required-asterisk">*</span></label>
        <label class="switch">
          <input type="checkbox" name="convenioPublico" />
          <span class="slider"></span>
        </label>
      </div>
    `
  },
  {
    title: 'VLR',
    content: `
      <div class="form-group">
        <label for="vlr-preceptor" class="label">Preceptor:</label>
        <input id="vlr-preceptor" class="input" name="preceptor" type="number" step="0.01" placeholder="R$" />
      </div>
      <div class="form-group">
        <label for="vlr-gerenciamento" class="label">Gerenciamento:</label>
        <input id="vlr-gerenciamento" class="input" name="gerenciamento" type="number" step="0.01" placeholder="R$" />
      </div>
      <div class="form-group">
        <label for="vlr-total" class="label">Total:</label>
        <input id="vlr-total" class="input" name="total" type="number" step="0.01" placeholder="R$" />
      </div>
      <div class="form-group">
        <label for="vlr-total-aluno" class="label">Total do Aluno:</label>
        <input id="vlr-total-aluno" class="input" name="totalAluno" type="number" step="0.01" placeholder="R$" />
      </div>
    `
  },
  {
    title: 'TCE',
    content: `
      <div class="form-group">
        <label for="tce-nome" class="label">Nome do Responsável:<span class="required-asterisk">*</span></label>
        <input id="tce-nome" class="input" name="nome" placeholder="Digite o nome do responsável" required />
      </div>
      <div class="form-group">
        <label for="tce-cargo" class="label">Cargo:<span class="required-asterisk">*</span></label>
        <input id="tce-cargo" class="input" name="cargo" placeholder="Digite o cargo" required />
      </div>
      <div class="form-group">
        <label for="tce-email" class="label">E-mail:<span class="required-asterisk">*</span></label>
        <input id="tce-email" class="input" name="email" type="email" placeholder="Digite o e-mail" required />
      </div>
      <div class="form-group">
        <label for="tce-telefone" class="label">Telefone:<span class="required-asterisk">*</span></label>
        <input id="tce-telefone" class="input" name="telefone" placeholder="Digite o telefone" required />
      </div>
    `
  },
  {
    title: 'Data',
    content: `
      <div class="form-group">
        <label for="data-inicio" class="label">Início do Estágio:<span class="required-asterisk">*</span></label>
        <input id="data-inicio" class="input" name="inicioEstagio" type="date" required />
      </div>
      <div class="form-group">
        <label for="data-termino" class="label">Término do Estágio:<span class="required-asterisk">*</span></label>
        <input id="data-termino" class="input" name="terminoEstagio" type="date" required />
      </div>
      <div class="form-group">
        <label for="data-dias" class="label">Dias da Semana:<span class="required-asterisk">*</span></label>
        <input id="data-dias" class="input" name="diasSemana" placeholder="Ex: seg, ter, qua" required />
      </div>
      <div class="form-group form-group-inline">
        <input id="data-feriado" type="checkbox" name="feriado" />
        <label for="data-feriado" class="label">Feriado</label>
      </div>
    `
  },
  {
    title: 'Horário',
    content: `
      <div class="form-group">
        <label for="horario-inicial" class="label">Horário Inicial:<span class="required-asterisk">*</span></label>
        <input id="horario-inicial" class="input" name="horarioInicial" type="time" required />
      </div>
      <div class="form-group">
        <label for="horario-final" class="label">Horário Final:<span class="required-asterisk">*</span></label>
        <input id="horario-final" class="input" name="horarioFinal" type="time" required />
      </div>
      <div class="form-group">
        <label for="horario-qtd" class="label">Quantidade de Horas:<span class="required-asterisk">*</span></label>
        <input id="horario-qtd" class="input" name="qtdHoras" type="number" placeholder="Ex: 80" required />
      </div>
      <div class="form-group">
        <label for="horario-carga-diaria" class="label">Carga Diária:<span class="required-asterisk">*</span></label>
        <input id="horario-carga-diaria" class="input" name="cargaHoraria" type="time"  required />
      </div>
      <div class="form-group">
        <label for="horario-turno" class="label">Turno:<span class="required-asterisk">*</span></label>
        <select id="horario-turno" class="input" name="turno" required>
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
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal" aria-labelledby="title">
          <div class="modal-header">
            <div class="steps">
              ${steps.map((_, i) => `<div class="step${i <= current ? ' active' : ''}"></div>`).join('')}
            </div>
            <span class="modal-title" id="title">
            ${step.title}
            </span>
          </div>
          <div class="modal-content">${step.content}</div>
          <div class="modal-footer">
            <button id="back" class="btn btn-cancel" ${current === 0 ? 'disabled' : ''}>
              <span class="icon"><i class="fa-solid fa-arrow-left"></i></span> VOLTAR
            </button>
            <button id="next" class="btn btn-next">
              <span class="icon">${current === steps.length - 1 ? '<i class="fa-solid fa-check"></i>'  : '<i class="fa-solid fa-arrow-right"></i>'}</span> ${current === steps.length - 1 ? 'CONCLUIR' : 'AVANÇAR'}
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
  } else if(etapa === 'Unidade'){
        wizardData.unidade ={
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
    } else if (etapa ==='TCE') {
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
    }else if (etapa === 'Horário') {
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
  fetch('/alunos', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(wizardData.aluno)
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro ao cadastrar aluno');
    return res.json();
  })
  .then(alunoSalvo => {
    return fetch('/disciplina', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(wizardData.disciplina)
    });
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro ao cadastrar disciplina');
    return res.json();
  })
  .then(disciplinaSalva => {
    return fetch('/unidades', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(wizardData.unidade)
    });
  })
  .then(res => {
    if (!res.ok) throw new Error('Erro ao cadastrar unidade');
    return res.json();
  })
.then(unidadeSalva => {
  return fetch('/vlr', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(wizardData.vlr)
  });
})
.then(res => {
  if (!res.ok) throw new Error('Erro ao cadastrar VLR');
  return res.json();
})
.then(vlrSalvo => {
  return fetch('/tce', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wizardData.tce)
  });
})
.then(res => {
  if (!res.ok) throw new Error('Erro ao cadastrar TCE');
  return res.json();
})
.then(tceSalvo => {
  return fetch('/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wizardData.data)
  });
})
.then(res => {
  if (!res.ok) throw new Error('Erro ao cadastrar datas');
  return res.json();
})
.then(dataSalva => {
  return fetch('/horario', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(wizardData.horario)
  });
})
.then(res => {
  if (!res.ok) throw new Error('Erro ao cadastrar horário');
  return res.json();
})
.then(horarioSalvo => {
    showNotification('Todos os dados cadastrados com sucesso!', 'success', 'cadastro-sucesso');
})
.catch(err => {
  console.error(err);
    showNotification('Erro durante o cadastro: ' + err.message, 'error', 'cadastro-erro');
  });
}
document.getElementById('openPopup').addEventListener('click', showPopup);
