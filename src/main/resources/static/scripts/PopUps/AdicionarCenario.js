let current = 0;

const steps = [
  {
    title: 'Aluno',
    content: `
      <div class="form-group">
        <label class="label">RA:*<input class="input" name="ra" placeholder="ra" required /></label>
      </div>
      <div class="form-group">
        <label class="label">Nome:*<input class="input" name="nome" placeholder="nome" required /></label>
      </div>
      <div class="form-group">
        <label class="label">E-mail:*<input class="input" name="email" type="email" placeholder="e-mail" required /></label>
      </div>
      <div class="form-group">
        <label class="label">Curso:*<input class="input" name="curso" placeholder="curso" required /></label>
      </div>
      <div class="form-group">
        <label class="label">Turma:*<input class="input" name="turma" placeholder="turma" required /></label>
      </div>
    `
  },
  {
    title: 'Disciplina',
    content: `
      <div class="form-group">
        <label class="label">Nome:*<input class="input" name="nomeDisciplina" placeholder="nome da disciplina" required /></label>
      </div>
      <div class="form-group">
        <label class="label">Carga Horária:*<input class="input" name="cargaHoraria" type="number" placeholder="carga horária" required /></label>
      </div>
      <div class="form-group">
        <label class="label">Professor Orientador:*<input class="input" name="responsavelNome" placeholder="professor orientador" required /></label>
      </div>
      <div class="form-group">
        <label class="label">E-mail Orientador:*<input class="input" name="responsavelEmail" type="email" placeholder="e-mail orientador" required /></label>
      </div>
    `
  },
  {
    title: 'Unidade',
    content: `
      <div class="form-group">
        <label class="label">Nome:*<input class="input" name="nomeUnidade" placeholder="nome da unidade" required /></label>
      </div>
      <div class="form-group">
        <label class="label">Sigla do Órgão:*<input class="input" name="sigla" placeholder="sigla" required /></label>
      </div>
      <div class="form-group">
        <span class="label">Interno:*
          <label class="switch">
            <input type="checkbox" name="interno" />
            <span class="slider"></span>
          </label>
        </span>
      </div>
      <div class="form-group">
        <span class="label">Convênio Público:*
          <label class="switch">
            <input type="checkbox" name="convenioPublico" />
            <span class="slider"></span>
          </label>
        </span>
      </div>
    `
  },
  {
  title: 'VLR',
  content: `
    <div class="form-group">
      <label class="label">Preceptor:<input class="input" name="preceptor" type="number" step="0.01" placeholder="R$" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Gerenciamento:<input class="input" name="gerenciamento" type="number" step="0.01" placeholder="R$" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Total:<input class="input" name="total" type="number" step="0.01" placeholder="R$" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Total do Aluno:<input class="input" name="totalAluno" type="number" step="0.01" placeholder="R$" required /></label>
    </div>
  `
  },
    {
  title: 'TCE',
  content: `
    <div class="form-group">
      <label class="label">Nome do Responsável:*<input class="input" name="nome" placeholder="nome do responsável" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Cargo:*<input class="input" name="cargo" placeholder="cargo" required /></label>
    </div>
    <div class="form-group">
      <label class="label">E-mail:*<input class="input" name="email" type="email" placeholder="e-mail" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Telefone:*<input class="input" name="telefone" placeholder="telefone" required /></label>
    </div>
  `
    },
    {
    title: 'Data',
    content: `
    <div class="form-group">
      <label class="label">Início do Estágio:*<input class="input" name="inicioEstagio" type="date" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Término do Estágio:*<input class="input" name="terminoEstagio" type="date" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Dias da Semana:*<input class="input" name="diasSemana" placeholder="ex: seg, ter, qua" required /></label>
    </div>
    <div class="form-group">
      <label class="label">
        Feriado:<input type="checkbox" name="feriado" />
      </label>
    </div>
`
},
    {
  title: 'Horário',
  content: `
    <div class="form-group">
      <label class="label">Horário Inicial:*<input class="input" name="horarioInicial" type="time" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Horário Final:*<input class="input" name="horarioFinal" type="time" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Quantidade de Horas:*<input class="input" name="qtdHoras" type="time" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Carga Diária:*<input class="input" name="cargaHoraria" type="number" required /></label>
    </div>
    <div class="form-group">
      <label class="label">Turno:
        <select class="input" name="turno" required>
          <option value="MATUTINO">Matutino</option>
          <option value="VESPERTINO">Vespertino</option>
          <option value="NOTURNO">Noturno</option>
          <option value="DIURNO">Diurno</option>
        </select>
      </label>
    </div>
`
    }
];

const wizardData = {};

function showPopup() {
  const template = document.createElement('template');

  const render = () => {
    const step = steps[current];
    template.innerHTML = `
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal" aria-labelledby="title">
          <div class="modal-header">
            ${step.title}
            <div class="steps">
              ${steps.map((_, i) => `<div class="step${i <= current ? ' active' : ''}"></div>`).join('')}
            </div>
          </div>
          <div class="modal-content">${step.content}</div>
          <div class="modal-footer">
            <button id="back" class="btn back" ${current === 0 ? 'disabled' : ''}>
              <span class="icon">←</span> VOLTAR
            </button>
            <button id="next" class="btn save">
              <span class="icon">${current === steps.length - 1 ? '✔' : '→'}</span> ${current === steps.length - 1 ? 'CONCLUIR' : 'AVANÇAR'}
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
        alert('Preencha todos os campos obrigatórios.');
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
  alert('Todos os dados cadastrados com sucesso!');
})
.catch(err => {
  console.error(err);
  alert('Erro durante o cadastro: ' + err.message);
});
}
document.getElementById('openPopup').addEventListener('click', showPopup);
