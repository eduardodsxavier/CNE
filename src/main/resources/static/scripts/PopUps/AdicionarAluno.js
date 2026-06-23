const popupTemplate = (isEdit = false, aluno = null) => 
  `<div class="pop-overlay" role="dialog" aria-modal="true">
    <div class="pop-card" aria-labelledby="popTitle">
      <div class="pop-header">
        <h2 id="popTitle" class="pop-title">${isEdit ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
        <p class="pop-subtitle">${isEdit ? 'Atualize as informações acadêmicas do aluno' : 'Cadastre um novo aluno para controle de cenários'}</p>
      </div>
      <div class="pop-body">
        <div class="pop-notification-container" id="pop-error-container">
          <div class="pop-notification-banner">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span id="pop-error-text">Por favor, preencha todos os campos obrigatórios.</span>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="matricula-aluno">Matrícula (RA):<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="matricula-aluno" placeholder="Digite a Matrícula" ${isEdit ? 'disabled' : ''} value="${aluno ? aluno.ra : ''}" />
            <i class="fa-solid fa-id-card pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="nome-aluno">Nome Completo:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="nome-aluno" placeholder="Digite o Nome Completo" value="${aluno ? aluno.nome : ''}" />
            <i class="fa-solid fa-user pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="email-aluno">Email:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="email" id="email-aluno" placeholder="Digite o Email" value="${aluno ? aluno.email : ''}" />
            <i class="fa-solid fa-envelope pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="curso-aluno">Curso:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="curso-aluno" list="cursos-aluno-list" placeholder="Ex: Engenharia de Software" value="${aluno ? aluno.curso : ''}" />
            <i class="fa-solid fa-graduation-cap pop-input-icon"></i>
            <datalist id="cursos-aluno-list">
              <option value="Engenharia de Software"></option>
              <option value="Medicina"></option>
              <option value="Direito"></option>
              <option value="Administração"></option>
              <option value="Psicologia"></option>
              <option value="Enfermagem"></option>
              <option value="Medicina Veterinária"></option>
              <option value="Odontologia"></option>
              <option value="Engenharia Civil"></option>
              <option value="Análise e Desenvolvimento de Sistemas (ADS)"></option>
            </datalist>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="semestre-aluno">Semestre:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <select class="pop-input" id="semestre-aluno">
              <option value="" disabled ${!aluno ? 'selected' : ''}>Selecione o Semestre</option>
              <option value="1º Semestre" ${aluno && aluno.semestre === '1º Semestre' ? 'selected' : ''}>1º Semestre</option>
              <option value="2º Semestre" ${aluno && aluno.semestre === '2º Semestre' ? 'selected' : ''}>2º Semestre</option>
              <option value="3º Semestre" ${aluno && aluno.semestre === '3º Semestre' ? 'selected' : ''}>3º Semestre</option>
              <option value="4º Semestre" ${aluno && aluno.semestre === '4º Semestre' ? 'selected' : ''}>4º Semestre</option>
              <option value="5º Semestre" ${aluno && aluno.semestre === '5º Semestre' ? 'selected' : ''}>5º Semestre</option>
              <option value="6º Semestre" ${aluno && aluno.semestre === '6º Semestre' ? 'selected' : ''}>6º Semestre</option>
              <option value="7º Semestre" ${aluno && aluno.semestre === '7º Semestre' ? 'selected' : ''}>7º Semestre</option>
              <option value="8º Semestre" ${aluno && aluno.semestre === '8º Semestre' ? 'selected' : ''}>8º Semestre</option>
              <option value="9º Semestre" ${aluno && aluno.semestre === '9º Semestre' ? 'selected' : ''}>9º Semestre</option>
              <option value="10º Semestre" ${aluno && aluno.semestre === '10º Semestre' ? 'selected' : ''}>10º Semestre</option>
            </select>
            <i class="fa-solid fa-calendar-days pop-input-icon"></i>
          </div>
        </div>
        
        <div class="pop-form-group">
          <label class="pop-label" for="turma-aluno">Turma:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <input class="pop-input" type="text" id="turma-aluno" placeholder="Ex: A" value="${aluno ? aluno.turma : ''}" />
            <i class="fa-solid fa-users pop-input-icon"></i>
          </div>
        </div>

        <div class="pop-form-group">
          <label class="pop-label" for="status-aluno">Status:<span style="color:red">*</span></label>
          <div class="pop-input-wrapper">
            <select class="pop-input" id="status-aluno">
              <option value="Ativo" ${aluno && aluno.status === 'Ativo' ? 'selected' : (!aluno ? 'selected' : '')}>Ativo</option>
              <option value="Trancado" ${aluno && aluno.status === 'Trancado' ? 'selected' : ''}>Trancado</option>
              <option value="Formado" ${aluno && aluno.status === 'Formado' ? 'selected' : ''}>Formado</option>
            </select>
            <i class="fa-solid fa-circle-info pop-input-icon"></i>
          </div>
        </div>
      </div>
      <div class="pop-footer">
        <button id="salvar" class="pop-btn pop-btn-save"><span class="icon"><i class="fa-solid fa-check"></i></span> SALVAR</button>
        <button id="voltar" class="pop-btn pop-btn-back"><span class="icon"><i class="fa-solid fa-arrow-left"></i></span> VOLTAR</button>
      </div>
    </div>
  </div>`;

function showPopup(isEdit = false, aluno = null, onSave = null) {
  const template = document.createElement('template');
  template.innerHTML = popupTemplate(isEdit, aluno).trim();
  const overlay = template.content.firstChild;

  const close = () => overlay.remove();
  overlay.querySelector('#voltar').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
  document.body.appendChild(overlay);

  const showError = (message) => {
    const errorContainer = overlay.querySelector('#pop-error-container');
    const errorText = overlay.querySelector('#pop-error-text');
    errorText.textContent = message;
    errorContainer.classList.add('active');
    overlay.querySelector('.pop-body').scrollTop = 0;
  };

  const clearError = () => {
    const errorContainer = overlay.querySelector('#pop-error-container');
    errorContainer.classList.remove('active');
  };

  const salvarButton = overlay.querySelector('#salvar');
  salvarButton.addEventListener('click', async () => {
    clearError();

    const ra = overlay.querySelector('#matricula-aluno').value.trim();
    const nome = overlay.querySelector('#nome-aluno').value.trim();
    const email = overlay.querySelector('#email-aluno').value.trim();
    const curso = overlay.querySelector('#curso-aluno').value.trim();
    const semestre = overlay.querySelector('#semestre-aluno').value;
    const turma = overlay.querySelector('#turma-aluno').value.trim();
    const status = overlay.querySelector('#status-aluno').value;

    if (!ra || !nome || !email || !curso || !semestre || !turma || !status) {
      showError('Todos os campos marcados com * são de preenchimento obrigatório.');
      return;
    }

    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Por favor, informe um endereço de email válido.');
      return;
    }

    const token = localStorage.getItem('jwt'); 
    const endpoint = isEdit ? `/aluno/${ra}` : '/aluno';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ ra, nome, email, curso, semestre, turma, status })
      });

      if (response.ok) {
        alert(isEdit ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
        overlay.remove();
        document.removeEventListener('keydown', escHandler);
        if (onSave) onSave();
      } else {
        const errorText = await response.text();
        showError('Erro ao salvar aluno: ' + (errorText || response.statusText));
      }
    } catch (err) {
      console.error(err);
      showError('Erro de conexão ao salvar aluno.');
    }
  });
}

window.showPopup = showPopup;

document.body.addEventListener('click', (e) => {
  if (e.target.closest('#openPopup')) {
    const path = window.location.pathname;
    if (path === '/alunos') {
      if (window.carregarAlunos) {
        showPopup(false, null, window.carregarAlunos);
      } else {
        showPopup(false, null, () => window.location.reload());
      }
    }
  }
});
